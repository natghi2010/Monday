import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { UserDto } from '../user/user.dto';
import * as argon from 'argon2';
import { User, UserDocument } from '../user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import successResponse from '../common/common';

type PayloadType = {
  email: string;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async register(@Res() response, dto: UserDto) {
    try {
      const user = await this.userModel.findOne({
        email: dto.email,
      });

      if (user) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'User already exists' });
      } else {
        const user = await this.userModel.create({
          ...dto,
          password: await argon.hash(dto.password),
        });
        const token = await this.generateJwt(user._id, dto.email);
        successResponse({
          response: response,
          data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token,
          },
          code: HttpStatus.CREATED,
        });
        return;
      }
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Catastrophic error occurred' });
    }
  }

  async login(@Res() response, dto: UserDto) {
    const user = await this.userModel.findOne({
      email: dto.email,
    });

    if (!user) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'User does not exist' });
    } else {
      const match = await argon.verify(user.password, dto.password);
      if (match) {
        const token = await this.generateJwt(user._id, dto.email);
        successResponse({
          response: response,
          data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token,
          },
          code: HttpStatus.OK,
        });
      } else {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Invalid credentials' });
      }
    }
  }

  async logout(@Res() response, token: string) {
    try {
      const decodedJwt = this.jwt.decode(token) as PayloadType;
      const email = decodedJwt.email;
      const valid = await this.jwt.verifyAsync(token, {
        secret: this.config.get('JWT_SECRET'),
      });

      const exists = await this.userModel.exists({
        token: token,
      });

      if (!exists) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          message: 'Invalid token',
        });
      }

      if (valid) {
        const user = await this.userModel.findOne({
          email: email,
        });
        if (user) {
          await this.userModel.updateOne(
            { _id: user._id },
            { $set: { token: null } },
            { upsert: true },
          );
          return response
            .status(HttpStatus.OK)
            .json({ message: 'User has been logged out successfully' });
        } else {
          return response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: 'Server error' });
        }
      } else {
        return response
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'Invalid token' });
      }
    } catch (e) {
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid token' });
    }
  }

  async generateJwt(userId: ObjectId, email: string) {
    const payload = { sub: userId, email };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    await this.userModel.updateOne(
      { _id: userId },
      { $set: { token: token } },
      { upsert: true },
    );
    return token;
  }
}

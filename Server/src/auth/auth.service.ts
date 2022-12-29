import { Injectable } from '@nestjs/common';
import { UserDto } from '../user/user.dto';
import { User, UserDocument } from '../user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(dto: UserDto) {
    //todo implement register logic
  }

  async login(dto: UserDto) {
    //todo implement login logic
  }
}

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { UserSchema } from './user/user.schema';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { BoardService } from './board/board.service';
import { BoardController } from './board/board.controller';
import { BoardSchema } from './board/board.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    MongooseModule.forRoot(configuration().mongo_uri),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Board', schema: BoardSchema },
    ]),
  ],
  controllers: [AuthController, BoardController],
  providers: [AuthService, BoardService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/register', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}

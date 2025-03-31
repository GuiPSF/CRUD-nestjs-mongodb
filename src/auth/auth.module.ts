import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User, UserSchema } from "src/schemas/User.schema";
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          }

        }
      }
    }),
    MongooseModule.forFeature([{
              name: User.name,
              schema: UserSchema,
          }])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

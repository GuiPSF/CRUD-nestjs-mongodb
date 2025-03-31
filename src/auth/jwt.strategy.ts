import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "src/schemas/User.schema";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService){
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECREt
             })
        }

        async validate(payload){
            const { id } = payload;

            const user = await this.userModel.findById(id);

            if(!user) throw new UnauthorizedException('Login First to access this endpoint.')

            return user
        }
}
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class SignUpDto{
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

}
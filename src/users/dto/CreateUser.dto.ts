import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    displayName?: string;

}
import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto{
    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    displayName?: string;

    @IsOptional()
    @IsString()
    avatarUrl?: string;
}
import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/CreateUser.dto";
import mongoose from "mongoose";
import { UpdateUserDto } from "./dto/UpdateUser.dto";

@Controller('users')
export class UserController{

    constructor(private userService: UserService){}
    @Post()
    @UsePipes(new ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto){
        console.log(createUserDto)
        return this.userService.createUser(createUserDto);
    }

    @Get()
    getUsers(){
        return this.userService.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException('User not found', 404);
        const findUser = await this.userService.getUserById(id);
        //HttpException(Message, error number)
        if(!findUser) throw new HttpException('User not found', 404);
        return findUser;
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe)
    async updateUser(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException('Invalid ID', 400);
        const updateUser = await this.userService.updateUser(id, UpdateUserDto);
        if(!updateUser) throw new HttpException('User Not Found', 404);
        return updateUser;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException('Invalid ID', 400);
        const deletedUser = await this.userService.deleteUser(id);
        if(!deletedUser) throw new HttpException('User Not Found', 404);
        return;
    }
}
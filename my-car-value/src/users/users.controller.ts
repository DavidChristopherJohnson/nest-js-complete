import { Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService){}
    @Post('/signup')
    createUser(@Body() body: CreateUserDto){
        this.usersService.create(body.email, body.password);
    }

    @Get('/:id')
    async findUser(@Param('id') id: string) {

        const user =  await this.usersService.findOne(parseInt(id));

        if(!user) {
            throw new NotFoundException(`User not found`);
        }

        return user
    }

    @Get()
    async findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email)
    }

    @Delete('/:id')
    async removeUser(@Param('id') id: string) {
        await this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return await this.usersService.update(parseInt(id), body);
    }
}

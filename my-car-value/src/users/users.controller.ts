import {
    Body, Controller, Post, Get, Patch, Param, 
    Query, Delete, NotFoundException, Session
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) { }
    
    // @Get('/whoami')
    // whoAmI(@Session() session:any) {
    //     return this.usersService.findOne(session.userId);
    // }

    @Get('/whoami')
    whoAmI(@CurrentUser() user:string) {
        return user;
    }

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signUp(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signIn(@Body() body:CreateUserDto, @Session() session:any){
        const user = await this.authService.signIn(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Serialize(UserDto)
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOne(parseInt(id));

        if (!user) {
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

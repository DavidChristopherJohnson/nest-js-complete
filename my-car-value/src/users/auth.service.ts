import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}

    async signUp(email: string, password: string) {
        const existingUser = await this.usersService.find(email);

        if(existingUser) {
            throw new BadRequestException('Email in use');
        }

        //TODO: replace this with a hashed password implementation
        const hashedPassword = password;
        const user = await this.usersService.create(email, password)

        return user;
    }

    signIn(){

    }
}
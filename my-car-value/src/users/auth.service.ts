import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt} from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}

    async signUp(email: string, password: string) {
        const existingUser = await this.usersService.find(email);

        if(existingUser.length) {
            throw new BadRequestException('Email in use');
        }

        //Generate Salt
        const salt = randomBytes(8).toString('hex');
        
        //Hash salt and password together (32 represents the length of the hash)
        const hash =(await scrypt(password, salt, 32)) as Buffer;

        //Join hash and salt together
        const result  = salt + '.' + hash.toString('hex');    

        //Create user, using the hashed and salted value as our password
        const user = await this.usersService.create(email, result);

        return user;
    }

    signIn(){

    }
}
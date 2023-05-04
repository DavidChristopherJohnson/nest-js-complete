import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        const users: User[] = [];
        
        //Create a fake copy of the users service
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter(user => user.email == email);
                return Promise.resolve(filteredUsers);
            },
            create: (email: string, password: string) => {
                const user: User = {id: Math.floor(Math.random() * 999999), email, password} as User;
                users.push(user)
                return Promise.resolve(user);
            }
        };

        const module = await Test.createTestingModule({
            providers: [
                AuthService, {
                    provide: UsersService,
                    useValue: fakeUsersService
                }]
        }).compile();

        service = module.get(AuthService);
    })

    it('can create an instance of auth serice', () => {
        expect(service).toBeDefined();
    })

    it('creates a new user with a salted and hashed password', async () => {
        const user = await service.signUp('asdf@here.com', 'asdf');

        expect(user.id).toEqual(expect.any(Number));
        expect(user.email).toBe('asdf@here.com');
        expect(user.password).not.toEqual('asdf');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws a bad request error if user signs up with email already in use', async () => {
        await service.signUp('asdf@here.com', 'asdf');
        await expect(service.signUp('asdf@here.com', 'asdf')).rejects.toThrow(BadRequestException,);
    })

    it('throws if signin called with unused email', async () => {
        await expect(service.signIn('asdf@here.com', 'asdf')).rejects.toThrow(NotFoundException);
    })

    it('throws if an invalid password is entered', async () => {
        await service.signUp('asdf@here.com','asdf');
        await expect(service.signIn('asdf@here.com', 'aasds')).rejects.toThrow(BadRequestException);
    })

    it('returns a user if correct password is provided', async () => {
        await service.signUp('asdf@here.com', 'asdf');
        const user = await service.signIn('asdf@here.com', 'asdf');
        expect(user).toBeDefined;
        expect(user.email).toBe('asdf@here.com');
    })
})
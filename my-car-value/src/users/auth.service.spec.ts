import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;
    beforeEach(async () => {
        //Create a fake copy of the users service
        fakeUsersService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => Promise.resolve({ id: 123, email, password } as User)
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
    
    it('creates a new user with a salted and hashed password', async() => {
        const user = await service.signUp('asdf@here.com', 'asdf');

        expect(user.id).toBe(123);
        expect(user.email).toBe('asdf@here.com');
        expect(user.password).not.toEqual('asdf');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws a bad request error if user signs up with email already in use', async () => {
        fakeUsersService.find = () => Promise.resolve([{id: 123, email: 'a'}] as User[]);
        await expect(service.signUp('asfd@here.com', 'asdf')).rejects.toThrow(BadRequestException,);
    })

    it('shrows if signin called with unused email', async() => {
        await expect(service.signIn('asdf@here.com', 'asdf')).rejects.toThrow(NotFoundException);
    })

    it('signs in user correctly and returns user details', async () => {
        fakeUsersService.find = () => Promise.resolve([{id: 123, email: 'asdf@here.com', password:'asdf.ghjk'}] as User[]);

        const user = await service.signIn('asdf@here.com', 'asdf');
        expect(user).toBeDefined;
        expect(user.id).toBe(123);
        expect(user.email).toBe('asdf@here.com');
    })
})
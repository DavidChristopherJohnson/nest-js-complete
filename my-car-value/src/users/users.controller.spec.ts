import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    let users: User[] = [];

    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({ id, email: 'asdf@here.com', password: 'asdf' } as User)
      },
      find: (email) => {
        return Promise.resolve([{ id: 123, email, password: 'asdf' } as User])
      },
      // remove: () => {},
      // update: () => {}
    };

    fakeAuthService = {
      // signUp: () => {},
      signIn: (email: string, password: string) =>{
        return Promise.resolve({id: 1, email, password} as User)
      } 
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with a given email', async () =>  {
    const users: User[] = await controller.findAllUsers('asdf@here.com');

    expect(users).toBeDefined();
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@here.com');
  })

  it('findUser returns a single user with the matching id', async () => {
    const user = await controller.findUser('123');

    expect(user).toBeDefined();
    expect(user.id).toEqual(123)
  });

  it('findUser throws an error if user with id not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('123')).rejects.toThrow(NotFoundException);
  });

  it('signIn updates session object and returns user', async () => {
    const session = {userId: -10 };
    const user = await controller.signIn(
      {email: 'asdf@here.com', password: 'asdf'},
      session
      );

      expect(user).toBeDefined();
      expect(user.id).toEqual(1);
      expect(session.userId).toEqual(1);
  })  

  it('signOut updates session object to have no userId', async () => {
    const session = {userId: 1}
    await controller.signOut(session);

    expect(session.userId).toBeNull();
  })
});

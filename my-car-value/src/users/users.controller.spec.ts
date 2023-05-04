import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

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
      // signIn: () => {}
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
  })
});

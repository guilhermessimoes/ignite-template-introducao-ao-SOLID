/* eslint-disable prettier/prettier */
import { User } from "../../model/User";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      updated_at: new Date(),
      created_at: new Date(),
    });

    this.users.push(user);
    return user
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);   
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((c) => c.email === email);    
  }

  turnAdmin(receivedUser: User): User {
    // eslint-disable-next-line no-param-reassign
    receivedUser.admin = !receivedUser.admin;
    // eslint-disable-next-line no-param-reassign
    receivedUser.updated_at = new Date();

    return receivedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };

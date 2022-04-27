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
    const user = this.users.find((c) => c.id === id);
    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((c) => c.email === email);
    return user;
  }

  turnAdmin(receivedUser: User): User {
    const userAdmin = new User();
    Object.assign(receivedUser, {
      admin: true,
      updated_at: new Date()
    });

    this.users.push(userAdmin);
    return userAdmin
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };

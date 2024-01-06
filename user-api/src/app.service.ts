import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

export interface User {
  firstName: string;
  lastName: string;
}

export interface UserResponse {
  count: number;
  users: User[];
}

const min = 10;
const max = 100;

@Injectable()
export class AppService {
  getUsers(): UserResponse {
    const users = [];
    const count = Math.ceil(Math.random() * (max - min) + min);

    for (let i = 0; i < count; i++) {
      users.push(this.createUser());
    }

    return {
      count,
      users,
    };
  }

  private createUser(): User {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };
  }
}

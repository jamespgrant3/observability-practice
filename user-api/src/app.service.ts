import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

export interface User {
  firstName: string;
  lastName: string;
}

const min = 10;
const max = 100;

@Injectable()
export class AppService {
  getUsers(): User[] {
    const users = [];
    const numOfUsers = Math.random() * (max - min) + min;

    for (var i = 0; i < numOfUsers; i++) {
      users.push(this.createUser());
    }

    return users;
  }

  private createUser(): User {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };
  }
}

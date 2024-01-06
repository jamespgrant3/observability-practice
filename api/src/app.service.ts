import { Injectable } from '@nestjs/common';

const userApiHost = process.env.USER_API_HOST || '';

export interface User {
  firstName: string;
  lastName: string;
}

@Injectable()
export class AppService {
  public async getUsers(): Promise<User[]> {
    const url = `http://${userApiHost}`;
    console.log('url', url);

    const response = await fetch(url, { method: 'GET' });

    return response.json();
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getMe() {
    return { msg: { name: 'Hello world' } };
  }
}

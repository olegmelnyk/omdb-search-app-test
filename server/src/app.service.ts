import { Injectable } from '@nestjs/common';
import omdb from './omdb';
import redis from './redis';
import { OmdbSearchParams, OmdbSearchResult } from './interfaces';

@Injectable()
export class AppService {
  private readonly users = [
    {
      username: 'user',
      password: 'password',
    }
  ];

  authenticate(params): string {
    const { login, password } = params;

    const user = this.users.find(user => user.username === login && user.password === password);

    if(user) {
      return Buffer.from(`${user.username}:${user.password}`).toString('base64');
    }
    return '';
  }

  authrorize(key: string): boolean {
    const [username, password] = Buffer.from(key.replace('Basic ', ''), 'base64')
      .toString('ascii').split(':');
    return !!this.users.find(user => user.username === username && user.password === password);
  }

  async search(params: OmdbSearchParams): Promise<OmdbSearchResult> {
    const key = JSON.stringify(params);

    const { title, ...rest } = params;

    try {
      const cache = await redis.get(key);

      if(cache) {
        return JSON.parse(cache);
      }

      const result = await omdb.search(title, rest);
      await redis.set(key, JSON.stringify(result));
      return result;
    } catch (error) {
      throw error;
    }
  }
}

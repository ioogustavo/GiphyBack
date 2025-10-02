import { Injectable } from '@nestjs/common';
import { GifApi } from '../utils/gifApi.util';
import { Gif } from '../interfaces/gif.interface';

@Injectable()
export class GifService {
  constructor(private readonly GifApi: GifApi) {}

  async getGifs(query: string): Promise<Gif[]> {
    return this.GifApi.getGifs(query);
  }
}

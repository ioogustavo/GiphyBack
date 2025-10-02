import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GiphyResponse } from '../interfaces/giphy.response';
import { firstValueFrom } from 'rxjs';
import { Gif } from '../interfaces/gif.interface';

@Injectable()
export class GifApi {
  constructor(private readonly httpService: HttpService) {}

  async getGifs(query: string): Promise<Gif[]> {
    try {
      const options = {
        params: {
          q: query,
          limit: process.env.LIMIT,
          language: process.env.LANGUAGE,
          api_key: process.env.VITE_GIPHY_API_KEY,
        },
      };
      const url = `${process.env.BASE_URL_GIPHY}/search`;
      const response = await firstValueFrom(
        this.httpService.get<GiphyResponse>(url, options),
      );
      return response.data.data.map((gif) => ({
        id: gif.id,
        title: gif.title,
        url: gif.images.downsized_medium.url,
        width: parseInt(gif.images.downsized_medium.width, 10),
        height: parseInt(gif.images.downsized_medium.height, 10),
      }));
    } catch (error) {
      console.error(error);
      throw new NotFoundException('No se pudieron obtener los gifs');
    }
  }
}

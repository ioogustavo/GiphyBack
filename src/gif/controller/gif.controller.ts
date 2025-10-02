import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GifService } from '../services/gif.service';
import { Gif } from '../interfaces/gif.interface';

@ApiTags('Gif')
@Controller('gif')
export class GifController {
  constructor(private readonly gifService: GifService) {}

  @ApiOperation({ summary: 'Obtiene una lista de gifs' })
  @ApiQuery({
    name: 'query',
    required: true,
    description: 'Término de búsqueda de los gifs',
  })
  @Get('list')
  async getGifs(@Query('query') query: string): Promise<Gif[]> {
    return this.gifService.getGifs(query);
  }
}

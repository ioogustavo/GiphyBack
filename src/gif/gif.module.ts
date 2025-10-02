import { Module } from '@nestjs/common';
import { GifController } from './controller/gif.controller';
import { GifService } from './services/gif.service';
import { HttpModule } from '@nestjs/axios';
import { GifApi } from './utils/gifApi.util';

@Module({
  imports: [HttpModule],
  controllers: [GifController],
  providers: [GifService, GifApi],
})
export class GifModule {}

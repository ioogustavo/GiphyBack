import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { GifModule } from './gif/gif.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, GifModule],
})
export class AppModule {}

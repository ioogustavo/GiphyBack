import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { GifModule } from './gif/gif.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, GifModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

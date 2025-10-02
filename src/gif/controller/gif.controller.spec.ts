import { Test, TestingModule } from '@nestjs/testing';
import { GifController } from './gif.controller';
import { GifService } from '../services/gif.service';
import { Gif } from '../interfaces/gif.interface';

describe('GifController', () => {
  let controller: GifController;
  let serviceMock: Partial<GifService>;

  const mockGifs: Gif[] = [
    {
      id: 'qp61kl8rdZwuQ',
      title: 'Happy Lionel Messi GIF',
      url: 'https://media2.giphy.com/media/v1.Y2lkPTUxMzg1YmQ3ZWV2eWduNDZxejRwcmxhbzFxYXFudnA1dmtuNnlydTRnd2JncXRqMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qp61kl8rdZwuQ/giphy.gif',
      width: 346,
      height: 347,
    },
    {
      id: 'TjAcxImn74uoDYVxFl',
      title: 'Lionel Messi Football GIF by FC Barcelona',
      url: 'https://media3.giphy.com/media/v1.Y2lkPTUxMzg1YmQ3ZWV2eWduNDZxejRwcmxhbzFxYXFudnA1dmtuNnlydTRnd2JncXRqMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/TjAcxImn74uoDYVxFl/giphy-downsized-medium.gif',
      width: 384,
      height: 384,
    },
  ];

  beforeEach(async () => {
    serviceMock = {
      getGifs: jest.fn().mockResolvedValue(mockGifs),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GifController],
      providers: [{ provide: GifService, useValue: serviceMock }],
    }).compile();

    controller = module.get<GifController>(GifController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return gifs from service', async () => {
    const query = 'Messi';
    const result = await controller.getGifs(query);

    // Verificamos que el controller llama al service con el query correcto
    expect(serviceMock.getGifs).toHaveBeenCalledWith(query);

    // Verificamos que devuelve el array de gifs mockeado
    expect(result).toEqual(mockGifs);
  });
});

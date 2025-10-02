import { Test, TestingModule } from '@nestjs/testing';
import { GifService } from './gif.service';
import { GifApi } from '../utils/gifApi.util';
import { Gif } from '../interfaces/gif.interface';

describe('GifService', () => {
  let service: GifService;
  let gifApiMock: { getGifs: jest.Mock };

  const mockGifs: Gif[] = [
    {
      id: 'qp61kl8rdZwuQ',
      title: 'Happy Lionel Messi GIF',
      url: 'https://media2.giphy.com/qp61kl8rdZwuQ/giphy.gif',
      width: 346,
      height: 347,
    },
    {
      id: 'TjAcxImn74uoDYVxFl',
      title: 'Lionel Messi Football GIF',
      url: 'https://media3.giphy.com/TjAcxImn74uoDYVxFl/giphy-downsized-medium.gif',
      width: 384,
      height: 384,
    },
  ];

  beforeEach(async () => {
    gifApiMock = {
      getGifs: jest.fn().mockResolvedValue(mockGifs),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GifService, // la clase real que queremos testear
        { provide: GifApi, useValue: gifApiMock }, // inyectamos el mock
      ],
    }).compile();

    service = module.get<GifService>(GifService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call GifApi.getGifs with query and return data', async () => {
    const query = 'Messi';

    const result = await service.getGifs(query);

    expect(gifApiMock.getGifs).toHaveBeenCalledWith(query);

    expect(result).toEqual(mockGifs);
  });

  it('should propagate error if GifApi rejects', async () => {
    gifApiMock.getGifs.mockRejectedValueOnce(new Error('network error'));

    await expect(service.getGifs('any')).rejects.toThrow('network error');
    expect(gifApiMock.getGifs).toHaveBeenCalledWith('any');
  });
});

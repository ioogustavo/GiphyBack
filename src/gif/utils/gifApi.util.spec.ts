import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { GifApi } from './gifApi.util';
import { Gif } from '../interfaces/gif.interface';
import { GiphyResponse, Images } from '../interfaces/giphy.response';
import { NotFoundException } from '@nestjs/common';

describe('GifApi', () => {
  let service: GifApi;
  let httpService: HttpService;

  // Mocks definidos antes de los tests
  const mockGiphyResponse: GiphyResponse = {
    data: [
      {
        type: 'gif',
        id: 'qp61kl8rdZwuQ',
        url: 'https://giphy.com/gifs/you-messi-wants-qp61kl8rdZwuQ',
        slug: 'you-messi-wants-qp61kl8rdZwuQ',
        bitly_gif_url: 'http://gph.is/P0KZMP',
        bitly_url: 'http://gph.is/P0KZMP',
        embed_url: 'https://giphy.com/embed/qp61kl8rdZwuQ',
        source:
          'http://www.reddit.com/r/soccergifs/comments/s2kmp/messi_wants_you_to_be_happy/',
        title: 'Happy Lionel Messi GIF',
        rating: 'PG',
        content_url: '',
        source_tld: 'www.reddit.com',
        source_post_url:
          'http://www.reddit.com/r/soccergifs/comments/s2kmp/messi_wants_you_to_be_happy/',
        is_sticker: 0,
        import_datetime: new Date('2014-03-26T14:41:30'),
        trending_datetime: '1970-01-01 00:00:00',
        images: {
          downsized_medium: {
            url: 'https://media2.giphy.com/media/.../giphy.gif',
            width: '346',
            height: '347',
            size: '1586012',
          },
          original: {
            url: 'https://media2.giphy.com/media/.../giphy.gif',
            width: '346',
            height: '347',
            size: '1586012',
            frames: '1',
            mp4: '',
            mp4_size: '',
            webp: '',
            webp_size: '',
            hash: '',
          },
        } as Images,
        analytics_response_payload: '',
        analytics: {
          onload: { url: '' },
          onclick: { url: '' },
          onsent: { url: '' },
        },
        alt_text: '',
        is_low_contrast: false,
      },
    ],
    meta: { status: 200, msg: 'OK', response_id: '123' },
    pagination: { total_count: 1, count: 1, offset: 0 },
  };

  const expectedGifs: Gif[] = [
    {
      id: 'qp61kl8rdZwuQ',
      title: 'Happy Lionel Messi GIF',
      url: 'https://media2.giphy.com/media/.../giphy.gif',
      width: 346,
      height: 347,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GifApi,
        {
          provide: HttpService,
          useValue: { get: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<GifApi>(GifApi);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should return transformed gifs array', async () => {
    (httpService.get as jest.Mock).mockReturnValueOnce(
      of({ data: mockGiphyResponse }),
    );

    const result = await service.getGifs('messi');

    expect(result).toEqual(expectedGifs);
    x;
    expect(httpService.get).toHaveBeenCalledWith(
      `${process.env.BASE_URL_GIPHY}/search`,
      expect.any(Object),
    );
  });

  it('should throw NotFoundException on error', async () => {
    (httpService.get as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Network error');
    });

    await expect(service.getGifs('messi')).rejects.toThrow(NotFoundException);
  });
});

import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable()
export class MovieService {
  constructor(private http: HttpService, private config: ConfigService) {}

  async requestMovie(dto) {
    const requestConfig = {
      headers: {
        Authorization: `Bearer ${this.config.get('AI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
    };

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: dto.content }],
      max_tokens: 100,
    };

    const data = await lastValueFrom(
      this.http
        .post('https://api.openai.com/v1/chat/completions', body, requestConfig)
        .pipe(
          map((res) => {
            return res.data;
          }),
        )
        .pipe(
          catchError(() => {
            throw new ForbiddenException('API not available');
          }),
        ),
    );

    return data;
  }
}

import { Module } from '@nestjs/common';
import { MovieModule } from '../resources/movie/movie.module';
import { RatingModule } from '../resources/rating/rating.module';

@Module({ imports: [MovieModule, RatingModule] })
export class SystemModule {}

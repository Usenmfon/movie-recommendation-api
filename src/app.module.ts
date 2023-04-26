import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AuthModule } from './auth/auth.module';
import { User, UserSchema } from './auth/schema/auth.schema';
import { ServiceExceptionFilter } from './helper/exceptions/filters/service.exception';
import { PaginatePlugin } from './helper/plugin/mongo/pagination.plugin';
import { SystemModule } from './system/modules/system.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      connectionFactory: (connection: Connection) => {
        connection.plugin(PaginatePlugin);
        return connection;
      },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
    SystemModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: ServiceExceptionFilter }],
})
export class AppModule {}

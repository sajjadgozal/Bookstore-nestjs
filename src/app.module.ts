import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { BookstoreModule } from './bookstore/bookstore.module';
import { User } from './user/entities/user.entity';
import { Book } from './book/entities/book.entity';
import { Bookstore } from './bookstore/entities/bookstore.entity';
import { Availability } from './book/entities/availability.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './user/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USER,
      entities: [User, Book, Bookstore, Availability],
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    BookModule,
    BookstoreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

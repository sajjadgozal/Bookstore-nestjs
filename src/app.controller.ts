import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('books')
  getBooks(): string {
    return 'All books';
  }

  @Get('books/:id')
  getBook(): string {
    return 'A book';
  }
}

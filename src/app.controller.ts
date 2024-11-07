import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { data } from './types/data.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() body: data) {
    console.log(body);
    return this.appService.create(body);
  }

  @Post('/many')
  createMany() {
    this.appService.createMany();
  }

  @Put(':id')
  update(
    @Param('id') testId: string,
    @Body() body: { title: string; newItem: string },
  ) {
    this.appService.update(testId, body);
  }

  @Get(':id')
  findOne(@Param('id') testId: string) {
    return this.appService.findOne({ testId });
  }

  @Get()
  findMany() {
    return this.appService.findMany();
  }

  @Post('search')
  fintByItem(@Body('item') item: string) {
    return this.appService.searchByItem(item);
  }

  @Post('partial')
  findPartialItem() {
    console.log('test');
    return this.appService.findPartialItem(['title', 'testId']);
  }
}

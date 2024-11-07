import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamooseModule } from 'nestjs-dynamoose';
import { TestModel } from './Model/data.model';

@Module({
  imports: [
    DynamooseModule.forRoot({
      aws: {
        region: 'eu-west-1',
      },
    }),
    DynamooseModule.forFeature([TestModel]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

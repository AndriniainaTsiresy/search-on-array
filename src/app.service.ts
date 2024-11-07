import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { data, dataKey } from './types/data.type';
import { v4 as uuidV4 } from 'uuid';
import { Condition } from 'dynamoose';

let lastKey = null;
let searchLastKey = null;

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Test')
    private readonly testModel: Model<data, dataKey>,
  ) {}

  async create(body: data) {
    return await this.testModel.create(body);
  }

  async createMany() {
    for (let i = 0; i < 100; i++) {
      await this.create({
        title: `element ${i}`,
        items: [uuidV4(), uuidV4()],
      });
    }
  }

  async findOne(key: dataKey) {
    return await this.testModel.get(key);
  }

  async findMany() {
    const pageSize = 25;
    const result = await this.testModel
      .scan()
      .startAt(lastKey)
      .limit(pageSize)
      .exec();
    if (result.length > 0) {
      lastKey = result.lastKey;
      console.log(lastKey);
    } else {
      lastKey = null;
    }

    return {
      nombre: result.length,
      result,
    };
  }

  async update(testId: string, body: { title: string; newItem: string }) {
    const condition = new Condition().where('title').eq(body.title);
    await this.testModel.update(
      { testId },
      { $ADD: { items: [body.newItem] } },
      { condition, return: 'item' },
    );
  }

  async searchByItem(item: string): Promise<data[]> {
    const pageSize = 25;
    const result = await this.testModel
      .scan()
      .startAt(searchLastKey)
      .limit(pageSize)
      .exec();
    searchLastKey = result.length > 0 ? result.lastKey : null;

    const res = result.filter((i) => i.items.includes(item));

    if (!res[0]) {
      this.searchByItem(item);
    } else {
      return res;
    }
  }

  async findPartialItem(attributsList: string[]): Promise<data[]> {
    console.log(attributsList);
    const result = await this.testModel.scan().attributes(attributsList).exec();
    console.log(result);
    return result;
  }
}

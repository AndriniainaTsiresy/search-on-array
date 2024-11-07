import { Schema } from 'dynamoose';
import { ModelDefinition } from 'nestjs-dynamoose';
import { v4 as uuidV4 } from 'uuid';

const TestSchema = new Schema(
  {
    testId: {
      type: String,
      hashKey: true,
      required: true,
      default: () => uuidV4(),
    },
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      schema: [String],
      default: () => [],
    },
  },
  {
    timestamps: true,
  },
);

export const TestModel: ModelDefinition = {
  name: 'Test',
  schema: TestSchema,
  options: {
    tableName: 'Test',
    create: true,
  },
};

import { Context } from 'koa';
import { getManager } from 'typeorm';
import { Example } from '../../../entity/example';
import { logger } from '../../../logger';
import assembleAllParams from '../../../utils/assembleAllParams';
import help from '../../../utils/help';
import {
  IGetExampleListParams,
  IRemoveExampleParams,
} from '../../../../api/example/index.d';
import { IExampleItem } from '../../../../api/common';

export class ExampleControllers {
  public static async listExample(ctx: Context) {
    const exampleRepository = getManager().getRepository(Example);
    const { query } = assembleAllParams<[], IGetExampleListParams>(ctx);
    logger.info(`进行查询example操作, 参数id: ${query.id ?? ''}`);
    const examples = await exampleRepository.find(query ?? '');
    ctx.body = help.json(examples);
  }

  public static async addExample(ctx: Context) {
    const exampleRepository = getManager().getRepository(Example);
    const { body } = assembleAllParams<IExampleItem, []>(ctx);
    await exampleRepository.insert(body);
    ctx.body = help.success();
  }

  public static async removeExample(ctx: Context) {
    const exampleRepository = getManager().getRepository(Example);
    const { body } = assembleAllParams<IRemoveExampleParams, []>(ctx);
    const example = await exampleRepository.findOne(body);
    await exampleRepository.remove(example!);
    ctx.body = help.success();
  }
}

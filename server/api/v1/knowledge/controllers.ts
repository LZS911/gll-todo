/* eslint-disable @typescript-eslint/naming-convention */
import { Context } from 'koa';
import { Between, getManager, Like } from 'typeorm';
import { Knowledge } from '../../../entity/knowledge';
import { logger } from '../../../logger';
import assembleAllParams from '../../../utils/assembleAllParams';
import getErrorMessage from '../../../utils/getErrorMessage';
import help from '../../../utils/help';
import {
  IChangeKnowledgeParam,
  IDeleteKnowledgeParam,
  IGetKnowledgeParam,
} from './index.type';

export class KnowledgeControllers {
  public static async addKnowledge(ctx: Context) {
    try {
      const { body } = assembleAllParams<Knowledge, []>(ctx);
      const knowledgeRepository = getManager().getRepository(Knowledge);

      await knowledgeRepository.insert(body);
      logger.info(`新增 knowledge 数据: ${JSON.stringify(body)}`);
      ctx.body = help.success();
    } catch (error) {
      ctx.body = help.fail(getErrorMessage(error as any));
      logger.error(error);
    }
  }

  public static async changeKnowledge(ctx: Context) {
    try {
      const {
        body: { knowledge_content, knowledge_id, knowledge_title },
      } = assembleAllParams<IChangeKnowledgeParam, []>(ctx);
      const knowledgeRepository = getManager().getRepository(Knowledge);

      const currentKnowledge = await knowledgeRepository.findOne(knowledge_id);
      if (!currentKnowledge) {
        ctx.body = help.fail('未找到改知识点!');
        return;
      }
      await knowledgeRepository.save({
        ...currentKnowledge,
        knowledge_content,
        knowledge_title,
      });

      logger.info(
        `修改: 计划id为: ${knowledge_id}, 修改后的 title: ${knowledge_title}, content:${knowledge_content}`
      );

      ctx.body = help.success();
    } catch (error) {
      ctx.body = help.fail(getErrorMessage(error as any));
      logger.error(error);
    }
  }

  public static async getKnowledge(ctx: Context) {
    try {
      const {
        query: { knowledge_title, start_time, end_time },
      } = assembleAllParams<[], IGetKnowledgeParam>(ctx);

      const knowledgeRepository = getManager().getRepository(Knowledge);

      const query: any = {
        create_date: Between(start_time, end_time),
      };
      if (knowledge_title) {
        query.knowledge_title = Like(`%${knowledge_title}%`);
      }

      const data = await knowledgeRepository.find(query);
      logger.info(
        `查询 plan, knowledge_id: ${knowledge_title}, start_time:${start_time}, end_time:${end_time}`
      );
      ctx.body = help.json(data);
    } catch (error) {
      ctx.body = help.fail(getErrorMessage(error as any));
      logger.error(error);
    }
  }

  public static async deleteKnowLedge(ctx: Context) {
    try {
      const {
        query: { knowledge_id },
      } = assembleAllParams<[], IDeleteKnowledgeParam>(ctx);

      if (!knowledge_id) {
        ctx.body = help.fail('参数错误!');
        return;
      }
      const knowledgeRepository = getManager().getRepository(Knowledge);
      await knowledgeRepository.delete(knowledge_id);
      ctx.body = help.success();
    } catch (error) {
      ctx.body = help.fail(getErrorMessage(error as any));
      logger.error(error);
    }
  }
}

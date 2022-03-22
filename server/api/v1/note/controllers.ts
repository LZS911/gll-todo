/* eslint-disable @typescript-eslint/naming-convention */
import { Context } from 'koa';
import { Between, getManager, Like } from 'typeorm';
import { Note } from '../../../entity/note';
import { logger } from '../../../logger';
import assembleAllParams from '../../../utils/assembleAllParams';
import getErrorMessage from '../../../utils/getErrorMessage';
import help from '../../../utils/help';
import {
  IChangeNoteParam,
  IDeleteNoteParam,
  IGetNoteParam,
} from './index.type';

export class NoteControllers {
  public static async addNote(ctx: Context) {
    try {
      const { body } = assembleAllParams<Note, []>(ctx);
      const NoteRepository = getManager().getRepository(Note);

      await NoteRepository.insert(body);
      logger.info(`新增 Note 数据: ${JSON.stringify(body)}`);
      ctx.body = help.success();
    } catch (error) {
      ctx.body = help.fail(getErrorMessage(error as any));
      logger.error(error);
    }
  }

  public static async changeNote(ctx: Context) {
    try {
      const {
        body: { note_content, note_id, note_title },
      } = assembleAllParams<IChangeNoteParam, []>(ctx);
      const NoteRepository = getManager().getRepository(Note);

      const currentNote = await NoteRepository.findOne(note_id);
      if (!currentNote) {
        ctx.body = help.fail('未找到改便签!');
        return;
      }
      await NoteRepository.save({
        ...currentNote,
        note_content,
        note_title,
      });

      logger.info(
        `修改: 计划id为: ${note_id}, 修改后的 title: ${note_title}, content:${note_content}`
      );

      ctx.body = help.success();
    } catch (error) {
      ctx.body = help.fail(getErrorMessage(error as any));
      logger.error(error);
    }
  }

  public static async getNote(ctx: Context) {
    try {
      const {
        query: { note_title, start_time, end_time },
      } = assembleAllParams<[], IGetNoteParam>(ctx);

      const NoteRepository = getManager().getRepository(Note);

      const query: any = {
        create_date: Between(start_time, end_time),
      };
      if (note_title) {
        query.note_title = Like(`%${note_title}%`);
      }

      const data = await NoteRepository.find(query);
      logger.info(
        `查询 plan, note_id: ${note_title}, start_time:${start_time}, end_time:${end_time}`
      );
      ctx.body = help.json(data);
    } catch (error) {
      ctx.body = help.fail(getErrorMessage(error as any));
      logger.error(error);
    }
  }

  public static async deleteNote(ctx: Context) {
    try {
      const {
        query: { note_id },
      } = assembleAllParams<[], IDeleteNoteParam>(ctx);

      if (!note_id) {
        ctx.body = help.fail('参数错误!');
        return;
      }
      const NoteRepository = getManager().getRepository(Note);
      await NoteRepository.delete(note_id);
      ctx.body = help.success();
    } catch (error) {
      ctx.body = help.fail(getErrorMessage(error as any));
      logger.error(error);
    }
  }
}

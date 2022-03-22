import { Context } from 'koa';
import { getManager } from 'typeorm';
import { User } from '../../../entity/user';
import { logger } from '../../../logger';
import assembleAllParams from '../../../utils/assembleAllParams';
import getErrorMessage from '../../../utils/getErrorMessage';
import help from '../../../utils/help';

export class UserControllers {
  public static async userLogin(ctx: Context) {
    try {
      const { body } = assembleAllParams<User, []>(ctx);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ctx.session!.USER_ID = body.user_name;
      const userRepository = getManager().getRepository(User);
      if (await userRepository.findOne(body)) {
        logger.info('当前用户已存在, 直接登陆!');
      } else {
        await userRepository.insert(body);
        logger.info('当前用户不存在, 创建该用户');
      }

      ctx.body = help.success('登陆成功!');
    } catch (error) {
      ctx.body = help.fail(getErrorMessage(error as any));
      logger.error(error);
    }
  }
}

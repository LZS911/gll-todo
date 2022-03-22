export default {
  fail(msg = '操作失败', code = 0) {
    return {
      msg,
      code,
      data: {
        msg,
        code,
      },
    };
  },
  success(msg = 'success', code = 1) {
    return {
      msg,
      code,
      data: {
        msg,
        code,
      },
    };
  },
  json(data: unknown, msg = 'success', code = 1) {
    return {
      code,
      msg,
      data,
    };
  },
  list(data: unknown, total_nums: number, msg = 'success', code = 1) {
    return {
      code,
      msg,
      data: {
        data,
        total_nums,
      },
    };
  },
};

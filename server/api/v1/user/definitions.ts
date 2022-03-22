export default {
  ReturnMessage: {
    type: 'object',
    required: ['code', 'message'],
    properties: {
      code: {
        describe: '是否成功',
        type: 'integer',
      },
      msg: {
        describe: '消息提示',
        type: 'string',
      },
    },
  },
};

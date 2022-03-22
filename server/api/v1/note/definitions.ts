export default {
  ExampleItem: {
    description: '示例接口',
    type: 'array',
    items: {
      type: 'object',
      required: ['id', 'name'],
      properties: {
        id: {
          description: 'primary',
          type: 'integer',
        },
        name: {
          description: 'name',
          type: 'string',
        },
      },
    },
  },
};

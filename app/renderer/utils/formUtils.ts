export const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 18,
    },
  },
};

export const formItemSearchLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
};

export const validatorDate = () => {
  let start: number | undefined;
  let end: number | undefined;

  const validatorStart = (_: any, value: moment.Moment | null) => {
    start = value?.valueOf();
    return validator();
  };

  const validatorEnd = (_: any, value: moment.Moment | null) => {
    end = value?.valueOf();
    return validator();
  };

  const validator = () => {
    if (start && end && start > end) {
      return Promise.reject('开始时间点应在结束时间点之前');
    }

    return Promise.resolve();
  };

  return { validatorStart, validatorEnd };
};

export const titleRules = (_: any, value: string) => {
  if (value.startsWith('.')) {
    return Promise.reject('标题不能以 . 开始');
  }
  if (value.length > 30) {
    return Promise.reject('标题长度应小于30');
  }
  return Promise.resolve();
};

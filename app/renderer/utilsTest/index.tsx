import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { Dictionary } from '../common/common';
import { combineReducers, createStore } from 'redux';
import { LoginReducer } from '../store/reducer/loginReducer';
import { PlanReducer } from '../store/reducer/planReducer';
import { KnowledgeReducer } from '../store/reducer/knowledgeReducer';
import { noteReducer } from '../store/reducer/noteReducer';
import { manageReducer } from '../store/reducer/manageReducer';
import { AxiosResponse } from 'axios';
import { render } from '@testing-library/react';
import * as React from 'react';

const reducers = combineReducers({
  login: LoginReducer,
  plan: PlanReducer,
  knowledge: KnowledgeReducer,
  note: noteReducer,
  manage: manageReducer,
});

export const storeFactory = (initStore: Dictionary = {}) => {
  return createStore(reducers, initStore);
};

export const renderHooksWithRedux = <TProps, TResult>(
  hooks: (props: TProps) => TResult,
  storeState: Dictionary = {},
) => {
  return renderHook(hooks, {
    wrapper: Provider,
    initialProps: {
      store: storeFactory(storeState),
    },
  } as any);
};

export const successData = (data: any, otherData?: any) => {
  return {
    code: 1,
    message: '',
    data,
    ...otherData,
  };
};

export const failedData = (data?: any) => {
  return {
    code: 0,
    message: 'error',
    data,
  };
};

export const resolveThreeSecond = (
  data: any,
  { status = 200, headers = {}, config = {}, statusText = '', otherData = {} } = {},
) => {
  return new Promise<AxiosResponse<any>>(res => {
    setTimeout(() => {
      res({
        ...successData(data),
      });
    }, 3000);
  });
};

export const resolveErrorThreeSecond = (
  data: any,
  { status = 200, headers = {}, config = {}, statusText = '' } = {},
) => {
  return new Promise<AxiosResponse<any>>(res => {
    setTimeout(() => {
      res(failedData(data) as any);
    }, 3000);
  });
};

type RenderParams = Parameters<typeof render>;

export const renderWithRedux = (...[ui, option, initStore]: [...RenderParams, Dictionary?]) => {
  return render(<Provider store={storeFactory(initStore)}>{ui}</Provider>, option);
};

import { GetKnowledgeType } from '../../action/knowledge/index';
import { fromJS, Map } from 'immutable';
import { IAddKnowledge } from './../../../api/knowledge/index.d';
import { handleActions, Action } from 'redux-actions';

export type IKnowledgeState = Map<'knowledgeList' | 'refresh', any>;

const initState = fromJS({
  knowledgeList: [],
  refresh: false,
});

export const KnowledgeReducer = handleActions<IKnowledgeState, any>(
  {
    [GetKnowledgeType.Set_Knowledge]: (
      state,
      { payload: { knowledgeList } }: Action<{ knowledgeList: IAddKnowledge[] }>
    ) => {
      return state.set('knowledgeList', knowledgeList);
    },
    [GetKnowledgeType.Refresh_Knowledge]: (
      state,
      { payload: { refresh } }: Action<{ refresh: boolean }>
    ) => {
      return state.set('refresh', refresh);
    },
  },
  initState as any
);

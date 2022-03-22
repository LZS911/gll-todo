import { IAddKnowledge } from './../../../api/knowledge/index.d';
import { createAction } from 'redux-actions';
export enum GetKnowledgeType {
  Set_Knowledge = 'Set_Knowledge',
  Refresh_Knowledge = 'Refresh_Knowledge',
}

export const knowledgeAction = {
  setKnowledgeList: createAction(
    GetKnowledgeType.Set_Knowledge,
    (knowledgeList: IAddKnowledge[]) => {
      return {
        knowledgeList,
      };
    },
  ),
  refreshKnowledge: createAction(GetKnowledgeType.Refresh_Knowledge, (refresh: boolean) => {
    return {
      refresh,
    };
  }),
};

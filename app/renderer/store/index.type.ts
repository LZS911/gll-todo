import { IKnowledgeState } from './reducer/knowledgeReducer';
import { ILoginUserState } from './reducer/loginReducer';
import { IManageState } from './reducer/manageReducer';
import { INoteState } from './reducer/noteReducer';
import { IPlanState } from './reducer/planReducer';

export interface IReduxState {
  login: ILoginUserState;
  plan: IPlanState;
  knowledge: IKnowledgeState;
  note: INoteState;
  manage: IManageState;
}

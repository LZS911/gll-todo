import { combineReducers } from 'redux';
import { LoginReducer } from './reducer/loginReducer';
import { PlanReducer } from './reducer/planReducer';
import { KnowledgeReducer } from './reducer/knowledgeReducer';
import { noteReducer } from './reducer/noteReducer';
import { manageReducer } from './reducer/manageReducer';

export default combineReducers({
  login: LoginReducer,
  plan: PlanReducer,
  knowledge: KnowledgeReducer,
  note: noteReducer,
  manage: manageReducer,
});

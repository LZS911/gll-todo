import { ISuccess } from './../common.d';
import {
  IAddKnowledgeParam,
  IGetKnowledgeReturn,
  IGetKnowledgeParam,
  IDeleteKnowledgeParam,
  IChangeKnowledgeParam,
} from './index.d';
import ServiceBase from '../Service.base';

class KnowledgeService extends ServiceBase {
  addKnowledge(params: IAddKnowledgeParam) {
    return this.post<ISuccess>('/api/v1/knowledge/addKnowledge', params);
  }
  getKnowledge(param?: IGetKnowledgeParam) {
    return this.get<IGetKnowledgeReturn>('/api/v1/knowledge/getKnowledge', param);
  }
  deleteKnowledge(param?: IDeleteKnowledgeParam) {
    return this.get<ISuccess>('/api/v1/knowledge/deleteKnowLedge', param);
  }
  changeKnowledge(params: IChangeKnowledgeParam) {
    return this.post<ISuccess>('/api/v1/knowledge/changeKnowledge', params);
  }
}

export default new KnowledgeService();

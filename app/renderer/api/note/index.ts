import { ISuccess } from './../common.d';
import {
  IAddNoteParam,
  IGetNoteParam,
  IDeleteNoteParam,
  IGetNoteReturn,
  IChangeNoteParam,
} from './index.d';
import ServiceBase from '../Service.base';

class NoteService extends ServiceBase {
  addNote(params: IAddNoteParam) {
    return this.post<ISuccess>('/api/v1/note/addNote', params);
  }
  getNote(param?: IGetNoteParam) {
    return this.get<IGetNoteReturn>('/api/v1/note/getNote', param);
  }
  deleteNote(param?: IDeleteNoteParam) {
    return this.get<ISuccess>('/api/v1/note/deleteNote', param);
  }
  changeNote(params: IChangeNoteParam) {
    return this.post<ISuccess>('/api/v1/note/changeNote', params);
  }
}

export default new NoteService();

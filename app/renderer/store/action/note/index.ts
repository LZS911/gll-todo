import { createAction } from 'redux-actions';
import { IAddNote } from '../../../api/note/index.d';

export enum GetNoteType {
  Set_Note = 'Set_Note',
  Refresh_Note = 'Refresh_Note',
}

export const noteAction = {
  setNoteList: createAction(GetNoteType.Set_Note, (noteList: IAddNote[]) => {
    return {
      noteList,
    };
  }),
  refreshNote: createAction(GetNoteType.Refresh_Note, (refresh: boolean) => {
    return {
      refresh,
    };
  }),
};

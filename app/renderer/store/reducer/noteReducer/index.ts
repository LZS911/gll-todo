import { IAddNote } from './../../../api/note/index.d';
import { Map, fromJS } from 'immutable';
import { handleActions, Action } from 'redux-actions';
import { GetNoteType } from '../../action/note';

export type INoteState = Map<'noteList' | 'refresh', any>;

const initState = fromJS({
  noteList: [],
  refresh: false,
});

export const noteReducer = handleActions<INoteState, any>(
  {
    [GetNoteType.Set_Note]: (
      state,
      { payload: { noteList } }: Action<{ noteList: IAddNote[] }>,
    ) => {
      return state.set('noteList', noteList);
    },
    [GetNoteType.Refresh_Note]: (state, { payload: { refresh } }: Action<{ refresh: boolean }>) => {
      return state.set('refresh', refresh);
    },
  },
  initState as any,
);

import { IReduxState } from '../../store/index.type';
import { useDispatch, useSelector } from 'react-redux';
import { IAddNote } from '../../api/note/index.d';
import { noteAction } from '../../store/action/note';

export default function useNote() {
  const dispatch = useDispatch();
  const setNoteList = (noteList: IAddNote[]) => {
    dispatch(noteAction.setNoteList(noteList));
  };

  const noteList: IAddNote[] = useSelector((state: IReduxState) => {
    return state.note.get('noteList');
  });

  const refresh = useSelector((state: IReduxState) => {
    return state.note.get('refresh');
  });

  const refreshNote = () => {
    dispatch(noteAction.refreshNote(!refresh));
  };

  return {
    setNoteList,
    noteList,
    refresh,
    refreshNote,
  };
}

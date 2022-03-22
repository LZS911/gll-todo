import { renderHooksWithRedux } from './../../../utilsTest';
import useNote from '../index.hooks';
import { act } from '@testing-library/react-hooks';
import mockNoteList from './mock_note_list';
import { List } from 'immutable';

describe('useNote', () => {
  it('should be change after call setup data method', () => {
    const { result } = renderHooksWithRedux(useNote);

    //init status
    expect(result.current.noteList).toEqual(List([]));
    expect(result.current.refresh).toEqual(false);

    act(() => result.current.setNoteList(mockNoteList));
    expect(result.current.noteList).toEqual(mockNoteList);

    act(() => result.current.refreshNote());
    expect(result.current.refresh).toEqual(true);
  });
});

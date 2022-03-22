import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import Note from '..';
import note from '../../../api/note';
import { renderWithRedux, resolveThreeSecond } from '../../../utilsTest';
import mockNoteList from './mock_note_list';

//https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
import '../../../utilsTest/matchMedia.mock';
import { generateFewDay } from '../../../utils/time';
import { TimeFormatEnum } from '../../../common/enum';

describe('test page note', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
    cleanup();
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { search: '' },
    });
  });

  const mockRequest = () => {
    const spy = jest.spyOn(note, 'getNote');
    spy.mockImplementation(() => resolveThreeSecond(mockNoteList));
    return spy;
  };

  const mockChangeNote = () => {
    const spy = jest.spyOn(note, 'changeNote');
    spy.mockImplementation(() => resolveThreeSecond(null) as any);
    return spy;
  };

  const mockDeleteNote = () => {
    const spy = jest.spyOn(note, 'deleteNote');
    spy.mockImplementation(() => resolveThreeSecond(null) as any);
    return spy;
  };

  it('should get note data from request', async () => {
    const getNote = mockRequest();
    expect(getNote).toBeCalledTimes(0);
    const { container } = renderWithRedux(<Note />);

    //wait form.validateFields
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    //wait api 3s
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getNote.mock.calls[0][0]).toEqual({
      title: undefined,
      start_time: generateFewDay(7, TimeFormatEnum.dateFormatDate),
      end_time: generateFewDay(0, TimeFormatEnum.dateFormatDate),
    });
    expect(getNote).toBeCalledTimes(1);
    screen.getByText(mockNoteList[0].title);

    expect(container).toMatchSnapshot();
  });

  it('should query the title data when you can get the title value from the search on the url', async () => {
    const location = {
      ...window.location,
      search: '?title=问题记录',
    };
    Object.defineProperty(window, 'location', {
      writable: true,
      value: location,
    });

    const getNote = mockRequest();
    expect(getNote).toBeCalledTimes(0);
    renderWithRedux(<Note />);

    //wait form.validateFields
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    //wait api 3s
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect((screen.getByTestId('search-note-title') as HTMLInputElement).value).toBe('问题记录');
    expect(getNote.mock.calls[0][0]).toEqual({
      title: '问题记录',
      start_time: generateFewDay(7, TimeFormatEnum.dateFormatDate),
      end_time: generateFewDay(0, TimeFormatEnum.dateFormatDate),
    });
    screen.getByText(mockNoteList[0].title);
  });

  it('should error title in url param', async () => {
    const location = {
      ...window.location,
      search: '?title1=问题记录',
    };
    Object.defineProperty(window, 'location', {
      writable: true,
      value: location,
    });
    const getNote = mockRequest();
    expect(getNote).toBeCalledTimes(0);
    renderWithRedux(<Note />);

    //wait form.validateFields
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    //wait api 3s
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect((screen.getByTestId('search-note-title') as HTMLInputElement).value).toBe('');
  });

  it('should be able to query by setting query conditions', async () => {
    const getNote = mockRequest();
    expect(getNote).toBeCalledTimes(0);
    renderWithRedux(<Note />);

    //wait form.validateFields
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    //wait api 3s
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getNote).toBeCalledTimes(1);

    fireEvent.change(screen.getByTestId('search-note-title'), { target: { value: '问题记录' } });
    fireEvent.click(screen.getByTestId('search-note-submit'));
    //wait form.validateFields
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    //wait api 3s
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getNote).toBeCalledTimes(2);
    expect(getNote.mock.calls[1][0]).toEqual({
      title: '问题记录',
      start_time: generateFewDay(7, TimeFormatEnum.dateFormatDate),
      end_time: generateFewDay(0, TimeFormatEnum.dateFormatDate),
    });

    fireEvent.mouseDown(screen.getByTestId('search-note-start-time'));
    fireEvent.change(screen.getByTestId('search-note-start-time'), {
      target: { value: generateFewDay(12, TimeFormatEnum.dateFormatDate) },
    });
    fireEvent.click(document.querySelectorAll('.ant-picker-cell-selected')[0]);
    fireEvent.mouseDown(screen.getByTestId('search-note-start-time'));

    fireEvent.click(screen.getByTestId('search-note-submit'));
    //wait form.validateFields
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    //wait api 3s
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getNote).toBeCalledTimes(3);
    expect(getNote.mock.calls[2][0]).toEqual({
      title: '问题记录',
      start_time: generateFewDay(12, TimeFormatEnum.dateFormatDate),
      end_time: generateFewDay(0, TimeFormatEnum.dateFormatDate),
    });

    fireEvent.mouseDown(screen.getByTestId('search-note-end-time'));
    fireEvent.change(screen.getByTestId('search-note-end-time'), {
      target: { value: generateFewDay(-5, TimeFormatEnum.dateFormatDate) },
    });
    fireEvent.click(document.querySelectorAll('.ant-picker-cell-selected')[1]);
    fireEvent.mouseDown(screen.getByTestId('search-note-end-time'));
    fireEvent.click(screen.getByTestId('search-note-submit'));
    //wait form.validateFields
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    //wait api 3s
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getNote).toBeCalledTimes(4);
    expect(getNote.mock.calls[3][0]).toEqual({
      title: '问题记录',
      start_time: generateFewDay(12, TimeFormatEnum.dateFormatDate),
      end_time: generateFewDay(-5, TimeFormatEnum.dateFormatDate),
    });
  });
  it('should be able to edit note normally', async () => {
    const changeNote = mockChangeNote();
    const getNote = mockRequest();
    const { baseElement } = renderWithRedux(<Note />);

    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(getNote).toBeCalledTimes(1);
    expect(changeNote).toBeCalledTimes(0);
    const noteCardTestId = `card-${mockNoteList[0].title}`;
    fireEvent.mouseEnter(screen.getByTestId(noteCardTestId));
    fireEvent.click(screen.getByTestId('edit'));

    screen.getByText('修改便签');
    expect(baseElement).toMatchSnapshot();
    fireEvent.click(screen.getByTestId('ly-button-modal-confirm-btn'));

    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(changeNote).toBeCalledTimes(1);
    expect(changeNote.mock.calls[0][0]).toEqual({
      title: mockNoteList[0].title,
      key: mockNoteList[0].key,
      content: mockNoteList[0].content,
    });
    expect(getNote).toBeCalledTimes(2);
    expect(baseElement).toMatchSnapshot();

    fireEvent.click(screen.getByTestId('edit'));
    fireEvent.click(screen.getByTestId('ly-button-modal-cancel-btn'));
    expect(changeNote).toBeCalledTimes(1);
    expect(getNote).toBeCalledTimes(2);
    expect(baseElement).toMatchSnapshot();
  });

  it('should be able to view note normally', async () => {
    const changeNote = mockChangeNote();
    const getNote = mockRequest();
    const { baseElement } = renderWithRedux(<Note />);

    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(getNote).toBeCalledTimes(1);
    expect(changeNote).toBeCalledTimes(0);
    const noteCardTestId = `card-${mockNoteList[0].title}`;
    fireEvent.mouseEnter(screen.getByTestId(noteCardTestId));
    fireEvent.click(screen.getByTestId('view'));

    //why ?   markdown  generateMarkdownPreview function is promise
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    screen.getByText('查看便签');
    expect(baseElement).toMatchSnapshot();
    fireEvent.click(screen.getByTestId('ly-button-modal-confirm-btn'));
    expect(getNote).toBeCalledTimes(1);
    expect(changeNote).toBeCalledTimes(0);

    fireEvent.click(screen.getByTestId('view'));
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    fireEvent.click(screen.getByTestId('ly-button-modal-cancel-btn'));
    expect(getNote).toBeCalledTimes(1);
    expect(changeNote).toBeCalledTimes(0);
    expect(baseElement).toMatchSnapshot();
  });

  it('should be able to delete note normally', async () => {
    const deleteNote = mockDeleteNote();
    const getNote = mockRequest();
    const { baseElement } = renderWithRedux(<Note />);

    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(getNote).toBeCalledTimes(1);
    expect(deleteNote).toBeCalledTimes(0);
    const noteCardTestId = `card-${mockNoteList[0].title}`;
    fireEvent.mouseEnter(screen.getByTestId(noteCardTestId));
    fireEvent.click(screen.getByTestId('delete'));
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    screen.getByText('是否删除数据?');

    fireEvent.click(screen.getByText('确 定'));

    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getNote).toBeCalledTimes(2);
    expect(deleteNote).toBeCalledTimes(1);
    expect(deleteNote.mock.calls[0][0]).toEqual({
      title: mockNoteList[0].title,
      note_key: mockNoteList[0].key,
    });
  });
});

import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import Knowledge from '..';
import knowledge from '../../../api/knowledge';
import { renderWithRedux, resolveThreeSecond } from '../../../utilsTest';
import { mockKnowledgeList } from './mock_knowledge_list';

import '../../../utilsTest/matchMedia.mock';
import { generateFewDay } from '../../../utils/time';
import { TimeFormatEnum } from '../../../common/enum';

describe('test page knowledge', () => {
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
    const spy = jest.spyOn(knowledge, 'getKnowledge');
    spy.mockImplementation(() => resolveThreeSecond(mockKnowledgeList));
    return spy;
  };

  const mockChangeKnowledge = () => {
    const spy = jest.spyOn(knowledge, 'changeKnowledge');
    spy.mockImplementation(() => resolveThreeSecond(null) as any);
    return spy;
  };

  const mockDeleteKnowledge = () => {
    const spy = jest.spyOn(knowledge, 'deleteKnowledge');
    spy.mockImplementation(() => resolveThreeSecond(null) as any);
    return spy;
  };

  it('should get Knowledge data from request', async () => {
    const getKnowledge = mockRequest();
    expect(getKnowledge).toBeCalledTimes(0);
    const { container } = renderWithRedux(<Knowledge />);

    //wait form.validateFields
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    //wait api 3s
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getKnowledge.mock.calls[0][0]).toEqual({
      title: undefined,
      start_time: generateFewDay(7, TimeFormatEnum.dateFormatDate),
      end_time: generateFewDay(0, TimeFormatEnum.dateFormatDate),
    });
    expect(getKnowledge).toBeCalledTimes(1);
    screen.getByText(mockKnowledgeList[0].title);

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

    const getKnowledge = mockRequest();
    expect(getKnowledge).toBeCalledTimes(0);
    renderWithRedux(<Knowledge />);

    //wait form.validateFields
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    //wait api 3s
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect((screen.getByTestId('search-knowledge-title') as HTMLInputElement).value).toBe(
      '问题记录',
    );
    expect(getKnowledge.mock.calls[0][0]).toEqual({
      title: '问题记录',
      start_time: generateFewDay(7, TimeFormatEnum.dateFormatDate),
      end_time: generateFewDay(0, TimeFormatEnum.dateFormatDate),
    });
    screen.getByText(mockKnowledgeList[0].title);
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
    const getKnowledge = mockRequest();
    expect(getKnowledge).toBeCalledTimes(0);
    renderWithRedux(<Knowledge />);

    //wait form.validateFields
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    //wait api 3s
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect((screen.getByTestId('search-knowledge-title') as HTMLInputElement).value).toBe('');
  });

  it('should be able to query by setting query conditions', async () => {
    const getKnowledge = mockRequest();
    expect(getKnowledge).toBeCalledTimes(0);
    renderWithRedux(<Knowledge />);

    //wait form.validateFields
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    //wait api 3s
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getKnowledge).toBeCalledTimes(1);

    fireEvent.change(screen.getByTestId('search-knowledge-title'), {
      target: { value: '问题记录' },
    });
    fireEvent.click(screen.getByTestId('search-knowledge-submit'));
    //wait form.validateFields
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    //wait api 3s
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getKnowledge).toBeCalledTimes(2);
    expect(getKnowledge.mock.calls[1][0]).toEqual({
      title: '问题记录',
      start_time: generateFewDay(7, TimeFormatEnum.dateFormatDate),
      end_time: generateFewDay(0, TimeFormatEnum.dateFormatDate),
    });

    fireEvent.mouseDown(screen.getByTestId('search-knowledge-start-time'));
    fireEvent.change(screen.getByTestId('search-knowledge-start-time'), {
      target: { value: generateFewDay(12, TimeFormatEnum.dateFormatDate) },
    });
    fireEvent.click(document.querySelectorAll('.ant-picker-cell-selected')[0]);
    fireEvent.mouseDown(screen.getByTestId('search-knowledge-start-time'));

    fireEvent.click(screen.getByTestId('search-knowledge-submit'));
    //wait form.validateFields
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    //wait api 3s
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getKnowledge).toBeCalledTimes(3);
    expect(getKnowledge.mock.calls[2][0]).toEqual({
      title: '问题记录',
      start_time: generateFewDay(12, TimeFormatEnum.dateFormatDate),
      end_time: generateFewDay(0, TimeFormatEnum.dateFormatDate),
    });

    fireEvent.mouseDown(screen.getByTestId('search-knowledge-end-time'));
    fireEvent.change(screen.getByTestId('search-knowledge-end-time'), {
      target: { value: generateFewDay(-5, TimeFormatEnum.dateFormatDate) },
    });
    fireEvent.click(document.querySelectorAll('.ant-picker-cell-selected')[1]);
    fireEvent.mouseDown(screen.getByTestId('search-knowledge-end-time'));
    fireEvent.click(screen.getByTestId('search-knowledge-submit'));
    //wait form.validateFields
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    //wait api 3s
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getKnowledge).toBeCalledTimes(4);
    expect(getKnowledge.mock.calls[3][0]).toEqual({
      title: '问题记录',
      start_time: generateFewDay(12, TimeFormatEnum.dateFormatDate),
      end_time: generateFewDay(-5, TimeFormatEnum.dateFormatDate),
    });
  });
  it('should be able to edit Knowledge normally', async () => {
    const changeKnowledge = mockChangeKnowledge();
    const getKnowledge = mockRequest();
    const { baseElement } = renderWithRedux(<Knowledge />);

    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(getKnowledge).toBeCalledTimes(1);
    expect(changeKnowledge).toBeCalledTimes(0);
    const noteCardTestId = `card-${mockKnowledgeList[0].title}`;
    fireEvent.mouseEnter(screen.getByTestId(noteCardTestId));
    fireEvent.click(screen.getByTestId('edit'));

    screen.getByText('修改知识点');
    expect(baseElement).toMatchSnapshot();
    fireEvent.click(screen.getByTestId('ly-button-modal-confirm-btn'));

    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(changeKnowledge).toBeCalledTimes(1);
    expect(changeKnowledge.mock.calls[0][0]).toEqual({
      title: mockKnowledgeList[0].title,
      key: mockKnowledgeList[0].key,
      content: mockKnowledgeList[0].content,
    });
    expect(getKnowledge).toBeCalledTimes(2);
    expect(baseElement).toMatchSnapshot();

    fireEvent.click(screen.getByTestId('edit'));
    fireEvent.click(screen.getByTestId('ly-button-modal-cancel-btn'));
    expect(changeKnowledge).toBeCalledTimes(1);
    expect(getKnowledge).toBeCalledTimes(2);
    expect(baseElement).toMatchSnapshot();
  });

  it('should be able to view Knowledge normally', async () => {
    const changeKnowledge = mockChangeKnowledge();
    const getKnowledge = mockRequest();
    const { baseElement } = renderWithRedux(<Knowledge />);

    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(getKnowledge).toBeCalledTimes(1);
    expect(changeKnowledge).toBeCalledTimes(0);
    const noteCardTestId = `card-${mockKnowledgeList[0].title}`;
    fireEvent.mouseEnter(screen.getByTestId(noteCardTestId));
    fireEvent.click(screen.getByTestId('view'));

    //why ?   markdown  generateMarkdownPreview function is promise
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    screen.getByText('查看知识点');
    expect(baseElement).toMatchSnapshot();
    fireEvent.click(screen.getByTestId('ly-button-modal-confirm-btn'));
    expect(getKnowledge).toBeCalledTimes(1);
    expect(changeKnowledge).toBeCalledTimes(0);

    fireEvent.click(screen.getByTestId('view'));
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    fireEvent.click(screen.getByTestId('ly-button-modal-cancel-btn'));
    expect(getKnowledge).toBeCalledTimes(1);
    expect(changeKnowledge).toBeCalledTimes(0);
    expect(baseElement).toMatchSnapshot();
  });

  it('should be able to delete Knowledge normally', async () => {
    const deleteKnowledge = mockDeleteKnowledge();
    const getKnowledge = mockRequest();
    const { baseElement } = renderWithRedux(<Knowledge />);

    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(getKnowledge).toBeCalledTimes(1);
    expect(deleteKnowledge).toBeCalledTimes(0);
    const noteCardTestId = `card-${mockKnowledgeList[0].title}`;
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
    expect(getKnowledge).toBeCalledTimes(2);
    expect(deleteKnowledge).toBeCalledTimes(1);
    expect(deleteKnowledge.mock.calls[0][0]).toEqual({
      title: mockKnowledgeList[0].title,
      knowledge_key: mockKnowledgeList[0].key,
    });
  });
});

import * as React from 'react';
import LyCard from '../index';
import { act, fireEvent, render, screen, cleanup } from '@testing-library/react';

describe('test card component', () => {
  const title = 'test ly card';
  const className = 'test-ly-card';
  const content = '### 承认自己无知，是知道的开始';

  afterEach(cleanup);

  it('should basic render the title', async () => {
    const { container, rerender } = render(<LyCard title={title} />);
    expect(screen.getByText(title)).not.toBeUndefined();
    expect(container).toMatchSnapshot();

    const overlongTitle = Array.from({ length: 21 }, (_, index) => `${index}`).join('');
    rerender(<LyCard title={overlongTitle} />);
    expect(screen.getByText(overlongTitle)).not.toBeUndefined();
  });

  it('should performance of the normal props', () => {
    //className : string
    const { container, rerender } = render(<LyCard title={title} className={className} />);
    expect(container.firstElementChild?.classList.contains(className)).toBeTruthy();
    expect(container).toMatchSnapshot();

    //content : string
    rerender(<LyCard title={title} content={content} />);
    expect(screen.getByText(content)).not.toBeUndefined();
    expect(container).toMatchSnapshot();

    //showEditArea : default value is true, not render bottom edit area when value is false,
    rerender(<LyCard title={title} showEditArea={false} />);
    expect(container).toMatchSnapshot();

    //confirm event
    const confirm = jest.fn();
    rerender(<LyCard title={title} confirm={confirm} />);
    expect(confirm).toBeCalledTimes(0);
    fireEvent.click(screen.getByTestId('confirm'));
    expect(confirm).toBeCalledTimes(1);

    //edit event
    const edit = jest.fn();
    rerender(<LyCard title={title} edit={edit} />);
    expect(edit).toBeCalledTimes(0);
    fireEvent.click(screen.getByTestId('edit'));
    expect(edit).toBeCalledTimes(1);

    //view event
    const view = jest.fn();
    rerender(<LyCard title={title} view={view} />);
    expect(view).toBeCalledTimes(0);
    fireEvent.click(screen.getByTestId('view'));
    expect(view).toBeCalledTimes(1);

    //cancel event
    const cancel = jest.fn();
    rerender(<LyCard title={title} cancel={cancel} />);
    expect(cancel).toBeCalledTimes(0);
    fireEvent.click(screen.getByTestId('cancel'));
    expect(cancel).toBeCalledTimes(1);

    //delete event
    const deleteFn = jest.fn();
    rerender(<LyCard title={title} delete={deleteFn} />);
    expect(deleteFn).toBeCalledTimes(0);
    fireEvent.click(screen.getByTestId('delete'));
    expect(deleteFn).toBeCalledTimes(1);

    rerender(<LyCard title={title} style={{ background: 'red' }} />);
    expect(container).toMatchSnapshot();
  });
});

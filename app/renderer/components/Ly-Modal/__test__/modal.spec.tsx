import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import LyModal from '..';
import { ILyModalProps } from '../index.type';

describe('test ly modal', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render modal title', () => {
    const props: ILyModalProps = {
      title: 'test modal',
      closeModal: () => {},
      onSave: () => {},
    };
    const { container } = render(<LyModal {...props} />);

    screen.getByText(props.title);
    expect(container).toMatchSnapshot();
  });

  it('should render exit by default model', async () => {
    const props: ILyModalProps = {
      title: 'test modal',
      closeModal: () => {},
      onSave: () => {},
    };
    const { container, rerender } = render(<LyModal {...props} />);
    screen.getByTestId('modal-exit-icon');
    screen.getByTestId('ly-button-modal-cancel-btn');

    rerender(<LyModal {...props} showExit={true} />);
    screen.getByTestId('modal-exit-icon');
    screen.getByTestId('ly-button-modal-cancel-btn');

    rerender(<LyModal {...props} showExit={false} />);
    expect(container).toMatchSnapshot();
  });

  it('should correct execution confirm and cancel the callback', () => {
    const closeModal = jest.fn();
    const onSave = jest.fn();
    const props: ILyModalProps = {
      title: 'test modal',
      closeModal,
      onSave,
    };
    render(<LyModal {...props} />);
    expect(closeModal).toBeCalledTimes(0);
    expect(onSave).toBeCalledTimes(0);

    fireEvent.click(screen.getByTestId('ly-button-modal-confirm-btn'));
    expect(onSave).toBeCalledTimes(1);

    fireEvent.click(screen.getByTestId('ly-button-modal-cancel-btn'));
    expect(closeModal).toBeCalledTimes(1);
  });

  it('should add className', () => {
    const className = 'test-modal-class';
    const props: ILyModalProps = {
      title: 'test modal',
      closeModal: () => {},
      onSave: () => {},
      className,
    };
    const { container } = render(<LyModal {...props} />);
    expect(container).toMatchSnapshot();
    expect(
      (
        container.firstElementChild?.lastChild?.firstChild as HTMLElement
      ).classList.contains(className)
    ).toBeTruthy();
  });
});

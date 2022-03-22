import { act, renderHook } from '@testing-library/react-hooks';
import useBottomEditScroll from '..';

describe('test hooks useBottomEditScroll', () => {
  it('should mouse event change style', () => {
    const hideHeight = 50;
    const showHeight = 20;
    const { result } = renderHook(() => useBottomEditScroll(hideHeight, showHeight));

    //default hide status
    expect(result.current.editStyle).toEqual({
      transform: `translateY(${hideHeight}px)`,
    });

    act(() => result.current.handleMouseEnter());

    //show status
    expect(result.current.editStyle).toEqual({
      transform: `translateY(${showHeight}px)`,
    });

    act(() => result.current.handleMouseLeave());

    //hide status
    expect(result.current.editStyle).toEqual({
      transform: `translateY(${hideHeight}px)`,
    });
  });

  it('should scroll event change style', async () => {
    jest.useFakeTimers();

    const hideHeight = 40;
    const showHeight = 20;
    const { result } = renderHook(() => useBottomEditScroll(hideHeight, showHeight));

    //default hide status
    expect(result.current.editStyle).toEqual({
      transform: `translateY(${hideHeight}px)`,
    });

    const scrollParam = {
      target: {
        scrollTop: 20,
      },
    };

    act(() => {
      result.current.onScroll(scrollParam);
      jest.advanceTimersByTime(400);
    });

    expect(result.current.editStyle).toEqual({
      transform: `translateY(${showHeight + scrollParam.target.scrollTop}px)`,
    });

    const scrollParam2 = {
      target: {
        scrollTop: 40,
      },
    };

    act(() => {
      result.current.onScroll(scrollParam2);
      jest.advanceTimersByTime(400);
    });

    expect(result.current.editStyle).toEqual({
      transform: `translateY(${showHeight + scrollParam2.target.scrollTop}px)`,
    });

    act(() => result.current.handleMouseLeave());

    expect(result.current.editStyle).toEqual({
      transform: `translateY(${hideHeight + scrollParam2.target.scrollTop}px)`,
    });
  });
});

import { renderHooksWithRedux } from './../../../utilsTest';
import useManage from '../index.hooks';
import { act } from '@testing-library/react-hooks';

describe('useNote', () => {
  it('should be change after call setup data method', () => {
    const { result } = renderHooksWithRedux(useManage);

    //init status
    expect(result.current.refresh).toEqual(false);
    act(() => result.current.refreshManage());
    expect(result.current.refresh).toEqual(true);
  });
});

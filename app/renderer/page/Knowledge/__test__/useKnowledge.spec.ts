import { renderHooksWithRedux } from './../../../utilsTest';
import useKnowledge from '../index.hooks';
import { act } from '@testing-library/react-hooks';
import { mockKnowledgeList } from './mock_knowledge_list';
import { List } from 'immutable';

describe('useNote', () => {
  it('should be change after call setup data method', () => {
    const { result } = renderHooksWithRedux(useKnowledge);

    //init status
    expect(result.current.knowledgeList).toEqual(List([]));
    expect(result.current.refresh).toEqual(false);

    act(() => result.current.setKnowledgeList(mockKnowledgeList));
    expect(result.current.knowledgeList).toEqual(mockKnowledgeList);

    act(() => result.current.refreshKnowledge());
    expect(result.current.refresh).toEqual(true);
  });
});

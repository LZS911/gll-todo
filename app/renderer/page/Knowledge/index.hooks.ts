import { IReduxState } from '../../store/index.type';
import { useDispatch, useSelector } from 'react-redux';
import { IAddKnowledge } from '../../api/knowledge/index.d';
import { knowledgeAction } from '../../store/action/knowledge';

export default function useKnowledge() {
  const dispatch = useDispatch();
  const setKnowledgeList = (knowledgeList: IAddKnowledge[]) => {
    dispatch(knowledgeAction.setKnowledgeList(knowledgeList));
  };

  const knowledgeList: IAddKnowledge[] = useSelector((state: IReduxState) => {
    return state.knowledge.get('knowledgeList');
  });

  const refresh = useSelector((state: IReduxState) => {
    return state.knowledge.get('refresh');
  });

  const refreshKnowledge = () => {
    dispatch(knowledgeAction.refreshKnowledge(!refresh));
  };

  return {
    setKnowledgeList,
    knowledgeList,
    refresh,
    refreshKnowledge,
  };
}

import { FormInstance, message } from 'antd';
import useKnowledge from '../../../../../Knowledge/index.hooks';
import { useLocation } from 'react-router-dom';
import KnowledgeService from '../../../../../../api/knowledge';
import { useCallback } from 'react';

export default function useKnowledgeModal(
  form: FormInstance<any>,
  closeModal: (saveExit?: string) => void
) {
  const { refreshKnowledge } = useKnowledge();
  const location = useLocation();

  const handleSave = useCallback(() => {
    return form
      .validateFields()
      .then((value) => {
        const params = {
          knowledge_title: value.knowledge_title,
          knowledge_content: value.knowledge_content,
        };
        KnowledgeService.addKnowledge(params).then(() => {
          message.success('添加知识点成功!');
          closeModal('add_knowledge_content');
          if (location.pathname === '/knowledge') {
            refreshKnowledge();
          }
        });
      })
      .catch(() => {});
  }, [closeModal, form, location.pathname, refreshKnowledge]);

  return [handleSave];
}

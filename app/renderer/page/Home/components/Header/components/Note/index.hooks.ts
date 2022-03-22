import { FormInstance, message } from 'antd';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import note from '../../../../../../api/note';
import useNote from '../../../../../Note/index.hooks';

export default function useNoteModal(
  form: FormInstance<any>,
  closeModal: (saveExit?: string) => void
) {
  const { refreshNote } = useNote();
  const location = useLocation();

  const handelSave = React.useCallback(() => {
    return form
      .validateFields()
      .then((value) => {
        const params = {
          note_title: value.note_title,
          note_content: value.note_content,
        };
        note.addNote(params).then(() => {
          message.success('添加便签成功!');
          closeModal('add_note_content');
          if (location.pathname === '/note') {
            refreshNote();
          }
        });
      })
      .catch(() => {});
  }, [closeModal, form, location.pathname, refreshNote]);

  return [handelSave];
}

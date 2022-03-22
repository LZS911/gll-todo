import React from 'react';
import { localWrapper } from '../../utils';
import LyModal from '../Ly-Modal';
import MarkDown from '../MarkDown';
import { IEditModalProps } from './index.type';

export default function EditModal(props: IEditModalProps) {
  const [value, setValue] = React.useState('');
  const onSave = React.useCallback(() => {
    props.onSave(value);
    localWrapper.remove(props.name);
  }, [value, props]);

  const closeModal = React.useCallback(() => {
    props.closeModal();
    localWrapper.remove(props.name);
  }, [props]);
  return (
    <LyModal
      showExit={true}
      onSave={onSave}
      closeModal={closeModal}
      title={props.title}
    >
      <MarkDown
        size="large"
        onChange={setValue}
        name={props.name}
        defaultContent={props.defaultContent}
        readonly={props.readOnly}
        defaultModal={props.readOnly ? 'preview' : 'write'}
      />
    </LyModal>
  );
}

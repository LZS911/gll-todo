import React from 'react';
import { classnames, localWrapper } from '../../../../utils';
import { formItemLayout } from '../../../../utils/formUtils';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import { tabList, addModalTabList, modalTypeMap } from './index.data';
import { Form, Radio, Space } from 'antd';
import { RadioChangeEvent } from 'antd/lib';
import { KnowledgeModal, NoteModal, PlanModal } from './components';
import usePlanModal from './components/Plan/index.hooks';
import '../../../../style/common.less';
import './index.less';
import useKnowledgeModal from './components/Knowledge/index.hooks';
import useNoteModal from './components/Note/index.hooks';
import { ModalType } from './index.d';
import useManage from '../../../Manage/index.hooks';
import { LyInput, LyModal } from '../../../../components';
import { loginAction } from '../../../../store/action/login';
import { IReduxState } from '../../../../store/index.type';

export default function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const location = useLocation();

  const exit = () => {
    localWrapper.remove('userInfo');
    dispatch(loginAction.setLoginState(false));
    dispatch(loginAction.setLoginInfo('', picIndex));
    history.push('login');
  };

  const [currentTab, setCurrentTab] = React.useState('');

  React.useEffect(() => {
    setCurrentTab(location.pathname.substring(1));
  }, [location.pathname, form]);

  const generateTabs = () => {
    return tabList.map((item) => {
      return (
        <div
          className={classnames(
            ['tab-item', 'tab-item-active'],
            [true, currentTab === item.path]
          )}
          key={item.path}
        >
          <Link to={item.path}>{item.name}</Link>
        </div>
      );
    });
  };

  const [modalStatus, setModalStatus] = React.useState(false);
  const openAddModal = () => {
    setModalStatus(true);
    form.setFieldsValue({
      add_type: modalTypeMap.get(location.pathname.substring(1)),
    });
    setModalType(
      (modalTypeMap.get(location.pathname.substring(1)) as any) ?? 'note_type'
    );
  };

  const closeModal = React.useCallback(
    (saveExit?: string) => {
      form.resetFields();
      setModalStatus(false);
      saveExit && localWrapper.remove(saveExit);
    },
    [form]
  );

  const [modalType, setModalType] = React.useState<ModalType>('plan_type');

  const handleChangeModelType = React.useCallback((e: RadioChangeEvent) => {
    setModalType(e.target.value as ModalType);
  }, []);

  const { refreshManage } = useManage();
  const [planHandleSave] = usePlanModal(form, closeModal);
  const [knowledgeHandleSave] = useKnowledgeModal(form, closeModal);
  const [noteHandleSave] = useNoteModal(form, closeModal);
  const picIndex = useSelector((state: IReduxState) => {
    return state.login.get('pic') ?? 5;
  });
  const handleSave = React.useCallback(async () => {
    const handleMap = new Map<ModalType, () => void>([
      ['plan_type', planHandleSave],
      ['knowledge_type', knowledgeHandleSave],
      ['note_type', noteHandleSave],
    ]);

    await handleMap.get(modalType)?.();

    if (location.pathname === '/manage') {
      refreshManage();
    }
  }, [
    planHandleSave,
    knowledgeHandleSave,
    noteHandleSave,
    modalType,
    location.pathname,
    refreshManage,
  ]);

  return (
    <div className="header-content">
      <Space>
        <div className="header-logo" onClick={exit}>
          <div className="header-logo-pic"></div>
          <div className="header-logo-text">
            <div className="major-text">成长助手</div>
            <div className="minor-text">自律 | 自由</div>
          </div>
        </div>
        <div className="header-tabs">{generateTabs()}</div>
        <LyInput placeholder="全局搜索" className="header-search" />
      </Space>
      <Space>
        <div onClick={openAddModal} className="header-add">
          +
        </div>
        <div className="header-pic">
          <img
            src={require(`../../../../assets/pic/avatar_0${picIndex + 1}.png`)}
          />
        </div>
      </Space>

      {modalStatus && (
        <LyModal title="添加" onSave={handleSave} closeModal={closeModal}>
          <Form form={form} {...formItemLayout} colon={false}>
            <Form.Item name="add_type" label="类型" required={true}>
              <Radio.Group
                onChange={handleChangeModelType}
                optionType="button"
                options={addModalTabList}
              />
            </Form.Item>
            {modalType === 'plan_type' && <PlanModal />}

            {modalType === 'knowledge_type' && <KnowledgeModal />}

            {modalType === 'note_type' && <NoteModal />}
          </Form>
        </LyModal>
      )}
    </div>
  );
}

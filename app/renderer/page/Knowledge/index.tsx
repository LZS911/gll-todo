import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Input, message, Form } from 'antd';
import useKnowledge from './index.hooks';
import KnowledgeService from '../../api/knowledge';
import {
  IAddKnowledge,
  IChangeKnowledgeParam,
  IGetKnowledgeParam,
} from '../../api/knowledge/index.d';
import { showWarn } from '../../utils';
import { TimeFormatEnum } from '../../common/enum';
import formatUrlParam from '../../utils/formatUrlParam';
import { formItemSearchLayout, validatorDate } from '../../utils/formUtils';
import { generateFewDay } from '../../utils/time';
import { EditModal, LyCard } from '../../components';
import './index.less';

export default function Knowledge() {
  const [modalTitle, setModalTitle] = useState<'修改知识点' | '查看知识点'>(
    '修改知识点'
  );
  const { knowledgeList, setKnowledgeList, refresh, refreshKnowledge } =
    useKnowledge();
  const [showEdit, setShowEdit] = useState(false);
  const [currentEditKnowledge, setCurrentEditKnowledge] =
    useState<IAddKnowledge>({} as any);

  const [form] = Form.useForm();
  const { validatorStart, validatorEnd } = validatorDate();

  useEffect(() => {
    form.validateFields().then((val) => {
      const param: IGetKnowledgeParam = {
        knowledge_title: val.knowledge_title,
        start_time: val.start_time.format(TimeFormatEnum.dateFormatDate),
        end_time: val.end_time.format(TimeFormatEnum.dateFormatDate),
      };
      KnowledgeService.getKnowledge(param).then((res) => {
        console.log(res);
        setKnowledgeList(res.data);
      });
    });
  }, [refresh]);

  useEffect(() => {
    const { title } = formatUrlParam(location.search ?? '');
    const start_time = form.getFieldValue('start_time');
    const end_time = form.getFieldValue('end_time');
    if (!start_time && !end_time) {
      !!title
        ? form.setFieldsValue({
            knowledge_title: title,
            start_time: generateFewDay(7),
            end_time: generateFewDay(-1),
          })
        : form.setFieldsValue({
            start_time: generateFewDay(7),
            end_time: generateFewDay(-1),
          });
    }
  }, [form]);

  const changeKnowledge = React.useCallback(
    (value: string) => {
      if (modalTitle === '修改知识点') {
        const param: IChangeKnowledgeParam = {
          knowledge_title: currentEditKnowledge.knowledge_title,
          knowledge_id: currentEditKnowledge.knowledge_id,
          knowledge_content: value,
        };

        KnowledgeService.changeKnowledge(param).then(() => {
          message.success('修改成功!');
          setShowEdit(false);
          refreshKnowledge();
        });
      } else {
        setShowEdit(false);
      }
    },
    [
      currentEditKnowledge.knowledge_id,
      currentEditKnowledge.knowledge_title,
      modalTitle,
    ]
  );

  return (
    <div className="knowledge-page">
      <div className="filter-header">
        <Form
          {...formItemSearchLayout}
          className="filter-knowledge-header-form"
          form={form}
          layout="inline"
        >
          <Form.Item name="knowledge_title" className="search-input">
            <Input
              data-testid="search-knowledge-title"
              placeholder="请输入关键字进行搜索"
              onKeyPress={(e) => {
                if (e.code === 'Enter') {
                  refreshKnowledge();
                }
              }}
            />
          </Form.Item>
          <Form.Item
            name="start_time"
            rules={[
              {
                validator: validatorStart,
              },
            ]}
          >
            <DatePicker
              format={TimeFormatEnum.dateFormatDate}
              placeholder="开始时间"
              allowClear={false}
              data-testid="search-knowledge-start-time"
            />
          </Form.Item>
          <Form.Item
            name="end_time"
            rules={[
              {
                validator: validatorEnd,
              },
            ]}
          >
            <DatePicker
              format={TimeFormatEnum.dateFormatDate}
              placeholder="结束时间"
              allowClear={false}
              data-testid="search-knowledge-end-time"
            />
          </Form.Item>
        </Form>

        <Button
          data-testid="search-knowledge-submit"
          onClick={refreshKnowledge}
          type="primary"
        >
          查询
        </Button>
      </div>

      <div className="knowledge-content">
        {knowledgeList.map((item) => {
          return (
            <LyCard
              key={item.knowledge_id}
              className="plan-item-knowledge"
              title={item.knowledge_title}
              content={item.knowledge_content}
              edit={() => {
                setModalTitle('修改知识点');
                setShowEdit(true);
                setCurrentEditKnowledge(item);
              }}
              view={() => {
                setModalTitle('查看知识点');
                setShowEdit(true);
                setCurrentEditKnowledge(item);
              }}
              delete={() => {
                showWarn({
                  content: '是否删除数据?',
                  onCancel: () => {},
                  onOk: () => {
                    KnowledgeService.deleteKnowledge({
                      knowledge_id: item.knowledge_id,
                    }).then(() => {
                      message.success('删除成功!');
                      refreshKnowledge();
                    });
                  },
                });
              }}
            />
          );
        })}
      </div>
      {showEdit && (
        <EditModal
          name="edit-note"
          title={modalTitle}
          closeModal={() => setShowEdit(false)}
          onSave={changeKnowledge}
          defaultContent={currentEditKnowledge.knowledge_content}
          readOnly={modalTitle === '查看知识点'}
        />
      )}
    </div>
  );
}

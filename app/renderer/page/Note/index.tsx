import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, message, DatePicker, Form } from 'antd';
import useNote from './index.hooks';
import NoteService from '../../api/note';
import {
  IGetNoteParam,
  IAddNote,
  IChangeNoteParam,
} from '../../api/note/index.d';

import './index.less';
import { showWarn } from '../../utils';
import { generateFewDay } from '../../utils/time';
import { TimeFormatEnum } from '../../common/enum';
import { formItemSearchLayout, validatorDate } from '../../utils/formUtils';
import formatUrlParam from '../../utils/formatUrlParam';
import { EditModal, LyCard } from '../../components';

export default function Note() {
  const [modalTitle, setModalTitle] = useState<'修改便签' | '查看便签'>(
    '修改便签'
  );
  const { noteList, setNoteList, refresh, refreshNote } = useNote();
  const [showEdit, setShowEdit] = React.useState(false);
  const [currentEditNote, setCurrentEditNote] = useState<IAddNote>({} as any);
  const [form] = Form.useForm();
  const { validatorStart, validatorEnd } = validatorDate();

  useEffect(() => {
    form.validateFields().then((val) => {
      const param: IGetNoteParam = {
        note_title: val.note_title,
        start_time: val.start_time.format(TimeFormatEnum.dateFormatDate),
        end_time: val.end_time.format(TimeFormatEnum.dateFormatDate),
      };
      NoteService.getNote(param).then((res) => {
        setNoteList(res.data);
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
            note_title: title,
            start_time: generateFewDay(7),
            end_time: generateFewDay(-1),
          })
        : form.setFieldsValue({
            start_time: generateFewDay(7),
            end_time: generateFewDay(-1),
          });
    }
  }, [form]);

  const changeNote = useCallback(
    (value: string) => {
      if (modalTitle === '修改便签') {
        const param: IChangeNoteParam = {
          note_title: currentEditNote.note_title,
          note_id: currentEditNote.note_id,
          note_content: value,
        };

        NoteService.changeNote(param).then(() => {
          message.success('修改成功!');
          setShowEdit(false);
          refreshNote();
        });
      } else {
        setShowEdit(false);
      }
    },
    [currentEditNote.note_id, currentEditNote.note_title, modalTitle]
  );

  return (
    <div className="note-page">
      <div className="filter-header">
        <Form
          {...formItemSearchLayout}
          className="filter-note-header-form"
          form={form}
          layout="inline"
        >
          <Form.Item name="note_title" className="search-input">
            <Input
              data-testid="search-note-title"
              placeholder="请输入关键字进行搜索"
              onKeyPress={(e) => {
                if (e.code === 'Enter') {
                  refreshNote();
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
              data-testid="search-note-start-time"
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
              data-testid="search-note-end-time"
            />
          </Form.Item>
        </Form>
        <Button
          data-testid="search-note-submit"
          onClick={refreshNote}
          type="primary"
        >
          查询
        </Button>
      </div>

      <div className="note-content">
        {noteList.map((item) => {
          return (
            <LyCard
              key={item.note_id}
              title={item.note_title}
              content={item.note_content}
              edit={() => {
                setModalTitle('修改便签');
                setShowEdit(true);
                setCurrentEditNote(item);
              }}
              view={() => {
                setModalTitle('查看便签');
                setShowEdit(true);
                setCurrentEditNote(item);
              }}
              delete={() => {
                showWarn({
                  content: '是否删除数据?',
                  onCancel: () => {},
                  onOk: () => {
                    NoteService.deleteNote({
                      note_id: item.note_id,
                    }).then(() => {
                      message.success('删除成功!');
                      refreshNote();
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
          onSave={changeNote}
          defaultContent={currentEditNote.note_content}
          readOnly={modalTitle === '查看便签'}
        />
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Title } from './component';
import { cardData, barData, pieData } from './index.data';
import manage from '../../api/manage';
import { IGetManager } from '../../api/manage/index.d';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { IBarCharts } from '../../components/Ly-Charts/index.type';
import plan from '../../api/plan';
import { IAddPlan } from '../../api/plan/index.d';
import useManage from './index.hooks';
import { LyCalendar, LyCharts } from '../../components';

import './index.less';

export default function Manage() {
  const [manageData, setManageData] = React.useState<IGetManager>({} as any);
  const { refresh } = useManage();

  const [prevData, setPrevData] = React.useState(0);
  const [echartsData, setEchartsData] = React.useState<{
    bar: IBarCharts[];
    line: IBarCharts[];
    pie: IBarCharts[];
  }>({} as any);

  useEffect(() => {
    manage.getManage({ prev: prevData }).then((res) => {
      setManageData(res.data);
      setEchartsData({
        bar: barData(res.data.knowledge_week),
        line: barData(res.data.note_week),
        pie: pieData(res.data.pie_rate),
      });
    });
  }, [prevData, refresh]);

  const [calendarData, setCalendar] = useState<IAddPlan[]>([]);

  useEffect(() => {
    plan.getPlan({}).then((res) => {
      setCalendar(res.data);
    });
  }, [refresh]);

  const generateCard = (manageData: IGetManager) => {
    return cardData(manageData.card_number).map((card) => {
      return (
        <div
          className="card-item"
          key={card.dataIndex}
          style={{ background: card.background }}
        >
          <div className="card-name">{card.name}</div>
          <div className="card-count">{card.count}</div>
        </div>
      );
    });
  };

  const getNextData = React.useCallback(() => {
    setPrevData((val) => val + 1);
  }, []);

  const getPrevData = React.useCallback(() => {
    setPrevData((val) => (val === 0 ? 0 : val - 1));
  }, []);

  const echartsLink = () => {
    return (
      <>
        <LeftOutlined data-testid="get-next-data" onClick={getNextData} />

        <RightOutlined data-testid="get-prev-data" onClick={getPrevData} />
      </>
    );
  };

  return (
    <div className="manage-content">
      <Title
        major="欢迎使用成长助手!"
        minor="轻松智能的管理你的所见·所思·所写"
      />

      {!!manageData.card_number && (
        <div className="manage-card">{generateCard(manageData)}</div>
      )}

      <Title
        major="个人纬度分析"
        minor="你的个人分析助手"
        link={echartsLink()}
      />
      <div className="manage-charts">
        {!!echartsData.bar && (
          <LyCharts
            type="bar"
            data={echartsData.bar}
            title="每周新学习知识分析"
          />
        )}

        {!!echartsData.line && (
          <LyCharts
            type="line"
            data={echartsData.line}
            title="便签每日趋势分析"
          />
        )}

        {!!echartsData.pie && (
          <LyCharts type="pie" data={echartsData.pie} title="计划指标" />
        )}
      </div>

      <Title major="计划日历" minor="不让你错过每个重要的事件~" />

      <div className="manage-calendar">
        <LyCalendar data={calendarData} />
      </div>
    </div>
  );
}

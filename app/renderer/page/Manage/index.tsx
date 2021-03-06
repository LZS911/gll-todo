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
        major="????????????????????????!"
        minor="?????????????????????????????????????????????????"
      />

      {!!manageData.card_number && (
        <div className="manage-card">{generateCard(manageData)}</div>
      )}

      <Title
        major="??????????????????"
        minor="????????????????????????"
        link={echartsLink()}
      />
      <div className="manage-charts">
        {!!echartsData.bar && (
          <LyCharts
            type="bar"
            data={echartsData.bar}
            title="???????????????????????????"
          />
        )}

        {!!echartsData.line && (
          <LyCharts
            type="line"
            data={echartsData.line}
            title="????????????????????????"
          />
        )}

        {!!echartsData.pie && (
          <LyCharts type="pie" data={echartsData.pie} title="????????????" />
        )}
      </div>

      <Title major="????????????" minor="????????????????????????????????????~" />

      <div className="manage-calendar">
        <LyCalendar data={calendarData} />
      </div>
    </div>
  );
}

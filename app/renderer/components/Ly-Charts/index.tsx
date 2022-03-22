import React from 'react';
import ReactECharts from 'echarts-for-react';
import './index.less';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { IBarCharts } from './index.type';

const textStyle = {
  color: ' #999',
  fontSize: '14px',
};

interface IBar {
  data: IBarCharts[];
  title: string;
  textStyle?: {
    color: string;
    fontSize: string;
  };
  type: 'bar' | 'line' | 'pie';
  className?: string;
  next?: () => void;
  prev?: () => void;
}

const Charts: React.FC<IBar> = (props) => {
  const getOptions = React.useCallback(() => {
    const options = {
      title: {
        text: props.title,
        textStyle: props.textStyle ?? textStyle,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: [
        {
          type: 'category',
          nameTextStyle: {
            fontSize: 20,
          },
          data: props.data.map((item) => item.label),
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          type: props.type,
          areaStyle: {
            color: '#fff',
          },
          data: props.data.map((item) => {
            return {
              itemStyle: {
                color: item.itemColor ?? '',
              },
              value: item.value,
            };
          }),
          barWidth: 20,
        },
      ],
    };
    if (props.type === 'pie') {
      return {
        ...options,
        xAxis: {
          show: false,
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            type: props.type,
            areaStyle: {
              color: '#fff',
            },
            data: props.data.map((item) => {
              return {
                name: item.label,
                value: item.value,
              };
            }),
            radius: [0, 50],
          },
        ],
      };
    }
    return options;
  }, [props.data]);
  return (
    <div className="echarts-item-card-content">
      <ReactECharts
        className={`${props.className && props.className}`}
        option={getOptions()}
        style={{ height: 223, width: '100%' }}
        notMerge={true}
      />

      <div hidden={true} className="echarts-item-editArea">
        {props.prev && (
          <span className="edit-img" onClick={props.prev}>
            <LeftOutlined />
          </span>
        )}
        {props.next && (
          <span className="edit-img" onClick={props.next}>
            <RightOutlined />
          </span>
        )}
      </div>
    </div>
  );
};

export default Charts;

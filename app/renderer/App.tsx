import RouterComponent from './router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import './App.less';
import 'antd/dist/antd.less';

moment.locale('zh-cn');

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <RouterComponent />
    </ConfigProvider>
  );
};

export default App;

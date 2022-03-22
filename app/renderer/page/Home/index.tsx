import { Header } from './components';

import './index.less';

export default function Home(props: { children: JSX.Element }) {
  return (
    <div className="main-content">
      <Header />
      <div className="page-content">{props.children}</div>
    </div>
  );
}

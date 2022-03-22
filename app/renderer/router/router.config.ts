import { IMenuDataItem } from './index.d';
import * as React from 'react';

const routers: IMenuDataItem[] = [
  {
    path: '/login',
    name: 'login',
    exact: true,
    component: React.lazy(() => import('../page/Login')),
  },
  {
    path: '/manage',
    name: 'manage',
    exact: true,
    component: React.lazy(() => import('../page/Manage')),
  },
  {
    path: '/plan',
    name: 'plan',
    exact: true,
    component: React.lazy(() => import('../page/Plan')),
  },
  {
    path: '/knowledge',
    name: 'knowledge',
    exact: true,
    component: React.lazy(() => import('../page/Knowledge')),
  },
  {
    path: '/note',
    name: 'note',
    exact: true,
    component: React.lazy(() => import('../page/Note')),
  },
];

export default routers;

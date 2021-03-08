import React from 'react';


const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Chat = React.lazy(() => import('./views/chats/Chat'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/chats', name: 'Chats', component: Chat }
];

export default routes;

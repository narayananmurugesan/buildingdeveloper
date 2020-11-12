import React from 'react';
const ProjectItem = React.lazy(() => import('./views/ProjectItem/ProjectItem'));
const Project = React.lazy(() => import('./views/Project/Project'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/item', name: 'ProjectItem', component: ProjectItem },
  { path: '/project/:id', name: 'Project', component: Project }
];

export default routes;

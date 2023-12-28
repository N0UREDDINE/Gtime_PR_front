import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TimePage from './TimePage';
import Sidebar from './Sidebar';
import LoginPage from './LoginPage';
import Consulter from './Consulter'


// Définissez vos routes ici
const routes = [
  {
    path: '/time',
    component: TimePage,
  },
  {
    path: '/sidebar',
    component: Sidebar,
  },
  {
    path: '/Login',
    component: LoginPage,
  },
  {
    path: '/consulter',
    component: Consulter,
  },
  {
    path: '/ParJour',
    component: ParJour,
  },
  // Ajoutez d'autres routes ici
];

// Fonction pour rendre les routes comme composants Route de React Router
export const RenderRoutes = ({ routes }) => {
  return (
    <Routes>
      {routes.map((route, i) => (
        <Route key={i} path={route.path} element={React.createElement(route.component)} />
      ))}
    </Routes>
  );
};

export default routes;

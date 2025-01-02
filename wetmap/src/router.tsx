import React, { useContext, useEffect } from 'react';
import MapPage from './components/MapPage';
import { useRoutes } from 'react-router-dom';
import { ModalContext } from './components/reusables/modal/context';
import PasswordUpdate from './components/newModals/passwordUpdate';

const ShowModal = ({ component }: { component: React.FC<any> }): JSX.Element | null => {
  const { modalShow } = useContext(ModalContext);
  useEffect(() => {
    modalShow(component);
  }, []);
  return null;
};

export const routes = [
  {
    path:     '*',
    element:  <MapPage />,
    children: [
      {
        path:     'account', children: [
          { path:    'password', element: <ShowModal component={PasswordUpdate} /> },
        ],
      },
    ],
  },
];

export default () => useRoutes(routes);

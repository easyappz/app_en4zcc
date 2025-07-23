import React, { useEffect } from 'react';
import { Layout as AntLayout } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import AppFooter from './Footer';

const { Content } = AntLayout;

function Layout({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header />
      <AntLayout>
        <Sidebar />
        <Content className="vk-content">
          {children}
        </Content>
      </AntLayout>
      <AppFooter />
    </AntLayout>
  );
}

export default Layout;

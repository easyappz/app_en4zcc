import React from 'react';
import { Layout, Typography } from 'antd';

const { Header: AntHeader } = Layout;
import '../App.css';

function Header() {
  return (
    <AntHeader className="vk-header">
      <Typography.Title level={3} style={{ color: 'white', margin: 0 }}>
        EasyAppz Social
      </Typography.Title>
    </AntHeader>
  );
}

export default Header;

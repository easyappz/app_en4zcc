import React from 'react';
import { Layout, Typography, Input } from 'antd';

const { Header: AntHeader } = Layout;
import { SearchOutlined } from '@ant-design/icons';
import '../App.css';

function Header() {
  return (
    <AntHeader className="vk-header">
      <Typography.Title className="logo" level={3} style={{ color: 'white', margin: 0 }}>
        VK
      </Typography.Title>
      <Input
        className="search"
        placeholder="Поиск"
        prefix={<SearchOutlined style={{ color: 'white' }} />}
        style={{ backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', color: 'white' }}
      />
    </AntHeader>
  );
}

export default Header;

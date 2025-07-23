import React from 'react';
import { Menu, Layout } from 'antd';
import { HomeOutlined, UserOutlined, LogoutOutlined, MessageOutlined, TeamOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Sider className="vk-sider" width={200}>
      <Menu mode="vertical" defaultSelectedKeys={['feed']}>
        <Menu.Item key="feed" icon={<HomeOutlined />} onClick={() => navigate('/feed')}>
          Моя страница
        </Menu.Item>
        <Menu.Item key="news" icon={<MessageOutlined />} onClick={() => navigate('/feed')}>
          Новости
        </Menu.Item>
        <Menu.Item key="friends" icon={<TeamOutlined />} onClick={() => navigate('/friends')}>
          Друзья
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => navigate('/profile')}>
          Профиль
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
          Выйти
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;

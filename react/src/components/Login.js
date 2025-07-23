import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';

import '../App.css';

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { token } = await loginUser(values);
      localStorage.setItem('token', token);
      message.success('Вход успешен');
      navigate('/profile');
    } catch (error) {
      message.error(error || 'Ошибка входа');
    }
  };

  return (
    <div className="vk-form">
      <Form name="login" onFinish={onFinish} layout="vertical">
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Введите корректный email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Пароль" rules={[{ required: true, message: 'Введите пароль' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="vk-button" block>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;

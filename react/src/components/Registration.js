import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';

import '../App.css';

function Registration() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { token } = await registerUser(values);
      localStorage.setItem('token', token);
      message.success('Регистрация успешна');
      navigate('/profile');
    } catch (error) {
      message.error(error || 'Ошибка регистрации');
    }
  };

  return (
    <div className="vk-form">
      <Form name="registration" onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label="Имя" rules={[{ required: true, message: 'Введите имя' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Введите корректный email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Пароль" rules={[{ required: true, min: 6, message: 'Пароль минимум 6 символов' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="vk-button" block>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Registration;

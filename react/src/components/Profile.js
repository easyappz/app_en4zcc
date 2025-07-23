import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, message, Avatar, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getUserProfile, updateUserProfile } from '../api/profile';

import '../App.css';

function Profile() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
        form.setFieldsValue({ name: data.name });
        setLoading(false);
      } catch (error) {
        message.error('Ошибка загрузки профиля');
        setLoading(false);
      }
    };
    fetchProfile();
  }, [form]);

  const onFinish = async (values) => {
    try {
      const updatedData = { ...values };
      if (fileList.length > 0) {
        updatedData.avatar = fileList[0].thumbUrl;
      }
      const updatedProfile = await updateUserProfile(updatedData);
      setProfile(updatedProfile);
      message.success('Профиль обновлен');
    } catch (error) {
      message.error('Ошибка обновления профиля');
    }
  };

  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileList([{ uid: '1', name: file.name, status: 'done', thumbUrl: e.target.result }]);
    };
    reader.readAsDataURL(file);
    return false; // Prevent upload
  };

  if (loading) return <Spin />;

  return (
    <div>
      <h2>Профиль</h2>
      <Avatar src={profile.avatar} size={100} className="vk-avatar" />
      <p>Email: {profile.email}</p>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label="Имя" rules={[{ required: true, message: 'Введите имя' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Аватар">
          <Upload fileList={fileList} beforeUpload={beforeUpload} listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Загрузить аватар</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="vk-button">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Profile;

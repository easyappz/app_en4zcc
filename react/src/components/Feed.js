import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPosts, createPost, likePost, unlikePost, addComment } from '../api/posts';
import { getProfile } from '../api/profile';
import { Card, Avatar, Button, Input, Upload, List, Typography, Space, message } from 'antd';
import { HeartOutlined, HeartFilled, CommentOutlined, UploadOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const { TextArea } = Input;
const { Text } = Typography;

function Feed() {
  const queryClient = useQueryClient();
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [commentTexts, setCommentTexts] = useState({});

  const { data: user } = useQuery({ queryKey: ['profile'], queryFn: getProfile });
  const { data: posts, isLoading } = useQuery({ queryKey: ['posts'], queryFn: getPosts });

  const createMutation = useMutation({
    mutationFn: (data) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      setNewPostContent('');
      setNewPostImage(null);
      message.success('Пост создан');
    },
  });

  const likeMutation = useMutation({
    mutationFn: (id) => likePost(id),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  });

  const unlikeMutation = useMutation({
    mutationFn: (id) => unlikePost(id),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  });

  const commentMutation = useMutation({
    mutationFn: ({ id, text }) => addComment(id, text),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      setCommentTexts({});
    },
  });

  const handleCreatePost = () => {
    if (!newPostContent && !newPostImage) return;
    createMutation.mutate({ content: newPostContent, image: newPostImage });
  };

  const handleImageUpload = ({ file }) => {
    if (file.size > 1024 * 1024) {
      message.error('Изображение превышает лимит 1MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setNewPostImage(reader.result.split(',')[1]);
    };
    reader.readAsDataURL(file);
  };

  const handleLike = (post) => {
    const isLiked = post.likes.some((id) => id === user?._id);
    if (isLiked) {
      unlikeMutation.mutate(post._id);
    } else {
      likeMutation.mutate(post._id);
    }
  };

  const handleCommentChange = (postId, value) => {
    setCommentTexts((prev) => ({ ...prev, [postId]: value }));
  };

  const handleAddComment = (postId) => {
    const text = commentTexts[postId];
    if (!text) return;
    commentMutation.mutate({ id: postId, text });
  };

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
      <Card style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <TextArea
            placeholder="Что у вас нового?"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            autoSize={{ minRows: 3 }}
          />
          <Space>
            <Upload
              accept="image/*"
              showUploadList={false}
              customRequest={handleImageUpload}
            >
              <Button icon={<UploadOutlined />}>Прикрепить изображение</Button>
            </Upload>
            <Button type="primary" onClick={handleCreatePost}>
              Опубликовать
            </Button>
          </Space>
        </Space>
      </Card>
      {posts?.map((post) => (
        <Card
          key={post._id}
          style={{ marginBottom: 16 }}
          actions={[
            <Space onClick={() => handleLike(post)}>
              {post.likes.some((id) => id === user?._id) ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
              {post.likes.length}
            </Space>,
            <Space>
              <CommentOutlined />
              {post.comments.length}
            </Space>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar src={`data:image/png;base64,${post.authorId.avatar}`} />}
            title={post.authorId.name}
            description={format(new Date(post.createdAt), 'd MMMM yyyy в HH:mm', { locale: ru })}
          />
          <Text>{post.content}</Text>
          {post.image && <img alt="post" style={{ width: '100%', marginTop: 8 }} src={`data:image/png;base64,${post.image}`} />}
          <div style={{ marginTop: 16 }}>
            <List
              dataSource={post.comments}
              renderItem={(comment) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={`data:image/png;base64,${comment.userId.avatar}`} />}
                    title={comment.userId.name}
                    description={comment.text}
                  />
                  <Text type="secondary">{format(new Date(comment.createdAt), 'HH:mm', { locale: ru })}</Text>
                </List.Item>
              )}
            />
            <Space style={{ width: '100%', marginTop: 8 }}>
              <Input
                placeholder="Написать комментарий..."
                value={commentTexts[post._id] || ''}
                onChange={(e) => handleCommentChange(post._id, e.target.value)}
              />
              <Button type="primary" onClick={() => handleAddComment(post._id)}>
                Отправить
              </Button>
            </Space>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default Feed;

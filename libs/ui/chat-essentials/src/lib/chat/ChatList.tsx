import React, { MouseEventHandler } from 'react';
import { List, Row, Typography, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { cyan } from '@ant-design/colors';
import { Message, User } from '@wkart/interfaces';

import styles from './chat.module.css';

export interface IChatListItem {
  id: string;
  product: { title: string };
  user?: User;
  messages: Message[];
}

export interface ChatListItemProps {
  item: IChatListItem;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export interface ChatListProps {
  data: IChatListItem[];
  onItemClick?: (item: IChatListItem) => void;
}

export const ChatListItem = ({ item, onClick }: ChatListItemProps) => {
  return (
    <List.Item className={styles["chat-list-item"]} onClick={onClick}>
      <List.Item.Meta
        avatar={<UserOutlined />}
        title={`${item.product?.title || ''}${item.user ? '@' + item.user.name : ''}`}
        description={item.messages.length ? `${item.messages[0].text}`.substr(0, 80) + '...' : ''}
      />
    </List.Item>
  );
};

export const ChatListHeader = ({ count = 0 }: { count: number }) => {
  return (
    <Row align="middle" justify="space-between">
      <Typography.Title style={{ margin: 0 }} level={5}>
        Chats
      </Typography.Title>
      <Badge
        style={{ backgroundColor: cyan[6] }}
        count={count}
        overflowCount={99}
      />
    </Row>
  );
};

export const ChatList = ({ data, onItemClick }: ChatListProps) => {
  return (
    <List
      header={<ChatListHeader count={data.length} />}
      style={{ background: 'white' }}
      dataSource={data}
      bordered
      size="large"
      renderItem={(item) => (
        <ChatListItem item={item} onClick={() => onItemClick && onItemClick(item)} />
      )}
    ></List>
  );
};

export default ChatList;

import { Drawer } from 'antd';
import { IChatListItem } from './ChatList';
import ChatMessage from './ChatMessage';
import ChatMessageForm from './ChatMessageForm';

import styles from './chat.module.css';

export interface ChatBoxProps {
  item: IChatListItem;
  userId: string;
  onClose?: () => void;
  onFormSubmit?: (text: string) => boolean | Promise<boolean>;
  visible?: boolean;
}

export const ChatBox = ({ item, userId, onClose, onFormSubmit, visible=false }: ChatBoxProps) => {
  return (
    <Drawer
      key={item.id}
      title={item.product.title}
      onClose={onClose}
      placement="right"
      width={300}
      footer={
        <ChatMessageForm onSubmit={onFormSubmit} />
      }
      visible={visible}>
      <div className={styles["chat-content"]}>
        {item.messages.map((message) => (
          <ChatMessage userId={userId} key={message.id} message={message} />
        ))}
      </div>
    </Drawer>
  );
};

export default ChatBox;
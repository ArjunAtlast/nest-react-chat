import React, { useMemo } from 'react'
import { Alert, Typography } from 'antd';
import moment from 'moment';

import styles from './chat.module.css';
import { User, Message } from '@wkart/interfaces';

export const ChatMessage = ({ message, userId }: { message: Message, userId: string }) => {
  const className = useMemo(() => {
    return `${styles['chat-message']} ${message.user?.id === userId ? styles['right']: styles['left']}` ;
  }, [message.user, userId])

  const alertType = useMemo(() => {
    return message.user?.id === userId ? 'success' : 'info';
  }, [message.user, userId])

  const timeString = useMemo(() => {
    return moment(message.createdAt).format('HH:mm')
  }, [message.createdAt])

  return (
    <div className={className}>
      <Alert type={alertType} message={message.text} />
      <Typography.Text type="secondary" style={{fontSize: '0.7rem'}}>{timeString}</Typography.Text>
    </div>
  )
};

export default ChatMessage

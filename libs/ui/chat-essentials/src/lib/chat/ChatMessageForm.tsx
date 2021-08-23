import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

export interface ChatMessageFormProps {
  onSubmit?: (text: string) => boolean | Promise<boolean> 
}

export const ChatMessageForm = ({ onSubmit }: ChatMessageFormProps) => {

  const [text, setText] = useState('');

  const handleClick = async () => {
    if (onSubmit && await onSubmit(text)) {
      setText('');
    }
  }

  return (
    <Form layout="inline">
        <Form.Item style={{flex: 1}}>
          <Input.TextArea
            rows={1}
            value={text} 
            placeholder="Say something..."
            onChange={e => setText(e.target.value)} />
        </Form.Item>

        <Button style={{flex: 'none'}} onClick={handleClick} type="primary">
          <SendOutlined />
        </Button>
    </Form>
  );
}

export default ChatMessageForm

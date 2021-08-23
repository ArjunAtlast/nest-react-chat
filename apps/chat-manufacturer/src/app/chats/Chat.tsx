import React, { useEffect } from 'react';
import { useState } from 'react';
import { ChatBox, ChatList, IChatListItem, useSocket } from '@chat-demo/essentials';
import { Message, Product, Session } from '@wkart/interfaces';

import _ from 'lodash';

const Chat = () => {

  const socket = useSocket('http://localhost:3333');

  const [chats, setChats] = useState<IChatListItem[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  useEffect(() => {
    const currentSocket = socket.current;
    chats.forEach(chat => {
      // listen to session messages
      currentSocket.on(`chat.message.${chat.id}.new`, onMessage);
    });
    return () => {
      try {
        currentSocket.connected && currentSocket.offAny(onCreateSession);
      }
      catch (error) {
        console.warn(error);
      }
    }
  }, [chats, socket])

  const onMessage = (data: Message) => {
    setChats(old => {
      console.log({ old, data })
      const chat = old.find(chat => chat.id === data.sessionId);
      if (chat) {
        return [
          {
            ...chat,
            messages: _.uniqBy([ data, ...chat.messages ], 'id')
          },
          ..._.differenceBy(old, [ chat ], 'id')
        ]
      }
      return old;
    });
  }

  const [products, setProducts] = useState<Product[]>([]);

  const onCreateSession = (session: Session) => {
    const chat: IChatListItem = {
      id: session.id as string,
      product: session.product as Product,
      user: session.user,
      messages: []
    };
    setChats(old => [...old, chat]);
  };

  useEffect(() => {
    const currentSocket = socket.current;
    products.forEach((product) => {
      currentSocket.on(`chat.session.${product.id}.new`, onCreateSession);
    });
    return () => {
      try {
        currentSocket.connected && currentSocket.offAny(onCreateSession);
      }
      catch (error) {
        console.warn(error);
      }
    }
  },[products, socket])

  const getProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const json = await response.json();
      setProducts(json);
    }
    catch(error) {
      console.warn(error);
    }
  }

  const sendMessage = async (text: string) => {
    try {
      const message: Message = {
        sessionId: currentChatId as string,
        userId: 'ADMIN',
        text
      };
      socket.current.emit('message', message);
      return true;
    }
    catch (error) {
      return false;
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div>
      <ChatList
        data={chats}
        onItemClick={(item) => setCurrentChatId(item.id)}
      />
      {chats.map((chat) => (
        <ChatBox
          key={chat.id}
          item={chat}
          userId="ADMIN"
          visible={currentChatId === chat.id}
          onFormSubmit={sendMessage}
          onClose={() => setCurrentChatId(null)}
        />
      ))}
      <pre>
        {JSON.stringify(chats, null, 2)}
      </pre>
    </div>
  );
};

export default Chat;

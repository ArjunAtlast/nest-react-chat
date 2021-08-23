import React, { useEffect, useState } from 'react';
import { ChatBox, ChatList, IChatListItem, IProductListItem, ProductList, useSocket } from '@chat-demo/essentials';
import { message, Space } from 'antd';
import { Message, Session } from '@wkart/interfaces';

import _ from 'lodash';

interface IndexPageProps {
  chats: IChatListItem[];
  products: IProductListItem[];
}

const Index = (props: IndexPageProps) => {

  const socket = useSocket('http://localhost:3333');

  const [userId, setUserId] = useState<string>('USER_1');
  const [chats, setChats] = useState<IChatListItem[]>(props.chats ?? []);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)

  useEffect(() => {
    const currentSocket = socket.current;
    chats.forEach(chat => {
      // listen to session messages
      currentSocket.on(`chat.message.${chat.id}.new`, onMessage);
    });
    return () => {
      try {
        currentSocket.connected && currentSocket.offAny(onMessage);
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

  const createSession = async (product: IProductListItem) => {
    socket.current.emit('session', {
      userId,
      productId: product.id
    }, (session: Session) => {
      const chat: IChatListItem = {
        id: session.id,
        product: session.product,
        messages: []
      };
      setChats(old => [chat, ...old]);
      setCurrentChatId(session.id);
    });
  };

  const sendMessage = async (text: string) => {
    try {
      const message: Message = {
        sessionId: currentChatId,
        userId,
        text
      };
      socket.current.emit('message', message);
      return true;
    }
    catch (error) {
      return false;
    }
  }

  return (
    <div>
      <Space style={{width: '100%'}} direction="vertical" size="large">
        <ChatList data={chats} onItemClick={(item) => setCurrentChatId(item.id)} />
        <ProductList data={props.products} onItemClick={createSession} />
      </Space>
      {
        chats.map(chat => (
          <ChatBox 
            key={chat.id}
            userId={userId}
            visible={currentChatId === chat.id}
            item={chat}
            onFormSubmit={sendMessage}
            onClose={() => setCurrentChatId(null)} />
        ))
      }
    </div>
  )
}

const getProducts = async () => {
  try {
    const response = await fetch('http://localhost:3333/api/products');
    const json = await response.json();
    return [json, null];
  }
  catch(error) {
    return [null, { products: { statusText: 'failed', message: error.message } }]
  }
}

export async function getServerSideProps() {
  let errors = {};
  const [products, productFetchErrors] = await getProducts();
  console.log(products)
  errors = {
    ...errors,
    ...productFetchErrors
  }

  return {
    props: {
      chats: [],
      products,
      errors
    }
  }
}

export default Index

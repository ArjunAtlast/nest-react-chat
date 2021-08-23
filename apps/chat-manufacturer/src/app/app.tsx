import { ConfigProvider, Layout, Row, Menu, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import styles from './app.module.css';
import Chat from './chats/Chat';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export function App() {
  return (
    <ConfigProvider
        form={{ requiredMark: "optional" }}
        componentSize="large" 
        space={{ size: "small" }} >
        <Layout style={{height: '100vh'}}>
          <Header>
            <Row align="middle" style={{height: '100%'}}>
              <Title level={3} style={{color: 'white'}}>
                CHAT MANUFACTURER
              </Title>
            </Row>
          </Header>
          <Layout>
            <Sider theme="light">
              <Menu theme="light" mode="inline" defaultSelectedKeys={['home']}>
                <Menu.Item icon={<HomeOutlined/>} key="home">Home</Menu.Item>
              </Menu>
            </Sider>
            <Content style={{padding: '1rem'}}>
              <Chat />
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
  );
}

export default App;

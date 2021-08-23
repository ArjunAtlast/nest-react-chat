import { AppProps } from 'next/app';
import { ConfigProvider, Layout, Typography, Row, Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Head from 'next/head';
import "antd/dist/antd.css";

import './styles.css';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function CustomApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>Chat User</title>
      </Head>
      <ConfigProvider
        form={{ requiredMark: "optional" }}
        componentSize="large" 
        space={{ size: "small" }} >
        <Layout style={{height: '100vh'}}>
          <Header>
            <Row align="middle" style={{height: '100%'}}>
              <Title level={3} style={{color: 'white'}}>
                CHAT USER
              </Title>
            </Row>
          </Header>
          <Layout>
            <Sider theme="light">
              <Menu theme="light" mode="inline" defaultSelectedKeys={['home']}>
                <Menu.Item icon={<HomeOutlined/>} key="home">Home</Menu.Item>
              </Menu>
            </Sider>
            <Content style={{padding: '1rem', overflow: 'auto'}}>
              <Component {...pageProps} />
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
}

export default CustomApp;

import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { Link } from 'umi';
import styles from './index.less';

const { Header, Content, Footer } = AntLayout;

const Layout: React.FC = props => {
  const { children } = props;
  return (
    <AntLayout className={styles.layout}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className={styles.logo}>Bookshelf</div>

        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">
            <Link to="/upload" className={styles.upload}>
              上传书籍
            </Link>
          </Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content className={styles['site-layout']}>
        <div className={styles['site-layout-background']}>{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ©2020 Created by CMUX
      </Footer>
    </AntLayout>
  );
};

export default Layout;

import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{backgroundColor: '#ededed'}}>
      <Header />
      <Content>
        {children}
      </Content>
      <Footer />
    </div>
  );
};

export default Layout;

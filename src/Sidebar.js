import React, { useState } from 'react';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

// Fonction pour créer un élément de menu
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// Éléments du menu
const items = [
  getItem(' ', '',''),
  getItem(' ', '',''),
  getItem(' Time', '2', <PieChartOutlined />),
  getItem('Consulter', '3', <DesktopOutlined />),
  getItem('ParJour', '4', <UserOutlined />, ),
  getItem('Modification', '5', <TeamOutlined />,),
 
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Couleur de fond pour le Sider et le Header
  const backgroundColor = '#001529'; // Couleur bleu foncé par défaut pour le thème sombre

  return (
    <Layout >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{ background: backgroundColor }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      
        <Header  />
        
      
      </Layout>
    
  );
};

export default App;
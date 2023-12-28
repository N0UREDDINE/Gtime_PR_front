import React, { useState, useEffect } from 'react';
import { Layout, Table, Input, Button, Typography, notification, Spin, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const Consulter = () => {
  const [times, setTimes] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Supposons que vous avez une variable d'état pour 'userName' et 'loginTime'
   
  const loginTime = new Date(); // Ou une autre valeur que vous souhaitez afficher

  const formatDate = (date) => {
    // Implémentez la logique de formatage de la date ici
    return date.toISOString();
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`your-api-endpoint?search=${search}`)
      .then(response => response.json())
      .then(data => {
        setTimes(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        notification.error({ message: 'Erreur de chargement des données' });
        setIsLoading(false);
      });
  }, [search]);

  const handleSearch = () => {
    // Implémentez la logique de recherche ici
  };

  const columns = [
    { title: 'Date', dataIndex: 'record_date', key: 'record_date' },
    { title: 'Heure de connexion', dataIndex: 'login_time', key: 'login_time' },
    { title: 'Heure de retard', dataIndex: 'delay_time', key: 'delay_time' },
    { title: 'Heure de service', dataIndex: 'service_time', key: 'service_time' },
    { title: 'Heure de pause', dataIndex: 'break_end_time', key: 'break_end_time' },
    { title: 'Heure de Déconexion', dataIndex: 'logout_time', key: 'logout_time' },
    { title: 'Prime', dataIndex: 'prime', key: 'prime' },
    // Autres colonnes si nécessaire
  ];


  return (
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <Space>
            <Button style={{ backgroundColor: 'orange', borderColor: 'orange', color: 'white' }}>
              Heure: {loginTime.toLocaleTimeString()}
            </Button>
            <Button style={{ backgroundColor: 'orange', borderColor: 'orange', color: 'white' }}>
              Date: {formatDate(loginTime)}
            </Button>
          </Space>
        </Header>
        <Content style={{ padding: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search by name"
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 200, marginRight: '10px' }}
            />
            <Button type="primary" onClick={handleSearch}>Search</Button>
          </div>
          {isLoading ? <Spin size="large" /> : <Table dataSource={times} columns={columns} />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Consulter;

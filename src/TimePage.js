import React, { useState, useEffect } from 'react';
import { Layout, Button, Table, Space, Typography, Modal, Input, message } from 'antd';
import { LogoutOutlined, PauseCircleOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const Dashboard = ({ userName }) => {
  const [loginTime, setLoginTime] = useState(new Date());
  const [serviceTime, setServiceTime] = useState(0);
  const [pauseTime, setPauseTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  useEffect(() => {
    const serviceInterval = setInterval(() => {
      if (!isPaused) {
        setServiceTime(prevTime => prevTime + 1);
      }
    }, 1000);

    const pauseInterval = setInterval(() => {
      if (isPaused) {
        setPauseTime(prevTime => prevTime + 1);
      }
    }, 1000);

    return () => {
      clearInterval(serviceInterval);
      clearInterval(pauseInterval);
    };
  }, [isPaused]);

  const handlePauseClick = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (confirmationCode === "2024") {
      setIsPaused(!isPaused);
      message.success('Code de confirmation correct. Statut mis à jour.');
    } else {
      message.error('Code de confirmation incorrect.');
    }
    setIsModalVisible(false);
    setConfirmationCode('');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setConfirmationCode('');
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${remainingSeconds}`;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const calculateDelay = () => {
    const workStart = new Date(loginTime);
    workStart.setHours(8, 30, 0, 0);
    const delayMilliseconds = loginTime - workStart;
    if (delayMilliseconds > 0) {
      const delaySeconds = Math.floor(delayMilliseconds / 1000);
      return formatTime(delaySeconds);
    } else {
      return 'Aucun retard';
    }
  };

  const columns = [
    {
      title: 'Heure de connexion',
      dataIndex: 'loginTime',
      key: 'loginTime',
      render: () => loginTime.toLocaleTimeString(),
    },
    {
      title: 'Temps de service',
      dataIndex: 'serviceTime',
      key: 'serviceTime',
      render: () => formatTime(serviceTime),
    },
    {
      title: 'Temps de pause',
      dataIndex: 'pauseTime',
      key: 'pauseTime',
      render: () => formatTime(pauseTime),
    },
    {
      title: 'Retard',
      dataIndex: 'delayTime',
      key: 'delayTime',
      render: calculateDelay,
    }
    // Ajoutez d'autres colonnes selon vos besoins
  ];

  return (
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Title level={2} style={{ color: 'white' }}>{userName}!</Title>
          <Space>
            <Button style={{ backgroundColor: 'orange', borderColor: 'orange', color: 'white' }}>
              Heure: {loginTime.toLocaleTimeString()}
            </Button>
            <Button style={{ backgroundColor: 'orange', borderColor: 'orange', color: 'white' }}>
              Date: {formatDate(loginTime)}
            </Button>
          </Space>
        </Header>
        <Content style={{ padding: '50px' }}>
          <div style={{ padding: 24, minHeight: 280, textAlign: 'center' }}>
            <Space style={{ marginTop: '20px' }}>
              <Button type="primary" icon={<PauseCircleOutlined />} onClick={handlePauseClick}>
                {isPaused ? 'RESUME' : 'PAUSE'}
              </Button>
              <Button type="default" icon={<LogoutOutlined />} onClick={() => console.log('Log out')}>
                Log Out
              </Button>
            </Space>
            <Table dataSource={[{
              key: '1',
              loginTime,
              serviceTime: formatTime(serviceTime),
              pauseTime: formatTime(pauseTime),
              delayTime: calculateDelay(),
            }]} columns={columns} pagination={false} style={{ marginTop: '20px' }} />
          </div>
        </Content>
      </Layout>
      <Modal title="Confirmer la Pause" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Veuillez entrer le code de confirmation pour pauser :</p>
        <Input value={confirmationCode} onChange={(e) => setConfirmationCode(e.target.value)} />
      </Modal>
    </Layout>
  );
};

export default Dashboard;

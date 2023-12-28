import React, { useState, useEffect } from 'react';
import { Layout, Table, Input, Button, Typography, notification, DatePicker, Space } from 'antd';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;

const ConsulterParJour = () => {
  const [parjours, setParjours] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Remplacez 'your-api-endpoint' par l'URL de votre API
    fetch(`your-api-endpoint?date=${selectedDate.format('YYYY-MM-DD')}`)
      .then(response => response.json())
      .then(data => {
        setParjours(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        notification.error({ message: 'Erreur de chargement des données' });
        setIsLoading(false);
      });
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const columns = [
    { title: 'Nom Employé', dataIndex: 'userName', key: 'userName' },
    { title: 'LogIn_time', dataIndex: 'loginTime', key: 'loginTime' },
    { title: 'Delay_time', dataIndex: 'delayTime', key: 'delayTime' },
    { title: 'Full_time', dataIndex: 'fullTime', key: 'fullTime' },
    { title: 'Break_time', dataIndex: 'breakTime', key: 'breakTime' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ];

  return (
    <Layout>
      <Header>
        <Title level={2}>Consulter Par Jour</Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Space style={{ marginBottom: '20px' }}>
          <RangePicker onChange={handleDateChange} defaultValue={selectedDate} />
          <Button type="primary" icon={<SearchOutlined />}>Rechercher</Button>
        </Space>
        <Table dataSource={parjours} columns={columns} loading={isLoading} />
      </Content>
    </Layout>
  );
};

export default ConsulterParJour;

import React from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import './App.css';

const LoginPage = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
    // Ajoutez ici toute autre logique nécessaire après la soumission du formulaire
  };

  return (
    <div className="animated-background">
      <Card title="Connexion" >
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="login-form-enter"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Veuillez entrer votre email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Veuillez entrer votre mot de passe!' }]}
          >
            <Input.Password placeholder="Mot de passe" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Se souvenir de moi</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Connexion
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;

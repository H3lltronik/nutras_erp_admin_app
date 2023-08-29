// Login.js
import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../../api";
import useAuth from "../../hooks/useAuth";
import { showToast } from "../../lib/notify";
import './styles.css'
import logo from './../../assets/nutras-logo.png';
import products from './../../assets/nutras-login-products.png';

type FormValues = {
  username: string;
  password: string;
};

function Login() {
  const { isAuthenticated, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (isAuthenticated) {
      showToast("Session active...", "success", "✅");
      navigate("/admin");
    }
  }, [isAuthenticated, loading, navigate]);

  const onFinish = async (values: FormValues) => {
    const result = await AuthAPI.login({
      username: values.username,
      password: values.password,
    });

    if (result.access_token) {
      window.location.href = "/admin";
    }

    console.log("result LOGIN", result);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-400 bg-gradient">
      {/* <LoginParticles /> */}

      <div className="z-10 px-8 py-3 bg-white shadow-md rounded-2xl">
        <Form name="login" className="login-form" onFinish={onFinish}>
          <div className="flex justify-center self-stretch">
            <img className="" style={{maxWidth: '100%'}} src={logo} width={300} />
          </div>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Por favor ingresa tu correo electrónico!",
              },
            ]}>
            <Input placeholder="Correo electrónico" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor ingresa tu contraseña!",
              },
            ]}>
            <Input.Password placeholder="Contraseña" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              style={{backgroundColor: '#44b44a'}}>
              Iniciar Sesión
            </Button>
          </Form.Item>
          <div className="flex flex-col items-center self-stretch mb-3">
            <div className="w-10/12 text-center">
              ¿Tienes problemas para acceder? Por favor envía un correo a
            </div>
            <div className="w-10/12 text-center">
              <a className="underline text-blue-500 hover:underline" href="mailto:support@unnamedcomputerclub.com">support@unnamedcomputerclub.com</a>
            </div>
          </div>
          <div className="flex flex-col items-center self-stretch mb-3">
            <div className="w-10/12 text-center">
              <a href="#">
                ¿Deseas cambiar tu contraseña?
              </a>
            </div>
          </div>
          <div className="w-100 text-center">
            <Button type="default" onClick={showModal}>
              Información
            </Button>
          </div>
        </Form>
      </div>
      <div className="flex items-center justify-center self-stretch">
        <img style={{width: 600, maxWidth: '100%'}} src={products} />
      </div>
      <Modal title="Información" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{top: 50}}
      footer={[
        <Button key="submit" type="default" loading={loading} onClick={handleOk}>
          Ok
        </Button>,
      ]}>
        <div className="flex flex-col justify-center items-center">
          <span>
            Developed with {'<3'} by <span className="italic">Unnamed Computer Club</span>®
          </span>
          <span className="flex flex-col justify-center items-center gap-1">
            <a href="mailto:support@unnamedcomputerclub.com">support@unnamedcomputerclub.com</a> <a href="mailto:ventas@unnamedcomputerclub.com">ventas@unnamedcomputerclub.com</a>
          </span>
          <span>
            Tel: +52 33 1785 9804
          </span>
          <span className="font-semibold">Versión del Software: 1.0</span>
        </div>
      </Modal>
    </div>
  );
}

export default Login;

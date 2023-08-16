// Login.js
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../../api";
import useAuth from "../../hooks/useAuth";
import { showToast } from "../../lib/notify";

type FormValues = {
  username: string;
  password: string;
};

function Login() {
  const { isAuthenticated, loading } = useAuth();
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="z-10 p-8 bg-white shadow-md rounded">
        <h2 className="text-2xl mb-4">Login</h2>
        <Form name="login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}>
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-green-600">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;

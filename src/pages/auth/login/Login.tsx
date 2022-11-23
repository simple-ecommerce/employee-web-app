import { Button, Form, Input, Space } from "antd";
import { useLoginMutation } from "../../../services/api/authentication/mutations/token/useLoginMutation";
import { setCookie } from "nookies";
import * as S from "./Login.style";
import { AuthStore } from "../../../services/stores/auth/AuthStore";

export const Login = () => {
  const [form] = Form.useForm();
  const loginMutation = useLoginMutation({
    options: {
      onSuccess: ({ accessToken, refreshToken }) => {
        setCookie(undefined, "ecommerce.token", accessToken, {
          path: "/",
        });
        setCookie(undefined, "ecommerce.refresh_token", refreshToken, {
          path: "/",
        });
        AuthStore.set.isAuthenticated(true);
      },
    },
  });

  return (
    <S.Wrapper>
      <S.Container>
        <Space direction="vertical" size={"middle"}>
          <Form form={form} layout="vertical" onFinish={loginMutation.mutate}>
            <Form.Item
              rules={[{ required: true, whitespace: false }]}
              name="companyId"
              label="Company Id"
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, whitespace: false }]}
              name="email"
              label="Email"
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, whitespace: false }]}
              name="password"
              label="Password"
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button block htmlType="submit" type="primary">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </S.Container>
    </S.Wrapper>
  );
};

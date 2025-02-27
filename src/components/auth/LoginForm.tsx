import { FC } from "react";
import { Form, Button, Checkbox, FormProps, Input, message } from "antd";
import {
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { login } from "../../redux/actions/auth";
import { useAppDispatch } from "../../hooks/useTypedSelectors";

type FieldType = {
  email: string;
  password: string;
  remember?: boolean;
};

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();

  const onFinish: FormProps<FieldType>["onFinish"] = ({
    email,
    password,
    remember,
  }) => {
    if (remember) {
      dispatch(login(email, password));
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    message.error(`Failed: ${JSON.stringify(errorInfo)}`);
  };

  return (
    <Form
      name="login-form"
      style={{ maxWidth: 440 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="w-full"
    >
      <Form.Item<FieldType>
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input
          size="large"
          placeholder="Email"
          prefix={<UserOutlined className="text-gray" />}
          className="p-3 hover:border-primary focus-within:border-primary"
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          placeholder="Password"
          prefix={<LockOutlined className="text-gray" />}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          className="p-3 hover:border-primary focus-within:border-primary"
        />
      </Form.Item>

      <Form.Item<FieldType> name="remember" valuePropName="checked">
        <Checkbox>
          <p className="text-xs text-gray font-normal">Remember me</p>
        </Checkbox>
      </Form.Item>

      <Button
        htmlType="submit"
        className="bg-primary p-2 h-auto rounded-lg text-white text-base font-semibold w-full"
      >
        Log In
      </Button>
    </Form>
  );
};

export default LoginForm;

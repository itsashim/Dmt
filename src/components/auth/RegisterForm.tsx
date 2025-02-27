import { FC, useState } from "react";
import {
  Form,
  Button,
  Checkbox,
  FormProps,
  Input,
  Divider,
  message,
} from "antd";
import {
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import zxcvbn from "zxcvbn";
// import { Logo } from "../../assets";
import type { CheckboxProps } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { MdMailOutline } from "react-icons/md";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/actions/auth";

type FieldType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  remember?: string;
};

// const socialLinks = [
//   {
//     name: "facebook",
//     href: "https://",
//     icon: Logo.facebook_color,
//   },
//   {
//     name: "google",
//     href: "https://",
//     icon: Logo.google,
//   },
//   {
//     name: "instagram",
//     href: "https://",
//     icon: Logo.instagram_color,
//   },
//   {
//     name: "twitter",
//     href: "https://",
//     icon: Logo.twitter_color,
//   },
//   {
//     name: "whatsapp",
//     href: "https://",
//     icon: Logo.whatsapp_color,
//   },
//   {
//     name: "mail",
//     href: "https://",
//     icon: Logo.mail_color,
//   },
// ];

const RegisterForm: FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [remember, setRemember] = useState<boolean>(false);
  const [passwordScore, setPasswordScore] = useState<number>(0);

  const checkStrength = (value: string) => {
    if (!value) return setPasswordScore(0);
    setPasswordScore(zxcvbn(value).score + 1);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (!remember && passwordScore !== 0) return;
    dispatch(signup(values));

    navigate(`/auth/login`);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    message.error(`Failed: ${errorInfo}`);
  };

  const onChange: CheckboxProps["onChange"] = (e) =>
    setRemember(e.target.checked);

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      className={`w-full`}
      style={{ maxWidth: 440 }}
      onFinishFailed={onFinishFailed}
      initialValues={{ remember: true }}
    >
      <Form.Item<FieldType>
        name="firstName"
        rules={[{ required: true, message: "Please input your First Name!" }]}
      >
        <Input
          size="large"
          id="firstName"
          name="firstName"
          value={`Diwash`}
          placeholder="First Name"
          prefix={<UserOutlined className={`text-gray`} />}
          className={`p-3 hover:border-primary focus-within:border-primary`}
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="lastName"
        rules={[{ required: true, message: "Please input your Last Name!" }]}
      >
        <Input
          size="large"
          id="lastName"
          value={`Tiwari`}
          name="lastName"
          placeholder="Last Name"
          prefix={<UserOutlined className={`text-gray`} />}
          className={`p-3 hover:border-primary focus-within:border-primary`}
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="email"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          size="large"
          id="email"
          name="email"
          placeholder="Your Email"
          value={`tdiwash12@gmail.com`}
          prefix={<MdMailOutline className={`text-gray`} />}
          className={`p-3 hover:border-primary focus-within:border-primary`}
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          id="password"
          name="password"
          placeholder="Password"
          value={`meroP@ssword`}
          onChange={(e) => checkStrength(e.target.value)}
          prefix={<LockOutlined className={`text-gray`} />}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          className={`p-3 hover:border-primary focus-within:border-primary`}
        />
      </Form.Item>

      <div className="flex flex-col w-full -mx-1 mt-4 mb-10">
        <span className={`text-sm mb-3 font-medium text-dark-blue`}>
          Password Strength
        </span>
        <div className={`flex items-center justify-between`}>
          {[...Array(5)].map((_, i) => (
            <div className="w-1/5 px-1" key={i}>
              <div
                className={`h-2 rounded-xl bg-slate-300 transition-colors ${
                  i < passwordScore
                    ? passwordScore <= 2
                      ? "!bg-red-400"
                      : passwordScore <= 4
                      ? "!bg-yellow-400"
                      : "!bg-primary"
                    : "bg-gray-200"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <Form.Item<FieldType>>
        <Checkbox onChange={onChange}>
          <p className={`text-xs text-gray font-normal`}>
            {`By creating an account, you agree to our `}
            <NavLink to={``} className={`text-primary font-bold`}>
              Term and Conditions
            </NavLink>
          </p>
        </Checkbox>
      </Form.Item>

      <Button
        htmlType="submit"
        className={`bg-primary p-2 h-auto rounded-lg text-white text-base font-semibold w-full`}
      >
        Register
      </Button>

      <div className={`flex gap-1 justify-center items-center mt-3 mb-6`}>
        <span className={`text-sm font-medium text-gray`}>
          Have an account?
        </span>
        <NavLink
          to={`/auth/login`}
          className={`text-sm font-semibold text-primary`}
        >
          Sign In
        </NavLink>
      </div>
      <Divider className={`h-0.5 w-full bg-fade-white`}>
        <h4 className={`text-base text-light-gray font-bold bg-white px-2`}>
          Connect with
        </h4>
      </Divider>
      {/* <ul className={`flex gap-4 items-center justify-center mt-6`}>
        {socialLinks.map(({ icon, name, href }, i) => (
          <li key={i}>
            <a href={href}>
              <img src={icon} alt={`${name} logo`} className={`w-6`} />
            </a>
          </li>
        ))}
      </ul> */}
    </Form>
  );
};

export default RegisterForm;

import { Button, Form, Input } from "antd";
import React from "react";
import { EditableTable1 } from "../components/EditableTable1";
import { EditableTable2 } from "../components/EditableTable2";

export interface IAdmin {
  name: string;
  phone: string;
  job: string;
}

interface IForm {
  address: string;
  admins1: IAdmin[];
  admins2: IAdmin[];
}

const Page1: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={
        {
          address: "",
          admins1: [{ name: "aaa", phone: "151", job: "work" }],
          admins2: [{ name: "bbb", phone: "158", job: "job" }],
        } as IForm
      }
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={console.log}
    >
      <Form.Item
        label="地址"
        name="address"
        rules={[{ required: true, message: "地址!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="联系人1"
        name="admins1"
        rules={[{ required: true, message: "联系人!" }]}
      >
        <EditableTable1></EditableTable1>
      </Form.Item>

      <Form.Item
        label="联系人2"
        name="admins2"
        rules={[{ required: true, message: "联系人!" }]}
      >
        <EditableTable2></EditableTable2>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Page1;

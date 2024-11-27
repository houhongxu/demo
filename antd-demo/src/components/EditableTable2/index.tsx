import { Form, Input, Table, TableColumnsType } from "antd";
import { IAdmin } from "../../pages/page1";

export const EditableTable2 = ({
  value,
  onChange,
}: {
  value?: any;
  onChange?: any;
}) => {
  const getColumns: () => TableColumnsType<IAdmin[]> = () => [
    {
      title: "姓名",
      dataIndex: "name",
      render: (v, r, index) => {
        console.log(v, r, index);

        return (
          <Form.Item
            name={["admins2", index, "name"]}
            rules={[{ required: true, message: "Please input name" }]}
          >
            <Input />
          </Form.Item>
        );
      },
    },
    {
      title: "手机号",
      dataIndex: "phone",
      render: (v, r, index) => (
        <Form.Item
          name={["admins2", index, "phone"]}
          rules={[{ required: true, message: "Please input phone" }]}
        >
          <Input />
        </Form.Item>
      ),
    },
    {
      title: "工作",
      dataIndex: "job",
      render: (v, r, index) => (
        <Form.Item
          name={["admins2", index, "job"]}
          rules={[{ required: true, message: "Please input job" }]}
        >
          <Input />
        </Form.Item>
      ),
    },
  ];

  return (
    <Table
      columns={getColumns()}
      dataSource={value}
      onChange={onChange}
      pagination={false}
      rowKey="phone"
    />
  );
};

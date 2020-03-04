import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const MainHead: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: Object) => {
    console.log('Success:', values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Form
        {...layout}
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item label="规格/型号" name="model">
          <Input placeholder="请输入规格/型号" />
        </Form.Item>

        <Form.Item label="是否有效" name="isValid">
          <Select>
            <Select.Option value="valid">有效</Select.Option>
            <Select.Option value="notValid">无效</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MainHead;

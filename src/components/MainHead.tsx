import React, { useContext } from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import context from '@/context';
import Axios from 'axios';

export const MainHead: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: { [k: string]: any }) => {
    Axios.post('/api/items/getByConditions', values).then(r => {
      console.log(r.data);
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Row>
          <Col span={12} style={{ padding: '2em 0 0 2em' }}>
            <Form.Item label="规格/型号" name="model">
              <Input placeholder="请输入规格/型号" style={{ width: 300 }} />
            </Form.Item>
          </Col>
          <Col span={12} style={{ paddingTop: '2em' }}>
            <Form.Item label="是否有效" name="isValid">
              <Select style={{ width: 300 }} placeholder="请选择是否有效">
                <Select.Option value="1">有效</Select.Option>
                <Select.Option value="0">无效</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button htmlType="button" onClick={onReset}>
                重置
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default MainHead;

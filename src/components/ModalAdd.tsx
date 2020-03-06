import React, { useContext } from 'react';
import { Modal, Form, Input, Radio, Select, Row, Col } from 'antd';
import Axios from 'axios';
import context from '@/context';

const { TextArea } = Input;

const { Option } = Select;

interface Props {
  visible: boolean;
  setVidsible: Function;
  callback: Function;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

export const ModalAdd: React.FC<Props> = props => {
  const { visible, setVidsible, callback } = props;
  const { state, setState } = useContext(context);

  const [form] = Form.useForm();

  const resetFormData = () => form.resetFields();

  const handleOk = () => {
    form.validateFields().then(() => {
      const formData = form.getFieldsValue();
      const formData2 = {
        ...formData,
        createdTime: Date.now(),
      };
      Axios.post('/api/items/add', { data: formData2 }).then(() => {
        setVidsible(false);
        resetFormData();
        callback();
      });
    });
  };

  const handleCancel = () => {
    setVidsible(false);
    resetFormData();
  };

  return (
    <Modal
      title="新增物资"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width="70%"
    >
      <Form {...layout} form={form}>
        <Row>
          <Col span={12}>
            <Form.Item
              label="物资品名"
              name="name"
              rules={[{ required: true, message: '请输入物资品名!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="计量单位" name="unit">
              <Input />
            </Form.Item>

            <Form.Item
              label="是否有效"
              name="isValid"
              rules={[{ required: true, message: '请输入是否有效!' }]}
            >
              <Radio.Group>
                <Radio value={false}>否</Radio>
                <Radio value={true}>是</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="排序"
              name="sort"
              rules={[{ required: true, message: '请输入排序!' }]}
            >
              <Input placeholder="请输入排序" />
            </Form.Item>

            <Form.Item label="体积" name="volume">
              <Input placeholder="请输入体积" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="物资类别" name="type">
              <Select>
                {state.types.map((item: any) => {
                  return (
                    <Option key={item.key} value={item.key}>
                      {item.title}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="规格/型号"
              name="model"
              rules={[{ required: true, message: '请输入规格/型号!' }]}
            >
              <Input placeholder="请输入规格/型号" />
            </Form.Item>

            <Form.Item
              label="储备类型"
              name="type2"
              rules={[{ required: true, message: '请输入储备类型!' }]}
            >
              <Select placeholder="请输入储备类型">
                <Option value="xxx">xxx</Option>
                <Option value="yyy">yyy</Option>
              </Select>
            </Form.Item>

            <Form.Item label="重量" name="weight">
              <Input placeholder="请输入重量" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="物资用途" name="usage" {...tailLayout}>
          <TextArea placeholder="请输入物资用途" style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAdd;

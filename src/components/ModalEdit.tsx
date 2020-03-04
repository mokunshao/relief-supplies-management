import React from 'react';

import { Modal, Form, Input, Radio, Select } from 'antd';

const { TextArea } = Input;

const { Option } = Select;

interface Props {
  visible: boolean;
  setVidsible: Function;
}

export const ModalEdit: React.FC<Props> = props => {
  const { visible, setVidsible } = props;

  const handleOk = () => {
    setVidsible(false);
    console.log('ok');
  };

  const handleCancel = () => {
    setVidsible(false);
    console.log('cancel');
  };

  const onFinish = () => console.log(121);

  const onFinishFailed = () => console.log(121);

  return (
    <Modal
      title="编辑物资"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          label="物资品名"
          name="name"
          rules={[{ required: true, message: '请输入物资品名!' }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item label="计量单位" name="unit">
          <Input disabled />
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

        <Form.Item label="物资类别" name="category">
          <Input disabled />
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
          name="reserve type"
          rules={[{ required: true, message: '请输入储备类型!' }]}
        >
          <Select placeholder="请输入储备类型">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>

        <Form.Item label="重量" name="weight">
          <Input placeholder="请输入重量" />
        </Form.Item>

        <Form.Item label="物资用途" name="usage">
          <TextArea placeholder="请输入物资用途" />
        </Form.Item>

        <Form.Item label="创建时间" name="createdTime">
          <Input disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEdit;

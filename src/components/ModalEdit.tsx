import React, { useContext, useEffect, useState } from 'react';
import context from '@/context';
import { Modal, Form, Input, Radio, Select, Row, Col } from 'antd';
import { deepClone } from '@/utils';

const { TextArea } = Input;

const { Option } = Select;

interface Props {
  visible: boolean;
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

export const ModalEdit: React.FC<Props> = props => {
  const { visible, callback } = props;
  if (!visible) return null;
  const { state, setState } = useContext(context);

  const setVidsible = (val: boolean) => {
    setState((state: any) => ({ ...state, isShowModalEdit: val }));
  };

  const handleOk = () => {
    const formData = form.getFieldsValue();
    console.log(formData);
    callback();
    setVidsible(false);
  };

  const handleCancel = () => {
    setVidsible(false);
  };

  const [form] = Form.useForm();

  const item = deepClone(state.currentEditing);

  return (
    <Modal
      title="编辑物资"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width="70%"
    >
      <Form initialValues={item} {...layout} form={form}>
        <Row>
          <Col span={12}>
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
          </Col>
          <Col span={12}>
            <Form.Item label="物资类别" name="type">
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
          <TextArea placeholder="请输入物资用途" />
        </Form.Item>
        <Form.Item
          label="创建时间"
          name="createdTime"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 8 }}
        >
          <Input disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEdit;

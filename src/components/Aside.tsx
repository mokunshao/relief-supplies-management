import React, { useContext, useEffect, useState } from 'react';
import { Input, Tree } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import context from '@/context';
import axios from 'axios';
import Axios from 'axios';
import { Button, Modal, Form } from 'antd';

const { Search } = Input;

export const Aside: React.FC = () => {
  const [treeData, setTreeData] = useState([]);
  const { state, setState } = useContext(context);
  const getTypes = () => {
    axios('/api/types').then(r => {
      const { data } = r;
      const children = data.types;
      const data2: any = [
        {
          title: '',
          key: '0',
          children,
        },
      ];
      data2[0].icon = <HomeOutlined />;
      setTreeData(data2);
    });
  };
  useEffect(() => {
    getTypes();
  }, []);

  const handleEdit = (item: Object) => {
    setState((state: any) => ({
      ...state,
      currentEditing: item,
      isShowModalEdit: true,
    }));
  };

  const onSelect = (selectedKeys: any) => {
    setState((state: any) => ({ ...state, treeSeleted: selectedKeys }));
    const key = selectedKeys[0];
    if (key === '0') {
      Axios.get('/api/items').then(r => {
        const items = r.data.items;
        items.forEach((item: any, i: number) => {
          item.index = i + 1;
          item.operation = (
            <Button type="primary" onClick={() => handleEdit(item)}>
              编辑
            </Button>
          );
        });
        setState((state: any) => ({
          ...state,
          formData: items,
        }));
      });
    } else {
      Axios.post('/api/items/getByType', { key }).then(r => {
        const items = r.data.items;
        items.forEach((item: any, i: number) => {
          item.index = i + 1;
          item.operation = (
            <Button type="primary" onClick={() => handleEdit(item)}>
              编辑
            </Button>
          );
        });
        setState((state: any) => ({
          ...state,
          formData: items,
        }));
      });
    }
  };
  const [visible, setVisible] = useState(false);

  const resetFormData = () => form.resetFields();

  const handleOk = () => {
    form.validateFields().then(() => {
      const formData = form.getFieldsValue();
      Axios.post('/api/types/add', { title: formData.typeTitle }).then(r => {
        setVisible(false);
        resetFormData();
        getTypes();
      });
    });
  };

  const handleCancel = () => {
    setVisible(false);
    resetFormData();
  };

  const [form] = Form.useForm();

  return (
    <div>
      <Search onSearch={value => console.log(value)} />
      <Tree
        selectedKeys={state.treeSeleted}
        treeData={treeData}
        showLine
        showIcon
        defaultExpandedKeys={['0']}
        onSelect={onSelect}
      />
      <Button onClick={() => setVisible(true)}>自定义物资类别</Button>
      <Modal
        title="自定义物资类别"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            label="物资类别"
            name="typeTitle"
            rules={[{ required: true, message: '请输入新的物资类别！' }]}
          >
            <Input placeholder="请输入新的物资类别" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Aside;

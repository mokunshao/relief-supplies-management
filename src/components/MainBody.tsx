import React, { useState, useContext, useEffect } from 'react';
import { Button, Alert, Table, Modal } from 'antd';
import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import context from '@/context';
import Axios from 'axios';

const { confirm } = Modal;

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
  },
  {
    title: '物资品名',
    dataIndex: 'name',
  },
  {
    title: '规格/型号',
    dataIndex: 'model',
  },
  {
    title: '储备类型',
    dataIndex: 'type',
  },
  {
    title: '是否有效',
    dataIndex: 'isValid',
  },
  {
    title: '排序',
    dataIndex: 'sort',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];

export const MainBody: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const onSelectChange = (selectedRowKeys: Array<any>) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const selectedLength = selectedRowKeys.length;

  const hasSelected = selectedLength > 0;

  const alertMessage = (
    <div>
      <span>
        已选择 <a>{selectedLength}</a> 项
      </span>
      <span dangerouslySetInnerHTML={{ __html: '&nbsp;'.repeat(9) }}></span>
      <a onClick={() => setSelectedRowKeys([])}>清空</a>
    </div>
  );

  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);

  const showConfirm = () => {
    if (!selectedLength) return;
    confirm({
      title: '你想删除这些记录吗？',
      icon: <ExclamationCircleOutlined />,
      content: selectedLength + ' 条记录将会被删除！',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  };

  const { state, setState } = useContext(context);

  const [data, setData] = useState([]);

  const handleEdit = (item: Object) => {
    setIsShowModalEdit(true);
    const newState = JSON.parse(
      JSON.stringify({ ...state, currentEditing: item }),
    );
    setState(newState);
  };

  useEffect(() => {
    setLoading(true);
    Axios.get('/api/items').then(res => {
      const { data } = res;
      const { items } = data;
      items.forEach((item: any, i: number) => {
        item.index = i;
        item.operation = (
          <Button type="primary" onClick={() => handleEdit(item)}>
            编辑
          </Button>
        );
      });
      setData(items);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div></div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setIsShowModalAdd(true)}>
          新增
        </Button>
        <Button danger onClick={showConfirm}>
          删除
        </Button>
      </div>

      <div style={{ marginBottom: 16 }}>
        {hasSelected && <Alert message={alertMessage} type="info" showIcon />}
      </div>
      <Table
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
      <ModalAdd visible={isShowModalAdd} setVidsible={setIsShowModalAdd} />
      <ModalEdit visible={isShowModalEdit} setVidsible={setIsShowModalEdit} />
    </div>
  );
};

export default MainBody;

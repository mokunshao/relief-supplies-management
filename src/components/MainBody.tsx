import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Button, Alert, Table, Modal } from 'antd';
import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import context from '@/context';
import Axios from 'axios';
import { deepClone } from '@/utils';

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
    render: (value: any) => <span>{value ? '是' : '否'}</span>,
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
  const onSelectChange = (selectedRowKeys: Array<any>) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const selectedLength = useMemo(() => selectedRowKeys.length, [
    selectedRowKeys.length,
  ]);

  const hasSelected = useMemo(() => {
    return selectedLength > 0;
  }, [selectedRowKeys.length]);

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
        Axios.post('/api/items/remove', { data: selectedRowKeys }).then(r => {
          getFormData();
          setSelectedRowKeys([]);
        });
      },
    });
  };

  const { state, setState } = useContext(context);

  const [data, setData] = useState([]);

  const handleEdit = (item: Object) => {
    setIsShowModalEdit(true);
    const newState = deepClone({ ...state, currentEditing: item });
    setState(newState);
  };

  const getFormData = function() {
    setState({ ...state, formLoading: true });
    Axios.get('/api/items').then(res => {
      const { data } = res;
      const { items } = data;
      items.forEach((item: any, i: number) => {
        item.index = i + 1;
        item.operation = (
          <Button type="primary" onClick={() => handleEdit(item)}>
            编辑
          </Button>
        );
      });
      setData(items);
      setState({ ...state, formLoading: false });
    });
  };

  useEffect(() => {
    getFormData();
  }, []);

  return (
    <div>
      <div></div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setIsShowModalAdd(true)}>
          新增
        </Button>
        <Button disabled={selectedLength === 0} danger onClick={showConfirm}>
          删除
        </Button>
      </div>

      <div style={{ marginBottom: 16 }}>
        {hasSelected && <Alert message={alertMessage} type="info" showIcon />}
      </div>
      <Table
        loading={state.formLoading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
      <ModalAdd
        visible={isShowModalAdd}
        setVidsible={setIsShowModalAdd}
        callback={getFormData}
      />
      <ModalEdit
        visible={isShowModalEdit}
        setVidsible={setIsShowModalEdit}
        callback={getFormData}
      />
    </div>
  );
};

export default MainBody;

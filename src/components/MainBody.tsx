import React, { useState, useContext } from 'react';
import { Button, Alert, Table, Modal } from 'antd';
import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import context from '@/context';

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

const data: Array<any> = [];

for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    index: i + 1,
    name: `救援物资 ${i + 1}`,
    model: 32,
    type: '不知道',
    isValid: '是',
    sort: 10,
    operation: <Button type="primary">编辑</Button>,
  });
}

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

  return (
    <div>
      <div>
        {JSON.stringify(state)}
        <button onClick={() => setState({ ...state, name: state.name += 1 })}>
          ok
        </button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setIsShowModalAdd(true)}>
          新增
        </Button>
        <Button type="primary" onClick={() => setIsShowModalEdit(true)}>
          编辑
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

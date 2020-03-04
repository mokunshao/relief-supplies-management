import React, { useState } from 'react';
import { Button, Alert, Table } from 'antd';

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

  const hasSelected = selectedRowKeys.length > 0;

  const alertMessage = (
    <div>
      <span>
        已选择 <a>{selectedRowKeys.length}</a> 项
      </span>
      <span dangerouslySetInnerHTML={{ __html: '&nbsp;'.repeat(9) }}></span>
      <a onClick={() => setSelectedRowKeys([])}>清空</a>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary">新增</Button>
        <Button danger>删除</Button>
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
    </div>
  );
};

export default MainBody;

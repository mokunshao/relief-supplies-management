import React, { useContext, useEffect, useState } from 'react';
import { Input, Tree } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import context from '@/context';
import axios from 'axios';

const { Search } = Input;

export const Aside: React.FC = () => {
  const [treeData, setTreeData] = useState([]);
  const { state, setState } = useContext(context);
  useEffect(() => {
    axios('/api/types').then(r => {
      const { data } = r;
      const children = data.types;
      const data2: any = [
        {
          title: '',
          key: '0-0',
          children,
        },
      ];
      data2[0].icon = <HomeOutlined />;
      setTreeData(data2);
    });
  }, []);
  return (
    <div>
      {JSON.stringify(state)}
      <Search onSearch={value => console.log(value)} />
      <Tree
        treeData={treeData}
        showLine
        showIcon
        defaultExpandedKeys={['0-0-0']}
        // onSelect={onSelect}
      />
    </div>
  );
};

export default Aside;

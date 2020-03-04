import React from 'react';
import { Input, Tree } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Search } = Input;

export const Aside: React.FC = () => {
  const treeData = [
    {
      title: '',
      key: '0-0',
      icon: <HomeOutlined />,
      children: [
        {
          title: '救灾物资',
          key: '0-0-0',
          children: [
            { title: '居住类', key: '0-0-0-0' },
            { title: '床上用品类', key: '0-0-0-1' },
            { title: '衣着类', key: '0-0-0-2' },
            { title: '救灾设备类', key: '0-0-0-3' },
            { title: '基本生活类', key: '0-0-0-4' },
            { title: '其他', key: '0-0-0-5' },
          ],
        },
        {
          title: '森林防火设备',
          key: '0-0-1',
          children: [{ title: '不知道', key: '0-0-1-0' }],
        },
      ],
    },
  ];

  return (
    <div>
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

import React from 'react';
import './index.less';
import Aside from '@/components/Aside';
import Main from '@/components/Main';

export default () => {
  return (
    <div className="index">
      <div className="index-aside">
        <Aside></Aside>
      </div>
      <div className="index-main">
        <Main></Main>
      </div>
    </div>
  );
};

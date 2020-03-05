import React, { useState } from 'react';
import './index.less';
import Aside from '@/components/Aside';
import Main from '@/components/Main';
import context from '@/context';
import defaultState from '@/state';

export default () => {
  const [state, setState] = useState(defaultState);
  return (
    <context.Provider value={{ state, setState }}>
      <div className="index">
        <div className="index-aside">
          <Aside></Aside>
        </div>
        <div className="index-main">
          <Main></Main>
        </div>
      </div>
    </context.Provider>
  );
};

import React, { useState } from 'react';
import { TabBar } from 'zarm';
// import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import styles from './index.less';
import CustomIcon from '../CustomIcon';
export default function NavBar(props) {
  const { showNav } = props;
  let history = useHistory();
  const [activeKey, setActiveKey] = useState('/');
  const changeTab = (path) => {
    history.push(path);
    setActiveKey(path);
  };

  return (
    <div>
      <TabBar
        visible={showNav}
        className={styles.tab}
        activeKey={activeKey}
        onChange={changeTab}
      >
        <TabBar.Item
          itemKey="/home"
          title="账单"
          icon={<CustomIcon type="zhangdan" />}
        />
        <TabBar.Item
          itemKey="/data"
          title="统计"
          icon={<CustomIcon type="tongji" />}
        />
        <TabBar.Item
          itemKey="/user"
          title="我的"
          icon={<CustomIcon type="wode" />}
        />
      </TabBar>
    </div>
  );
}

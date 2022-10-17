import React from 'react'
import { NavBar, Icon, Button, Input, FilePicker, Toast } from 'zarm';
import { useHistory } from 'react-router-dom';
import s from './style.module.less';
export default function Aboutus() {
    const history = useHistory();
  return (
    <div>
        <NavBar
        className={s.bar}
        left={
          <Icon
            type="arrow-left"
            theme="primary"
            onClick={() => history.goBack()}
          />
        }
        title={'关于我们'}
      />

      <div className={s.wrap}>
        <span>记账本</span>
        <img
              style={{ width: 20, verticalAlign: '-7px' }}
              src="//s.yezgea02.com/1615975178434/lianxi.png"
              alt=""
            />
            
        <span>version 1.0.1</span>
        <p> 记账本应用 通过类型和时间分类账单，提供查看账单详情，查看月不同类型消费占比数据等能力
        </p>
       
      </div>
    </div>
  )
}

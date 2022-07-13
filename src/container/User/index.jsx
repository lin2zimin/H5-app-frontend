import React from 'react';
import s from './style.module.less';
import { Cell, Button } from 'zarm';
import {useHistory} from 'react-router-dom'
export default function User() {
  const history = useHistory();
  return (
    <div className={s.wrap}>
      <div className={s.header}>
        <div className={s.name}>
          <span>昵称： </span>
          <span>
            <img
              style={{ width: 30, height: 30, verticalAlign: '-10px' }}
              src="//s.yezgea02.com/1615973630132/geqian.png"
              alt=""
            />
            <b> 暂无个签</b>
          </span>
        </div>
        <div className={s.avatar}> photo</div>
      </div>

      <div className={s.card}>
        <Cell
          hasArrow
          title="用户信息修改"
          onClick={() => history.push('/userInfo')}
          style={{ borderRadius: '10px' }}
          icon={
            <img
              style={{ width: 20, verticalAlign: '-7px' }}
              src="//s.yezgea02.com/1615974766264/gxqm.png"
              alt=""
            />
          }
        />
        <Cell
          hasArrow
          title="重制密码"
          onClick={() => history.push('/account')}
          icon={
            <img
              style={{ width: 20, verticalAlign: '-7px' }}
              src="//s.yezgea02.com/1615974766264/zhaq.png"
              alt=""
            />
          }
        />
        <Cell
          hasArrow
          title="关于我们"
          onClick={() => history.push('/about')}
          style={{ borderRadius: '10px' }}
          icon={
            <img
              style={{ width: 20, verticalAlign: '-7px' }}
              src="//s.yezgea02.com/1615975178434/lianxi.png"
              alt=""
            />
          }
        />
      </div>

      <div className={s.btn}>
        <Button block={true} theme="danger">
          danger
        </Button>
      </div>
    </div>
  );
}

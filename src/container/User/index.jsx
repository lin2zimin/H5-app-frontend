import React, { useState, useLayoutEffect, useEffect } from 'react';
import s from './style.module.less';
import { Cell, Button } from 'zarm';
import { useHistory } from 'react-router-dom';
import { getInfo } from '../../server/user';
export default function User() {
  const history = useHistory();
  const [img, setImg] = useState('');
  const [sign, setSign] = useState('暂无个签');
  const [ncName, setNcName] = useState('')
  useEffect(async () => {
    // getInfo().then((res) => {
    //   setName(res.userName);
    //   setImg(res.avatar);
    //   setSign(res.signature);
    // });
    const res = await getInfo();
    
    console.log('res', res);
    setImg(res.avatar);
    setSign(res.signature);
    setNcName(res.nickName)
  }, []);
  console.log(img);
  return (
    <div className={s.wrap}>
      <div className={s.header}>
        <div className={s.name}>
          <span>昵称：{ncName || ''} </span>
          <span>
            <img
              style={{ width: 30, height: 30, verticalAlign: '-10px' }}
              src="//s.yezgea02.com/1615973630132/geqian.png"
              alt=""
            />
            <b> {sign || '暂无个签'}</b>
          </span>
        </div>
        <div className={s.avatar}>
          <img className={s.img} src={img} alt="" />
        </div>
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
          退出登录
        </Button>
      </div>
    </div>
  );
}

import React from 'react';
import { NavBar, Icon, Button } from 'zarm';
import s from './style.module.less';
import { useHistory } from 'react-router-dom';
export default function index() {
  const history = useHistory();
  return (
    <div className={s.wrap}>
      <NavBar
        className={s.bar}
        left={
          <Icon
            type="arrow-left"
            theme="primary"
            onClick={() => history.goBack()}
          />
        }
        title={'用户信息'}
      />
      <div className={s.content}>
        <div className={s.title}>个人资料</div>
        <div style={{ fontSize: '20px', marginTop: '14px' }}>头像</div>
        <div className={s.avatar}>
          <span className={s.img}>fdsafasd</span>
          <div className={s.detail}>
            <span>description</span>
            <span>
              <Button theme="primary" size="sm">
                点击上传
              </Button>{' '}
            </span>
          </div>
        </div>

        <div className={s.sign}>
          <span>个性签名</span>
          <span>i will make an offer he cannot refuse</span>
        </div>
      </div>
    </div>
  );
}

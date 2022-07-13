import React, { useCallback, useRef, useState } from 'react';
import { Tabs, Cell, Input, Button, Checkbox, Toast } from 'zarm';
import CustomIcon from '@/components/CustomIcon';
import styles from './style.module.less';
import Captcha from 'react-captcha-code';
import axios from '@/utils/axios';
import cx from 'classnames';
import { login, register } from '@/server/login';
import { useHistory } from "react-router-dom";
export default function Login() {
  const captchaRef = useRef();
  const [type, setType] = useState('login');
  const [userName, setUserName] = useState();
  const [pwd, setPwd] = useState();
  const [captcha, setCaptcha] = useState('');
  const [capInput, setCapInput] = useState('');
  // const handleCaptcha = useCallback((value) => setCaptcha(value), []);
  const history = useHistory();
  async function onSubmit() {
    if (!userName) {
      Toast.show('请输入账号');
      return;
    }
    if (!pwd) {
      Toast.show('请输入密码');
      return;
    }
    if (type === 'register') {
      if (!capInput) {
        Toast.show('请输入验证码');
        return;
      }
      if (capInput !== captcha) {
        Toast.show('验证码有误');
        return;
      }
      const res = await register(userName, pwd);
      console.log(res);
    } else {
      const res = await login(userName, pwd);
      localStorage.setItem('token', res.token);
      console.log('111111111',localStorage.getItem('token'));
      if(localStorage.getItem('token')) history.push('/home')
      
    }
  }
  return (
    <div className={styles.auth}>
      <div className={styles.head} />
      <div className={styles.tab}>
        <span
          className={cx({ [styles.active]: type === 'register' })}
          onClick={() => setType('register')}
        >
          注册
        </span>
        <span
          className={cx({ [styles.active]: type === 'login' })}
          onClick={() => setType('login')}
        >
          登录
        </span>
      </div>
      <div className={styles.form}>
        <Cell icon={<CustomIcon type="zhanghao" />}>
          <Input
            clearable
            type="text"
            placeholder="请输入账号"
            onChange={(value) => setUserName(value)}
          />
        </Cell>
        <Cell icon={<CustomIcon type="mima" />}>
          <Input
            clearable
            type="password"
            placeholder="请输入密码"
            onChange={(value) => setPwd(value)}
            style={{ border: 'none' }}
          />
        </Cell>
        {type == 'register' ? (
          <Cell icon={<CustomIcon type="mima" />}>
            <Input
              clearable
              type="text"
              placeholder="请输入验证码"
              onChange={setCapInput}
            />
            <Captcha charNum={4} ref={captchaRef} onChange={setCaptcha} />
          </Cell>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.submit}>
        <div className={styles.agree}>
          {type == 'register' ? (
            <>
              <Checkbox />
              <label className="text-light">
                阅读并同意<a>《掘掘手札条款》</a>
              </label>
            </>
          ) : (
            <></>
          )}
        </div>

        <Button onClick={onSubmit} theme="primary" block>
          {type === 'register' ? '注册' : '登录'}
        </Button>
      </div>
    </div>
  );
}


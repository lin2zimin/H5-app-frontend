import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { Popup, Cell, Icon, Keyboard, Input, Toast } from 'zarm';
import s from './style.module.less';
import cx from 'classnames';
import { addBill } from '../../server/bill';
import DatePopup from '../DatePopup';
import CustomIcon from '../CustomIcon';
import dayjs from 'dayjs';

import { expenseTypes, IncomeTypes, typeMap } from '../../utils';
const addPopup = forwardRef((props, ref) => {
  const { refreshHandler, mode, data ,submit,setData} = props;
  const [payType, setPayType] = useState('1');
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState(0);
  const [input, setInput] = useState('');
  const [date, setDate] = useState(dayjs().format('YYYY-MM'));
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(false); // 备注输入框
  const dateRef = useRef();
 
  useEffect(() => {
    setInit(mode);
  }, [data]);

  ref.current = {
    show: () => setVisible(true),
  };
  const toggle = (ref) => ref.current.show();

  const setInit = (mode) => {
    if (mode == 'add') {
      setDate(dayjs().format('YYYY-MM'));
      setInput('');
      setPayType('1');
      setType(0);
    } else if (mode == 'edit') {
      setDate(dayjs(Number(data.date)).format('YYYY-MM'));
      setInput(data.amount);
      setPayType(data.paymentType);
      setType(data.paymentType == '1' ? data.typeID - 1 : data.typeID - 11);
    }
  };

  const handleKeyboard = (value) => {
    switch (value) {
      case 'ok':
         
        if (!payType || !input) {
          Toast.show('缺少字段');
          return;
        }
        const params = {
          id:data?.id,
          paymentType: payType,
          amount: input,
          date,
          typeID: payType == '1' ? type + 1 : type + 11,
          typeName: payType == '1' ? expenseTypes[type] : IncomeTypes[type],
          remark: comment,
        };
        const res = submit(params);
        if (res) {
          if(mode =='add'){
            setTimeout(refreshHandler, 1000);
          Toast.show('添加成功');
          }else{
            Toast.show('编辑成功');
            setData(params);
          }
          
        }
        setVisible(false);
        // setInput('');
        break;
      case 'close':
        setVisible(false);
        break;
      case 'delete':
        setInput((i) => i.slice(0, i.length - 1));
        break;
      default:
        setInput((i) => i + value);
        break;
    }
  };
  return (
    <Popup
      visible={visible}
      destroy={false}
    >
      <div className={s.container}>
        <div
          className={s.close}
          onClick={() => {
            setVisible(false);
            setInit(mode);
          }}
        >
          <Icon type="wrong" />
        </div>
        <div className={s.filter}>
          <div className={s.type}>
            <span
              className={cx({
                [s.expense]: true,
                [s.active]: payType === '1',
              })}
              onClick={() => setPayType('1')}
            >
              支出
            </span>
            <span
              className={cx({
                [s.income]: true,
                [s.active]: payType === '2',
              })}
              onClick={() => setPayType('2')}
            >
              收入
            </span>
          </div>
          <span onClick={() => toggle(dateRef)}>日期</span>
        </div>

        <div className={s.money}>
          <span className={s.sufix}>¥ </span>
          <span className={cx(s.amount, s.animation)}>{input}</span>
        </div>

        <div className={s.billTypes}>
          {payType == '1'
            ? expenseTypes.map((item, index) => (
                <span
                  key={index}
                  onClick={() => setType(index)}
                  className={type == index ? s.active : s.normal}
                >
                  <CustomIcon
                    className={s.icon}
                    type={item.length < 4 ? typeMap[index + 1].icon : 'qita'}
                  />
                </span>
              ))
            : IncomeTypes.map((item, index) => (
                <span
                  key={index}
                  onClick={() => setType(index)}
                  className={type == index ? s.active : ''}
                >
                  <CustomIcon
                    className={s.icon}
                    type={item.length < 4 ? typeMap[index + 11].icon : 'qita'}
                  />
                </span>
              ))}
        </div>

        <div className={s.comment}>
          {showComment ? (
            <Input
              type="text"
              value={comment}
              autoHeight={true}
              showLength={true}
              maxLength={50}
              row={3}
              placeholder="请输入备注信息"
              onChange={(v) => setComment(v)}
              onBlur={() => setShowComment(false)}
            />
          ) : (
            <span
              style={
                comment
                  ? { color: '#007fff', fontSize: '18px' }
                  : { fontSize: '12px' }
              }
              onClick={() => setShowComment(true)}
            >
              {comment || '添加备注'}
            </span>
          )}
        </div>
      </div>
      <DatePopup ref={dateRef} setDate={setDate} />
      <Keyboard onKeyClick={(value) => handleKeyboard(value)} />
    </Popup>
  );
});

export default addPopup;

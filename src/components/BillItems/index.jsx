import React from 'react';
import styles from './style.module.less';
import { Cell } from 'zarm';
import CustomIcon from '../CustomIcon';
import { typeMap } from '../../utils';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
export default function BillItems({ item }) {
  const { bills, date } = item;
  const history = useHistory();
  const goDetail = (id) => {
    history.push(`/detail/id=${id}`);
  };
  let income = 0;
  let expense = 0;
  bills.forEach((element) => {
    // console.log(element.paymentType + element.typeName);
    if (element.paymentType == '1') {
      expense += Number(element.amount);
    } else {
      income += Number(element.amount);
    }
  });
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <span className={styles.date}>{date}</span>
        <span className={styles.money}>
          <img src="//s.yezgea02.com/1615953405599/zhi%402x.png" alt="支" />
          <span>{expense} 元</span>
          <img src="//s.yezgea02.com/1615953405599/shou%402x.png" alt="收" />
          <span>{income} 元</span>
        </span>
      </div>
      {bills?.map((obj) => (
        <Cell
          key={obj.id}
          onClick={() => goDetail(obj.id)}
          title={
            <>
              <CustomIcon
                className={styles.icon}
                type={obj.typeID ? typeMap[obj.typeID].icon : 1}
              />
              <span className={styles.iconTitle}>{obj.typeName}</span>
            </>
          }
          description={
            <span
              style={{
                fontSize: '26px',
                color: obj.paymentType == '1' ? '#39be77' : 'red',
              }}
            >{`${obj.paymentType == '1' ? '-' : '+'}${obj.amount}`}</span>
          }
          help={
            <div style={{ fontSize: '16px' }}>
              {dayjs(Number(obj.date)).format('HH:mm')}
            </div>
          }
        ></Cell>
      ))}
    </div>
  );
}

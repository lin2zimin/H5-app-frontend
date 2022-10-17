import React, { useState, useEffect, useRef, useMemo } from 'react';
import styles from './style.module.less';
import { Select, Cell, Button, Picker, Pull, Toast } from 'zarm';
import { Icon } from 'zarm';
import BillItems from '@/components/BillItems';
import { getBillList } from '../../server/bill';
import { REFRESH_STATE, LOAD_STATE } from '@/utils/index';
import TypePopup from '../../components/TypePopup';
import DatePopup from '../../components/DatePopup';
import AddPopup from '../../components/AddPopup'
import CustomIcon from '@/components/CustomIcon';
import type from 'postcss-pxtorem/lib/type';
import dayjs from 'dayjs';
import {addBill} from '@/server/bill'
import { allTypes } from '../../utils';
export default function Home() {
  const [date, setDate] = useState(dayjs('2022-07').format('YYYY-MM'));
  const [list, setList] = useState([]);
  const [refreshState, setRefreshState] = useState(REFRESH_STATE.normal);
  const [loadState, setLoadState] = useState(LOAD_STATE.normal);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [typeID, setTypeID] = useState('all');
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const typeRef = useRef();
  const dateRef = useRef();
  const addRef = useRef();
  
  //show the popup
  const toggle = (ref) => ref.current?.show();
  
  useEffect(() => {
    refreshHandler();
  }, [typeID, date]);

  //在refresh 里 调用getbill() 结束后设置success
  // 复用refresh
  async function refreshHandler() {
    setRefreshState(REFRESH_STATE.loading);
    // page != 1 ? setPage(1) : getBill();
    if (page != 1) setPage(1);
    const res = await getBillList({ date, page: 1, typeID });
    if (res) {
      setList(res.list);
      setIncome(res.totalIncome);
      setExpense(res.totalExpense);
      setTotalPage(res.totalPage);
      setRefreshState(REFRESH_STATE.success);
    } else {
      setRefreshState(REFRESH_STATE.failure);
    }
  }

  //通过比较当前页和总页判断是不是继续setLoading
  async function loadHandler() {
    if (page < totalPage) {
      setLoadState(LOAD_STATE.loading);
      const res = await getBillList({
        date,
        page: page + 1,
        typeID,
      });
      if (res.list.length) {
        setList(list.concat(res.list));
        setLoadState(LOAD_STATE.success);
      } else {
        setLoadState(LOAD_STATE.complete);
      }
      setPage(page + 1);
    }
  }
  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <div className={styles.dataWrap}>
          <span className={styles.Income}>
            总收入：<b>¥ {income}</b>{' '}
          </span>
          <span className={styles.Expense}>
            总支出：<b>¥ {expense}</b>{' '}
          </span>
        </div>
        <div className={styles.typeWrap}>
          <div onClick={() => toggle(typeRef)}>{ typeID == 'all' ?'全部类型': allTypes[Number(typeID)-1]}</div>
          <div onClick={() => toggle(dateRef)}>{date}</div>
        </div>
      </div>
      <div className={styles.contentWrap}>
        {/* <BillItems />
          <BillItems /> */}

        {list.length ? (
          <Pull
            // ref={pullRef}
            animationDuration={200}
            stayTime={400}
            refresh={{
              state: refreshState,
              handler: refreshHandler,
            }}
            load={{
              distance: 200,
              state: loadState,
              handler: loadHandler,
            }}
          >
            {list.map((obj, index) => (
              <BillItems key={index} item={obj} />
            ))}
          </Pull>
        ) : null}
      </div>
      <div className={styles.addBtn} onClick={() => toggle(addRef)}>
        <CustomIcon type="tianjia" />
      </div>
      <TypePopup setTypeID={setTypeID} ref={typeRef} />
      <DatePopup setDate={setDate} ref={dateRef} />
      <AddPopup ref = {addRef}  mode={'add'} refreshHandler={refreshHandler} submit={addBill}/>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import s from './style.module.less';
import { Icon, Progress } from 'zarm';
import CustomIcon from '@/components/CustomIcon';
import { typeMap } from '../../utils';
import cx from 'classnames';
import DatePopup from '@/components/DatePopup';
import dayjs from 'dayjs';
import { getData } from '@/server/bill';
// import * as echarts from 'echarts';
export default function Data() {
  const [type, setType] = useState(1);
  const [date, setDate] = useState(dayjs().format('YYYY-MM'));
  const [bills, setBills] = useState({
    1: [],
    2: [],
  });
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  // const [pieType, setPieType] = useState(1);
  const dataRef = useRef();
  const handleClick = () => dataRef.current.show();
  let myChart = null;

  useEffect(() => {
    getData(date).then((res) => {
      setExpense(res.totalExpense);
      setIncome(res.totalIncome);
      let income = res.totalData.filter((obj) => obj.paymentType == 2);
      let expense = res.totalData.filter((obj) => obj.paymentType == 1);
      const billObj = {
        1: expense,
        2: income,
      };
      setBills(billObj);
      setPieChart(billObj[type]);
    });

    return () => {
      myChart.dispose();
    };
  }, [date, type]);

  const setPieChart = (data) => {
    if (echarts) {
      let dom = document.getElementById('proportion');
      myChart = echarts.init(dom);
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          data: data.map((item) => item.typeName),
          // orient: 'vertical',
        },
        series: [
          {
            name: '支出',
            type: 'pie',
            radius: '50%',
            // top:,
            // data: [
            //   { value: 1048, name: 'Search Engine' },
            //   { value: 735, name: 'Direct' },
            //   { value: 580, name: 'Email' },
            //   { value: 484, name: 'Union Ads' },
            //   { value: 300, name: 'Video Ads' },
            // ],
            data: data.map((obj) => ({
              value: obj.amount,
              name: obj.typeName,
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      });
    }
  };

  return (
    <div className={s.data}>
      <div className={s.header}>
        <div className={s.date} onClick={handleClick}>
          <span>{date}</span>
          <Icon type="date" />
        </div>
        <div className={s.expense}> 共支出</div>
        <div className={s.expenseNum}> ￥{expense}</div>
        <div className={s.income}> 共收入￥{income}</div>
      </div>
      <div className={s.content}>
        <div className={s.title}>
          <div className={s.titleName}>收支构成</div>
          <div className={s.btn}>
            <span
              onClick={() => setType(1)}
              className={type == 1 ? s.expense : ''}
            >
              支出
            </span>
            <span
              onClick={() => setType(2)}
              className={type == 2 ? s.income : ''}
            >
              收入
            </span>
          </div>
        </div>

        <div className={s.bar}>
          {bills[type].map((obj, index) => (
            <div className={s.item} key={index}>
              <div className={s.left}>
                <span
                  className={cx({
                    [s.iconSpan]: true,
                    [s.expense]: type == 1,
                    [s.income]: type == 2,
                  })}
                >
                  <CustomIcon
                    className={s.icon}
                    type={typeMap[obj.typeID].icon}
                  />
                </span>
                <span className={s.name}>{obj.typeName}</span>
                <span className={s.amount}>{obj.amount}</span>
              </div>
              <div className={s.right}>
                <Progress
                  shape="line"
                  percent={(
                    (obj.amount / (obj.paymentType == '1' ? expense : income)) 
                    *100
                  ).toFixed(2)}
                  // theme={theme}
                  // strokeShape={strokeShape}
                  // strokeWidth={strokeWidth}
                />
              </div>
            </div>
          ))}
        </div>

        <DatePopup ref={dataRef} setDate={setDate} />

        <div className={s.chart}>
          <div className={s.title}> 收支分析</div>
          <div id="proportion" className={s.proportion}></div>
        </div>
      </div>
    </div>
  );
}

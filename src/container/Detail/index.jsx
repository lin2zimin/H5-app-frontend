import React, { useState, useEffect,useRef } from 'react';
import Header from '../../components/Header';
import s from './style.module.less';
import { useHistory, useLocation } from 'react-router-dom';
import CustomIcon from '@/components/CustomIcon';
import { typeMap } from '@/utils';
import { NavBar, Icon, Modal, Toast } from 'zarm';
import { deleteBill, getDetail } from '../../server/bill';
import dayjs from 'dayjs';
import cx from 'classnames';
import AddPopup from '@/components/AddPopup'
import { updateBill } from '../../server/bill';
export default function Detail() {
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = useState({});
  const id = location.pathname.split('=')[1];
  const editRef = useRef();

  const loadData = async () => {
    setData(await getDetail(id));
  };
  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = () => {
    Modal.confirm({
      title: '删除',
      content: '确认删除账单？',
      onOk: () =>
        deleteBill(id)
          .then(() => {
            Toast.show('删除成功');
            history.goBack();
          })
          .catch((rej) => {
            console.log('Error' + rej);
          }),
    });
  };

  const handleEdit = () => {
    editRef.current.show();
  };

  return (
    <div>
      <div className={s.header}>
        <NavBar
          className={s.title}
          left={
            <Icon
              type="arrow-left"
              theme="primary"
              onClick={() => history.goBack()}
            />
          }
          title={'账单详情'}
        />
      </div>
      <div className={s.body}>
        <div className={s.card}>
          <div className={s.type}>
            <span>
              {data.typeID ? (
                <CustomIcon
                  className={cx({
                    [s.icon]: true,
                    [s.expense]: data.paymentType == '1',
                    [s.income]: data.paymentType == '2',
                  })}
                  type={typeMap[data.typeID].icon}
                />
              ) : (
                ''
              )}
            </span>
            <span>{data.typeName}</span>
          </div>
          <div className={s.text}>
            {data.amount
              ? (data.paymentType == '1' ? '-' : '+') + data.amount
              : ''}
          </div>

          <div className={s.info}>
            <span> 记录时间 {dayjs(data.date).format('YYYY-MM-DD')} </span>
            <span>备注 {data.remark || '-'}</span>
          </div>

          <div className={s.operation}>
            <span onClick={handleDelete}>
              <CustomIcon type={'shanchu'} />
              删除
            </span>
            <span onClick={handleEdit}>
              <CustomIcon type={'tianjia'} />
              编辑
            </span>
          </div>
        </div>
      </div>

      <AddPopup ref={editRef} mode={'edit'} data={data} setData={setData} submit={updateBill}/>
    </div>
  );
}

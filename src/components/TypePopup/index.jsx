import React, { forwardRef, useEffect, useState } from 'react';
import { Popup } from 'zarm';
import s from './style.module.less';
import { expenseTypes, IncomeTypes } from '../../utils';
const TypePopup = forwardRef(({setTypeID}, ref) => {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('');
  ref.current = {
    show: () => setVisible(true),
  };
  let allTypes = expenseTypes.concat(IncomeTypes);
  let map = new Map();
  allTypes.forEach((item, index) => {
    map.set(item ,index + 1);
  });

  const submit = (name) => {
      setActive(name);
      map.has(name) ? setTypeID(map.get(name)): setTypeID('all')
      setVisible(false);
  };
  return (
    <div>
      <Popup
        visible={visible}
        onMaskClick={() => setVisible(false)}
        destroy={false}
      >
        <div className={s.container}>
          <div className={s.header}>请选择类型</div>
          <div className={s.content}>
            <div className={s.all}>
              <p
                className={active == '全部类型' ? s.active : ''}
                onClick={() => submit('全部类型')}
              >
                全部类型
              </p>
            </div>
            <div>支出</div>
            <div className={s.expense}>
              {expenseTypes.map((name, index) => (
                <p
                  className={active == name ? s.active : ''}
                  key={index}
                  onClick={() => submit(name)}
                >
                  {name}
                </p>
              ))}
            </div>
            <div>收入</div>
            <div className={s.expense}>
              {IncomeTypes.map((name, index) => (
                <p
                  className={active == name ? s.active : ''}
                  key={index}
                  onClick={() => submit(name)}
                >
                  {name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
});

export default TypePopup;

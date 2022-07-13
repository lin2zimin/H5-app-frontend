import React, { forwardRef, useState } from 'react';
import { Popup, DatePicker } from 'zarm';
import dayjs from 'dayjs';

const DatePopup = forwardRef(({ setDate }, ref) => {
  const [visible, setVisible] = useState(false);
  // const [current, setCurrent] = useState();
  ref.current = {
    show: () => setVisible(true),
  };
  const submit = (value) =>{
    setDate(dayjs(value).format('YYYY-MM'));
    setVisible(false);
  }
  return (
    <div>
      <DatePicker
        visible={visible}
        mode={'month'}
        onCancel={() => setVisible(false)}
        value={new Date()}
        onOk={(value) => submit(value)}
      />
    </div>
  );
});

export default DatePopup;

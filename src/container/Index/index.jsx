import React from 'react';
import { Button } from 'zarm'
import style from './style.module.less'
export default function Index() {
    return <div className={style.index}>
       <Button theme='primary'>BUTTON</Button>
    </div>
}
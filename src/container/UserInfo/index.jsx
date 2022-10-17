import React, { useState, useEffect } from 'react';
import { NavBar, Icon, Button, Input, FilePicker, Toast } from 'zarm';
import s from './style.module.less';
import { useHistory } from 'react-router-dom';
// import axios from 'axios';
import axios from 'axios';
import { editInfo, getInfo } from '../../server/user';
import { transUrl } from '../../utils';
// import { handleImgUrl } from '../../utils';


export default function index() {
  const baseUrl = '/api';
  const [ncName, setNcName] = useState('')
  const [input, setInput] = useState('');
  const [img, setImg] = useState('');
  const [userInfo, setUserInfo] = useState({});
  // const [submitImg, setSubmitImg] = useState('')
  // const [submitData, setSubmitData] = useState({})
  const history = useHistory();
  useEffect(() => {
    getInfo().then((res) => {
      setUserInfo(res);
      setImg(transUrl(res.avatar));
      setInput(res.signature);
      setNcName(res.nickName)
    });
  }, []);

  const handleSelect = (file) => {
    // console.log('fucking file is', file);
    if (file && file.file.size > 2400 * 1024) {
      Toast.show('上传头像不得超过2.5M！');
      return;
    }
    let formData = new FormData();
    formData.append('file', file.file);
    axios({
      method: 'post',
      url: `/upload`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((res) => {
        console.log('ressss'+ res)
        setImg(transUrl(res));
      })
      .catch(err => console.log('Error' + err ));
  };

  const Submit = () => {
    const params = {
      ...userInfo,
      nickName:ncName,
      avatar: img,
      signature: input,
    };
    editInfo(params).then((res) => {
      if(res =='success'){
        Toast.show('修改成功！')
      }else{
        Toast.show('有点问题，建议再看看')
      }
    });
  };

  console.log(img)
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
        <div className={s.nickName}>
         <span className={s.purpleRound}>修改昵称</span> 
          <Input
            style={{ marginTop: '14px', marginLeft:'8px'}}
            // ref={focusInput}
            type="string"
            placeholder="取一个代号吧"
            value={ncName}
            onChange={setNcName}
          />
        </div>
        <div
          style={{
            fontSize: '16px',
            marginTop: '14px',
            fontWeight: '500px',
            marginBottom: '12px',
            // fontWeight:  '600',
          }}
        >
          <span className={s.purpleRound}>头像</span>
          
        </div>
        <div className={s.avatar}>
          <span className={s.img}>
            <img src={img} alt="" />
          </span>

          <div className={s.detail}>
            <span>支持 jpg、png、jpeg 格式大小1.8mb以内的图片</span>
            <span>
              <FilePicker onChange={handleSelect} accept="image/*">
                <Button className={s.upload} theme="primary" size="xs">
                  点击上传
                </Button>
              </FilePicker>
            </span>
          </div>
        </div>

        <div className={s.sign}>
          <div className={s.signTitle}>
          <img
              style={{ width: 30, height: 30 }}
              src="//s.yezgea02.com/1615973630132/geqian.png"
              alt=""
            />
          <span className={s.purpleRound}>个性签名</span>
          </div>
          
          <Input
            style={{ marginTop: '12px' }}
            // ref={focusInput}
            type="string"
            placeholder="他好像没有什么想说的欸"
            value={input}
            onChange={setInput}
          />
        </div>

        <div className={s.btn}>
          <Button block theme="primary" onClick={Submit}>
            保存
          </Button>
        </div>
      </div>
    </div>
  );
}

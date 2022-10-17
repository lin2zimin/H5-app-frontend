import axios from 'axios';
// import { useHref } from 'react-router';
import { Toast } from 'zarm';
// import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

// MODE是环境变量，通过vite构建的项目里，环境变量在项目中
// 可以通过import.meta.env.MODE 获取
const MODE = import.meta.env.MODE;
// let navigate = useNavigate()
// const navigate = useNavigate();
//defaults属性 设置axios默认配置
// 给axios请求设置默认url 开发环境还是生产环境
// 给axios请求设置默认url 开发环境还是生产环境
axios.defaults.baseURL =
  MODE === 'development' ? '/api' : '线上服务器地址';
// 设置请求为 ajax（异步）请求
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
//设置默认请求头的content-type属性， 文件上传需要变更
axios.defaults.headers.post['Content-Type'] = 'application/json';
// // 从local storage里取token放入请求头供后端验证
// axios.defaults.headers['Authorization'] = `${
//   localStorage.getItem('token') || null
// }`;
// 请求拦截器
//interceptors 的request属性为 在请求发出前对请求做事
axios.interceptors.request.use((req) => {
  req.headers.Authorization = localStorage.getItem('token');
  return req;
});
//interceptors 的response属性为 在收到res后处理数据
axios.interceptors.response.use(
  (res) => {
    const { code, msg, data } = res.data;
    if (code == 401) {
        Toast.show('请先登录');
        setTimeout(() => (window.location.href = '/login'), 1500);
    }
    
    if (code != 200) {
      if (msg) Toast.show(msg);
      return Promise.reject(data);
    }

    // if(msg) Toast.show(msg)
    return data;
  },
  (err) => {
    console.log(err);
    return null;
  }
);

export default axios;

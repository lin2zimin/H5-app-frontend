import axios from './axios';

const MODE = import.meta.env.MODE
export const get = axios.get;

export const post = axios.post;

export const typeMap = {
  1: {
    icon: 'canyin',
  },
  2: {
    icon: 'fushi',
  },
  3: {
    icon: 'jiaotong',
  },
  4: {
    icon: 'riyong',
  },
  5: {
    icon: 'gouwu',
  },
  6: {
    icon: 'xuexi',
  },
  7: {
    icon: 'yiliao',
  },
  8: {
    icon: 'lvxing',
  },
  9: {
    icon: 'renqing',
  },
  10: {
    icon: 'qita',
  },
  11: {
    icon: 'gongzi',
  },
  12: {
    icon: 'jiangjin',
  },
  13: {
    icon: 'zhuanzhang',
  },
  14: {
    icon: 'licai',
  },
  15: {
    icon: 'tuikuang',
  },
  16: {
    icon: 'qita',
  },
};

export const REFRESH_STATE = {
  normal: 0, // 普通
  pull: 1, // 下拉刷新（未满足刷新条件）
  drop: 2, // 释放立即刷新（满足刷新条件）
  loading: 3, // 加载中
  success: 4, // 加载成功
  failure: 5, // 加载失败
};

export const LOAD_STATE = {
  normal: 0, // 普通
  abort: 1, // 中止
  loading: 2, // 加载中
  success: 3, // 加载成功
  failure: 4, // 加载失败
  complete: 5, // 加载完成（无新数据）
};

export const allTypes = [
  '餐饮',
  '服饰',
  '交通',
  '日用',
  '购物',
  '学习',
  '医疗',
  '旅行',
  '人情',
  '其他支出',
  '工资', '奖金', '转账', '理财', '退款','其他收入'
]
export const expenseTypes = [
  '餐饮',
  '服饰',
  '交通',
  '日用',
  '购物',
  '学习',
  '医疗',
  '旅行',
  '人情',
  '其他支出',
];
export const IncomeTypes = ['工资', '奖金', '转账', '理财', '退款','其他收入' ];

export const transUrl = (url) => {
   if(!url) return;
   if(url.includes('http')) return url;
   return `${MODE == 'development' ? 'http://127.0.0.1:7001' : '线上'}${url}`
}
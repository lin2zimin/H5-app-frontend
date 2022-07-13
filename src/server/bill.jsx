import { get, post } from '../utils/index';

export const getBillList = async (params) =>
  await get(
    `/bill/list?date=${params.date}&page=${params.page}&page_size=5&typeID=${params.typeID}`
  );
export const addBill = async (params) => await post(`/bill/add`, params);

export const getDetail = async (id) => await get(`/bill/detail?id=${id}`);

export const deleteBill = async (id) => await post(`/bill/delete`, { id });

export const updateBill = async (params) => await post(`/bill/update`, params);

export const getData = async(date) => await post(`/bill/data?date=${date}`);
export interface Item extends IItem {
  id: string;
  createDate: string;
  expireDate: string;
}

export interface IItem {
  name: string;
  coupon: string;
  fio: string;
  address: string;
  company: string;
}

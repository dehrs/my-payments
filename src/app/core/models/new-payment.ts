/* eslint-disable prettier/prettier */
export interface NewPayment {
  id:string;
  username: string;
  title: number | undefined;
  date: Date;
  valuePayment: number | undefined;
  isPaid?: boolean
}

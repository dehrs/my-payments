/* eslint-disable prettier/prettier */
export interface NewPayment {
  id:string;
  username: string;
  title: number | undefined;
  date: Date | undefined;
  valuePayment: number | undefined;
  isPaid?: boolean
}

export enum StatusesTitles {
  AVAILABLE = "available",
  BUSY = "busy",
  CANCELED = "canceled",
}

export type Status = {
  title: StatusesTitles;
  spec: string;
};

export const STATUSES = [
  {
    title: StatusesTitles.AVAILABLE,
    spec: "Доступно",
  },
  {
    title: StatusesTitles.BUSY,
    spec: "В работе",
  },
  {
    title: StatusesTitles.CANCELED,
    spec: "Списано",
  },
];

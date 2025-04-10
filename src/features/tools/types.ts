// Определяем типы статусов
type ToolStatus = "available" | "busy" | "canceled" | "all";

// Создаем маппинг статусов на человекочитаемые значения
export const statusMapping: Record<ToolStatus, string> = {
  available: "Доступен",
  busy: "В работе",
  canceled: "Списан",
  all: "Все",
};

export enum ToolStatusEnum {
  ALL = "all",
  AVAILABLE = "available",
  BUSY = "busy",
  CANCELED = "canceled",
}

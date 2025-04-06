// Определяем типы статусов
type ToolStatus = 'available' | 'busy' | 'canceled';

// Создаем маппинг статусов на человекочитаемые значения
export const statusMapping: Record<ToolStatus, string> = {
  available: 'Доступен',
  busy: 'В работе',
  canceled: 'Списан',
};

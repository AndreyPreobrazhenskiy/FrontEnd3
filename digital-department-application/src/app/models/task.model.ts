export type TaskType = 'bug' | 'task';
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';
export type TaskStatus = 'open' | 'in progress' | 'done';

export interface Task {
  id: number;                         // Номер (авто)
  type: TaskType;                     // Тип (обязательно)
  priority?: TaskPriority;            // Приоритет
  status: TaskStatus;                 // Статус (обязательно)
  title: string;                      // Заголовок (обязательно)
  description?: string;               // Описание
  assignee?: string;                  // Исполнитель
  creator: string;                    // Создатель (обязательно)
  createdAt: Date;                    // Дата создания (авто)
  updatedAt: Date;                    // Дата последнего изменения (авто)
}

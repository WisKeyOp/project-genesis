export interface Task {
  id: string;
  taskId: string;
  title: string;
  description: string;
  columnId: ColumnId;
}

export type ColumnId = 'todo' | 'inProgress' | 'needReview' | 'completed';

export interface Column {
  id: ColumnId;
  title: string;
  tasks: Task[];
}

export interface BoardState {
  columns: Record<ColumnId, Column>;
  columnOrder: ColumnId[];
}

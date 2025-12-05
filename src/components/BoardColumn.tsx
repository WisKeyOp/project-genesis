import { Droppable } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import { Column, ColumnId } from '@/types/task';
import { TaskCard } from './TaskCard';

interface BoardColumnProps {
  column: Column;
  onAddTask: (columnId: ColumnId) => void;
}

export function BoardColumn({ column, onAddTask }: BoardColumnProps) {
  return (
    <div className="flex-shrink-0 w-72 bg-secondary/50 rounded-lg">
      <div className="p-3 flex items-center justify-between">
        <h3 className="font-semibold text-sm text-foreground">{column.title}</h3>
        <button
          onClick={() => onAddTask(column.id)}
          className="p-1 hover:bg-muted rounded transition-colors"
          aria-label={`Add task to ${column.title}`}
        >
          <Plus className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`px-2 pb-2 min-h-[200px] transition-colors ${
              snapshot.isDraggingOver ? 'bg-primary/5' : ''
            }`}
          >
            {column.tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

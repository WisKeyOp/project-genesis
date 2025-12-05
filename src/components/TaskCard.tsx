import { Draggable } from '@hello-pangea/dnd';
import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
  index: number;
}

export function TaskCard({ task, index }: TaskCardProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-card p-3 rounded-md shadow-card mb-2 transition-shadow duration-200 cursor-grab active:cursor-grabbing ${
            snapshot.isDragging ? 'shadow-card-hover ring-2 ring-primary/20' : ''
          }`}
        >
          <p className="text-sm font-medium text-card-foreground mb-1">{task.title}</p>
          <span className="text-xs text-muted-foreground">{task.taskId}</span>
        </div>
      )}
    </Draggable>
  );
}

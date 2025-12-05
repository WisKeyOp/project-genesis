import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useBoard } from '@/hooks/useBoard';
import { Sidebar } from '@/components/Sidebar';
import { BoardColumn } from '@/components/BoardColumn';
import { AddTaskModal } from '@/components/AddTaskModal';
import { ColumnId } from '@/types/task';

export default function Board() {
  const { isAuthenticated, logout } = useAuth();
  const { board, addTask, moveTask } = useBoard();
  const navigate = useNavigate();
  const [addingToColumn, setAddingToColumn] = useState<ColumnId | null>(null);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    moveTask(
      draggableId,
      source.droppableId as ColumnId,
      destination.droppableId as ColumnId,
      source.index,
      destination.index
    );
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddTask = (columnId: ColumnId) => {
    setAddingToColumn(columnId);
  };

  const handleTaskAdded = (task: { taskId: string; title: string; description: string }) => {
    if (addingToColumn) {
      addTask(addingToColumn, task);
    }
  };

  if (isAuthenticated === null || !board) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar onLogout={handleLogout} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="p-4 border-b border-border bg-card">
          <h1 className="text-xl font-bold text-card-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            Jira board (Vetty)
            <Sparkles className="w-5 h-5 text-accent" />
          </h1>
        </header>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex-1 p-4 overflow-x-auto scrollbar-thin">
            <div className="flex gap-4 min-w-max">
              {board.columnOrder.map((columnId) => (
                <BoardColumn
                  key={columnId}
                  column={board.columns[columnId]}
                  onAddTask={handleAddTask}
                />
              ))}
            </div>
          </div>
        </DragDropContext>
      </main>

      {addingToColumn && board.columns[addingToColumn] && (
        <AddTaskModal
          columnId={addingToColumn}
          columnTitle={board.columns[addingToColumn].title}
          onClose={() => setAddingToColumn(null)}
          onAdd={handleTaskAdded}
        />
      )}
    </div>
  );
}

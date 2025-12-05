import { useState, useEffect } from 'react';
import { BoardState, ColumnId, Task } from '@/types/task';

const BOARD_KEY = 'vetty_board';

const initialBoard: BoardState = {
  columns: {
    todo: { id: 'todo', title: 'To Do', tasks: [] },
    inProgress: { id: 'inProgress', title: 'In Progress', tasks: [] },
    needReview: { id: 'needReview', title: 'Need Review', tasks: [] },
    completed: { id: 'completed', title: 'Completed', tasks: [] },
  },
  columnOrder: ['todo', 'inProgress', 'needReview', 'completed'],
};

const sampleTasks: Task[] = [
  { id: '1', taskId: 'VET-001', title: 'Layout usability test', description: 'Test the layout usability', columnId: 'todo' },
  { id: '2', taskId: 'VET-002', title: 'SWOT UI exploration', description: 'Explore UI options for SWOT', columnId: 'todo' },
  { id: '3', taskId: 'VET-003', title: 'Fields specs - Priority', description: 'Define priority field specifications', columnId: 'todo' },
  { id: '4', taskId: 'VET-004', title: 'Workflow spec - Editing transition', description: 'Specify editing workflow transitions', columnId: 'inProgress' },
  { id: '5', taskId: 'VET-005', title: 'Cards spec - Show more content', description: 'Define show more content specs', columnId: 'inProgress' },
  { id: '6', taskId: 'VET-006', title: 'Role 2 - Update an assignee', description: 'Update assignee functionality', columnId: 'inProgress' },
  { id: '7', taskId: 'VET-007', title: 'Terminology testing - Issues', description: 'Test terminology for issues', columnId: 'needReview' },
  { id: '8', taskId: 'VET-008', title: 'Project settings - navigation test', description: 'Test navigation in project settings', columnId: 'needReview' },
  { id: '9', taskId: 'VET-009', title: 'Technology testing - issues flow', description: 'Test issues flow technology', columnId: 'completed' },
  { id: '10', taskId: 'VET-010', title: 'Project settings - navigation test flow', description: 'Test navigation flow in settings', columnId: 'completed' },
];

function getInitialBoardWithSamples(): BoardState {
  const board = JSON.parse(JSON.stringify(initialBoard)) as BoardState;
  sampleTasks.forEach(task => {
    board.columns[task.columnId].tasks.push(task);
  });
  return board;
}

export function useBoard() {
  const [board, setBoard] = useState<BoardState | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(BOARD_KEY);
    if (saved) {
      setBoard(JSON.parse(saved));
    } else {
      const initial = getInitialBoardWithSamples();
      setBoard(initial);
      localStorage.setItem(BOARD_KEY, JSON.stringify(initial));
    }
  }, []);

  const saveBoard = (newBoard: BoardState) => {
    setBoard(newBoard);
    localStorage.setItem(BOARD_KEY, JSON.stringify(newBoard));
  };

  const addTask = (columnId: ColumnId, task: Omit<Task, 'id' | 'columnId'>) => {
    if (!board) return;
    
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      columnId,
    };

    const newBoard = {
      ...board,
      columns: {
        ...board.columns,
        [columnId]: {
          ...board.columns[columnId],
          tasks: [...board.columns[columnId].tasks, newTask],
        },
      },
    };

    saveBoard(newBoard);
  };

  const moveTask = (
    taskId: string,
    sourceColumnId: ColumnId,
    destColumnId: ColumnId,
    sourceIndex: number,
    destIndex: number
  ) => {
    if (!board) return;

    const newBoard = JSON.parse(JSON.stringify(board)) as BoardState;
    const sourceColumn = newBoard.columns[sourceColumnId];
    const destColumn = newBoard.columns[destColumnId];

    const [movedTask] = sourceColumn.tasks.splice(sourceIndex, 1);
    movedTask.columnId = destColumnId;
    destColumn.tasks.splice(destIndex, 0, movedTask);

    saveBoard(newBoard);
  };

  return { board, addTask, moveTask };
}

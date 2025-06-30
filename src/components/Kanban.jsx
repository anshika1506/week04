import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Modal from './Modal';

function Kanban() {
  const [columns, setColumns] = useState({
    todo: {
      name: 'To Do',
      items: [
        { id: '1', content: 'Design homepage' },
        { id: '2', content: 'Implement API' },
        { id: '3', content: 'Write documentation' },
      ],
    },
    inProgress: {
      name: 'In Progress',
      items: [
        { id: '4', content: 'Test features' },
        { id: '5', content: 'Fix bugs' },
      ],
    },
    done: {
      name: 'Done',
      items: [
        { id: '6', content: 'Deploy app' },
      ],
    },
  });
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems,
        },
      });
    } else {
      destItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destCol,
          items: destItems,
        },
      });
    }
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    setColumns({
      ...columns,
      todo: {
        ...columns.todo,
        items: [...columns.todo.items, { id: `${Date.now()}`, content: newTask }],
      },
    });
    setSuccessMessage('Task added successfully');
    setNewTask('');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleEditTask = () => {
    const [colId, taskId, newContent] = editTask;
    setColumns({
      ...columns,
      [colId]: {
        ...columns[colId],
        items: columns[colId].items.map((item) =>
          item.id === taskId ? { ...item, content: newContent } : item
        ),
      },
    });
    setSuccessMessage('Task updated successfully');
    setEditTask(null);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div>
      <h2>Task Board</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div className="task-form">
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          aria-label="Add new task"
        />
        <button onClick={handleAddTask} aria-label="Add task">Add Task</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {Object.entries(columns).map(([colId, col]) => (
            <div className="kanban-column" key={colId}>
              <h3>{col.name}</h3>
              <Droppable droppableId={colId}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {col.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            className="kanban-task"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => setEditTask([colId, item.id, item.content])}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => e.key === 'Enter' && setEditTask([colId, item.id, item.content])}
                            aria-label={`Edit task ${item.content}`}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
      {editTask && (
        <Modal
          title="Edit Task"
          onClose={() => setEditTask(null)}
          onConfirm={handleEditTask}
          confirmText="Save"
          cancelText="Cancel"
        >
          <input
            type="text"
            value={editTask[2]}
            onChange={(e) => setEditTask([editTask[0], editTask[1], e.target.value])}
            aria-label="Edit task content"
          />
        </Modal>
      )}
    </div>
  );
}

export default Kanban;
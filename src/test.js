import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [reorderedItem] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, reorderedItem);
  return result;
};

const Item = ({ item, index, provided }) => {
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseOut = () => {
    setHovered(false);
  };

  const handleDragStart = () => {
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  return (
    <Draggable
      draggableId={item.id.toString()}
      index={index}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white p-4 rounded-md shadow-md cursor-move ${
            dragging? 'border-red-500' : 'border-gray-300'
          }`}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          style={{
            borderWidth: '2px',
            borderStyle: 'olid',
            marginBottom: 16,
          }}
        >
          <h3 className="text-lg font-bold">{item.title}</h3>
          <p className="text-gray-600">{item.description}</p>
          {hovered && (
            <div
              className="absolute top-0 left-0 w-full h-full bg-gray-100 p-4 rounded-md"
              style={{
                transform: 'cale(0.8)', // make it smaller
                zIndex: 1, // make it appear on top
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // add a box shadow
                pointerEvents: 'none', // prevent capturing mouse events
              }}
            >
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

const List = () => {
  const [items, setItems] = useState([
    { id: 1, title: 'Scotland Island', description: 'Sydney, Australia' },
    { id: 2, title: 'The Charles Grand Brasserie & Bar', description: 'Lorem ipsum, Dolor' },
    { id: 3, title: 'Bridge Climb', description: 'Dolor, Sit amet' },
    { id: 4, title: 'Scotland Island', description: 'Sydney, Australia' },
    { id: 5, title: 'Clam Bar', description: 'Etcetera veni, Vidi vici' },
    { id: 6, title: 'Vivid Festival', description: 'Sydney, Australia' },
  ]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = reorder(items, result.source.index, result.destination.index);
    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="flex gap-4">
        <Droppable droppableId="items" className="droppable">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-1/2 bg-gray-100 p-4 rounded-md"
            >
              <h2 className="text-xl font-bold mb-4">List</h2>
              {items.map((item, index) => (
                <Item key={item.id} item={item} index={index} provided={provided} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default List;
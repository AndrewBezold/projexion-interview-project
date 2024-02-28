import React, { PropsWithChildren } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  useSensors,
  useSensor,
  DragStartEvent,
  DragEndEvent,
  PointerSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import {
  Typography,
} from '@mui/material';

interface SortableContentNodesProps {
  nodes: Array<string>,
  setNodes: React.Dispatch<React.SetStateAction<Array<string>>>,
}

export const SortableContentNodes = ({ nodes, setNodes, children }: PropsWithChildren<SortableContentNodesProps>) => {
  const [activeId, setActiveId] = React.useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as number)
  }

  // There is an issue here that I don't have time to figure out right now
  // `over.id` is always the top item in the virtualizer, rather than whatever
  // the pointer is pointing at
  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    console.log(active.id, over?.id)
    if (over && active.id !== over.id) {
      setNodes((oldNodes) => {
        const oldIndex = active.id as number;
        const newIndex = over.id as number;
        return arrayMove(oldNodes, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={nodes.map((_, index) => index)}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          <div style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            transform: `translateY(${activeId * 35}px)`
          }}>
            <Typography>
              {nodes[activeId]}
            </Typography>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
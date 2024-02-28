import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { Typography } from '@mui/material';

interface ContentNodeProps {
  id: string | number,
  height: number,
  start: number,
  title: string,
}

export const ContentNode = ({ id, height, start, title }: ContentNodeProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
  } = useSortable({id: id})

  return (
    <div
      key={id}
      ref={setNodeRef}
      style={{
        height: `${height}px`,
        width: '100%',
        position: 'absolute',
        top: 0,
        transform: `translateY(${start}px)`
      }}
      {...attributes}
      {...listeners}
    >
      <Typography>
        {title}
      </Typography>
    </div>
  )
}
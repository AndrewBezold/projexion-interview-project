import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ContentNode } from './ContentNode';
import { SortableContentNodes } from './SortableContentNodes';

interface LazyLoadingNodesProps {
  nodes: Array<string>,
  setNodes: React.Dispatch<React.SetStateAction<Array<string>>>,
}

export const LazyLoadingNodes = ({ nodes, setNodes }: LazyLoadingNodesProps) => {

  const ref = useRef<HTMLInputElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: nodes.length,
    getScrollElement: () => ref.current,
    estimateSize: () => 35,
  })

  return (
    <div ref={ref} style={{overflow: 'auto', maxHeight: '400px', width: '400px'}} data-testid="LazyLoadingScrollDiv">
      <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}>
        <SortableContentNodes nodes={nodes} setNodes={setNodes}>
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <ContentNode
              key={virtualItem.key}
              id={virtualItem.key}
              height={virtualItem.size}
              start={virtualItem.start}
              title={nodes[virtualItem.index]}
            />
          ))}
        </SortableContentNodes>
      </div>
    </div>
  )
}
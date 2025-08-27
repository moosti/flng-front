"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableCard } from "./SortableCard";
import { cn } from "@/app/utils/utils";

interface SortableGridProps {
  items: { id: string; content: React.ReactNode }[];
  onSort?: (items: { id: string; content: React.ReactNode }[]) => void;
  color: string;
}

export function SortableGrid({
  items: initialItems,
  onSort,
  color,
}: SortableGridProps) {
  const [items, setItems] = useState(initialItems);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);
        setTimeout(() => {
          onSort?.(newItems);
        }, 300);
        // onSort?.(newItems);
        return newItems;
      });
    }
  };

  if (!isClient) {
    return null;
  }

  const gridCols =
    initialItems.length === 2
      ? "grid-cols-2"
      : initialItems.length === 3
      ? "grid-cols-2 sm:grid-cols-3"
      : initialItems.length === 4
      ? "grid-cols-2 sm:grid-cols-4"
      : initialItems.length === 5
      ? "grid-cols-5"
      : "grid-cols-6";

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={(event) => event.active.data.current?.preventDefault?.()}
    >
      <div
        className={cn(gridCols, "row-span-5 gap-2 grid w-full mx-auto")}
        // style={{
        //   gridTemplateColumns: `repeat(auto-fill, minmax(${minCardWidth}px, 1fr))`,
        // }}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {items.map((item, index) => (
            <SortableCard
              color={color}
              index={index}
              key={item.id}
              id={item.id}
            >
              {item.content}
            </SortableCard>
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}

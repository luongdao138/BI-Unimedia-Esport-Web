import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Item } from './../Item'

export type Props = {
  id: any
}

export const SortableItem: React.FC<Props> = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return <Item id={props.id} ref={setNodeRef} style={style} {...attributes} {...listeners} />
}

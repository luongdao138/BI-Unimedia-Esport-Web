import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableItem } from './SortableItem'
import { Header } from './Header'
import { FooterAction } from './Footer'
import useOrderData from './useOrderData'

const HomeOrderContainer: React.FC = () => {
  const classes = useStyles()

  const { handleDragEnd, items, handleCancel, handleDone } = useOrderData()

  return (
    <div className={classes.grow}>
      <Header onCancel={handleCancel} onDone={handleDone} />
      <Box mx={2} className={classes.dragWrap}>
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((id) => (
              <SortableItem key={id} id={id} />
            ))}
          </SortableContext>
        </DndContext>
      </Box>
      <FooterAction onCancel={handleCancel} onDone={handleDone} />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  grow: { position: 'relative' },
  dragWrap: {
    marginBottom: 320,
  },
}))

export default HomeOrderContainer

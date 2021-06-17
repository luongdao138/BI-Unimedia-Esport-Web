import React from 'react'
import { Box, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { SortableItem } from './SortableItem'
import { Header } from './Header'
import { FooterAction } from './Footer'
import useOrderData from './useOrderData'
import { ReactSortable } from 'react-sortablejs'

const HomeOrderContainer: React.FC = () => {
  const classes = useStyles()

  const { items, handleCancel, handleDone, setItems } = useOrderData()

  return (
    <div className={classes.grow}>
      <Header onCancel={handleCancel} onDone={handleDone} />
      <Box mx={2} className={classes.dragWrap}>
        <ReactSortable list={items} setList={setItems}>
          {items.map((item) => (
            <SortableItem key={item.id} name={item.name} />
          ))}
        </ReactSortable>
      </Box>
      <FooterAction onCancel={handleCancel} onDone={handleDone} />
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  grow: { position: 'relative' },
  dragWrap: {
    marginBottom: 320,
    '& >div:focus': {
      outline: 'none',
    },
  },
  [theme.breakpoints.down('sm')]: {
    dragWrap: {
      marginBottom: theme.spacing(10),
    },
  },
}))

export default HomeOrderContainer

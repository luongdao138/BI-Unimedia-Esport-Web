import { Box, makeStyles, Theme } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import React, { FC } from 'react'
import { Colors } from '@theme/colors'
import PointsPurchasedItem from '../PointsPurchasedItem'
import MyPointsCard from '../MyPointsCard'

export interface PointsPurchasedDataProps {
  serialNumber: string
  purchasedPointsId: number
  points: number
  expiresDatePurchased: string
}

const PointManagementTab: FC = () => {
  const classes = useStyles()
  const dataPurchasedPoints = Array(2)
    .fill('')
    .map((_, i) => ({
      id: `${i}`,
      serialNumber: `${i + 1}`,
      purchasedPointsId: 202106221234,
      points: 1000,
      expiresDatePurchased: '2022年04月09日',
    }))
  return (
    <Box className={classes.container} maxWidth="md">
      <Box>
        <MyPointsCard my_points={1500} />
      </Box>
      <Box className={classes.content}>
        {dataPurchasedPoints.map((item, i) => (
          <PointsPurchasedItem data={item} key={i} />
        ))}
      </Box>
      <Box className={classes.paginationContainer}>
        <Pagination defaultPage={1} count={99} variant="outlined" shape="rounded" className={classes.paginationStyle} />
      </Box>
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  [theme.breakpoints.up('md')]: {
    container: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      marginTop: theme.spacing(3),
    },
  },
  content: {
    backgroundColor: Colors.black,
    flex: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.grey['200'],
    borderStyle: 'solid',
    marginTop: 18,
    paddingBottom: 18,
  },
  paginationContainer: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  paginationStyle: {
    '& .MuiPaginationItem-root': {
      color: Colors.white,
      borderColor: Colors.primary,
      borderWidth: 1,
    },
    '& .Mui-selected': {
      backgroundColor: Colors.primary,
    },
    '& .MuiPaginationItem-ranges': {},
  },
}))
export default PointManagementTab

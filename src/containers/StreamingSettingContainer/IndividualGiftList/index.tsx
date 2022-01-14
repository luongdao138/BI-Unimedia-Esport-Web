import { Box, Icon, makeStyles, Typography } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import ESButton from '@components/Button'
import { useTranslation } from 'react-i18next'
import GiftTable from '@containers/StreamingSettingContainer/IndividualGiftList/GiftTable'
import GiftListPagination from '@containers/StreamingSettingContainer/IndividualGiftList/Pagination'

const IndividualGiftListContainer: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const mockData = Array.from(Array(20).keys()).map((index) => ({
    index,
    name: 'チームかやを',
    number_of_registration: 128,
  }))
  const [currentPage, setCurrentPage] = useState(1)
  // const [totalPage, setTotalPage] = useState(10);

  const createNewButton = useCallback(() => {
    return (
      <ESButton className={classes.createButton}>
        <Icon className={`fa fa-plus ${classes.iconPlus}`} fontSize="small" />
        <Typography>{t('streaming_setting_screen.individual_gift_tab.create_new')}</Typography>
      </ESButton>
    )
  }, [])

  const displayData = () => mockData.slice(10 * (currentPage - 1), 10 * currentPage)

  const displayTable = () => {
    return (
      <Box>
        <GiftTable data={displayData()} />
      </Box>
    )
  }

  const onChangePage = (page) => {
    if (page > 0 && page <= 10) setCurrentPage(page)
  }

  const pagination = () => {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" className={classes.pagination}>
        <GiftListPagination currentPage={currentPage} totalPage={2} onChangePage={onChangePage} />
      </Box>
    )
  }
  return (
    <Box className={classes.container}>
      {createNewButton()}
      {displayTable()}
      {pagination()}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '12px',
  },
  createButton: {
    marginTop: '8px',
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    border: '1px solid #FFFFFF',
    borderRadius: '20px',
    padding: '8px 12px',
  },
  iconPlus: {
    marginRight: '4px',
  },
  pagination: {
    marginTop: '32px',
  },
  [theme.breakpoints.down('sm')]: {
    createButton: {
      marginRight: '24px',
    },
  },
}))

export default IndividualGiftListContainer

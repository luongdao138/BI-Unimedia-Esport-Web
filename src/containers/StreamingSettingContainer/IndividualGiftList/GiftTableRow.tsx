import React, { useState } from 'react'
import { Box, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import ESButton from '@components/Button'
import DeleteConfirmModal from '@containers/StreamingSettingContainer/IndividualGiftList/deletemodal'
import { GiftIndividual } from '@services/liveStream.service'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'

type Props = {
  item?: GiftIndividual
}

const GiftTableRow: React.FC<Props> = ({ item }) => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation('common')
  const { index, name, number_of_registration: numberOfRegistration } = item
  const handleOnRemoveClick = () => {
    setDeleteModalVisible(true)
  }

  const handleOnEditClick = () => {
    // TODO
  }

  const handleCloseModal = () => {
    setDeleteModalVisible(false)
  }

  const handleDeleteConfirmPress = () => {
    // TODO
  }
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  return (
    <Box className={classes.tableRow}>
      <Box className={classes.indexColumn}>
        <Typography className={classes.tableText}>{index}</Typography>
      </Box>
      <Box className={classes.nameColumn}>
        <Typography className={classes.tableText}>{name}</Typography>
      </Box>
      {!isMobile && (
        <Box className={classes.numberOfRegColumn}>
          <Typography className={classes.tableText}>{numberOfRegistration.toString()}</Typography>
        </Box>
      )}
      <Box className={classes.actionButtonColumn}>
        <ESButton onClick={handleOnRemoveClick} className={classes.removeButton}>
          <Typography className={classes.remove}>{t('streaming_setting_screen.individual_gift_tab.remove')}</Typography>
        </ESButton>
        <ESButton onClick={handleOnEditClick} className={classes.editButton}>
          <Typography className={classes.edit}>{t('streaming_setting_screen.individual_gift_tab.edit')}</Typography>
        </ESButton>
      </Box>
      {deleteModalVisible && (
        <DeleteConfirmModal name={name} open={deleteModalVisible} handleClose={handleCloseModal} handleDelete={handleDeleteConfirmPress} />
      )}
    </Box>
  )
}
const useStyles = makeStyles((theme) => ({
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: '8px 0px',
  },
  indexColumn: {
    width: '84px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableText: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
  },
  nameColumn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  numberOfRegColumn: {
    width: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  actionButtonColumn: {
    width: '214px',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: Colors.white_opacity['30'],
    height: '26px',
    marginLeft: '10px',
    marginRight: '18px',
  },
  remove: {
    color: Colors.white,
    fontSize: '14px',
  },
  editButton: {
    border: `1px solid ${Colors.white_opacity['70']}`,
    height: '26px',
  },
  edit: {
    color: Colors.white_opacity['70'],
    fontSize: '14px',
  },
  [theme.breakpoints.down('sm')]: {
    actionButtonColumn: {
      width: '162px',
    },
  },
}))
export default GiftTableRow

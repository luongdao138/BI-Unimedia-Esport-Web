import React, { useState } from 'react'
import { Box, makeStyles, TableCell, TableRow, Theme, Typography, useMediaQuery, useTheme } from '@material-ui/core'
// import ESButton from '@components/Button'
import DeleteConfirmModal from '@containers/StreamingSettingContainer/IndividualGiftList/deletemodal'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { GiftGroupType } from '@services/gift.service'
import useGiftManage from '@containers/StreamingGiftManagement/useGiftTarget'
import * as commonActions from '@store/common/actions'
import { useAppDispatch } from '@store/hooks'

type Props = {
  item?: GiftGroupType
  index?: number
  handleGoToEditGiftGroupState?: (data?: GiftGroupType) => () => void
  refreshData?: () => void
  setCurrentPage?: (currentPage: number) => void
}

const GiftTableRow: React.FC<Props> = ({ item, handleGoToEditGiftGroupState, refreshData, setCurrentPage }) => {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation('common')
  const { title: name, total_master: numberOfRegistration } = item
  const { deleteGiftGroup, giftGroupList } = useGiftManage()

  const handleOnRemoveClick = () => {
    setDeleteModalVisible(true)
  }

  const handleOnEditClick = handleGoToEditGiftGroupState(item)
  const handleCloseModal = () => {
    setDeleteModalVisible(false)
  }

  const deleteGiftGroupSuccessCallback = () => {
    dispatch(commonActions.addToast(t('streaming_gift_management.toast_delete_group_success')))
    setDeleteModalVisible(false)

    if (giftGroupList.length === 1) {
      refreshData()
      setCurrentPage(1)
    } else {
      refreshData()
    }
  }

  const deleteGiftGroupErrorCallback = () => {
    setDeleteModalVisible(false)
  }

  const handleDeleteConfirmPress = () => {
    deleteGiftGroup(item?.group_uuid, deleteGiftGroupSuccessCallback, deleteGiftGroupErrorCallback)
  }
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  return (
    <>
      <TableRow key={item.id}>
        <TableCell align="center">
          <Typography component="span">{item.no}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography component="span">{name}</Typography>
        </TableCell>
        {!isMobile && (
          <TableCell align="right">
            <Typography component="span">{numberOfRegistration}</Typography>
          </TableCell>
        )}
        <TableCell align="center">
          <Box className={classes.btnContainer}>
            <Box onClick={handleOnEditClick} className={classes.btnSelect}>
              <Typography className={classes.editText} variant="caption">
                {t('streaming_setting_screen.individual_gift_tab.edit')}
              </Typography>
            </Box>
            <Box onClick={handleOnRemoveClick} className={classes.btnSelect}>
              <Typography className={classes.removeText} variant="caption">
                {t('streaming_setting_screen.individual_gift_tab.remove')}
              </Typography>
            </Box>
          </Box>
        </TableCell>
      </TableRow>
      {deleteModalVisible && (
        <DeleteConfirmModal name={name} open={deleteModalVisible} handleClose={handleCloseModal} handleDelete={handleDeleteConfirmPress} />
      )}
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  removeText: {
    fontSize: 10,
    backgroundColor: Colors.grey['400'],
    textAlign: 'center',
    borderRadius: 2,
    color: Colors.white,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 20,
    paddingRight: 20,
    wordBreak: 'keep-all',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 10,
      paddingRight: 10,
    },
  },
  editText: {
    fontSize: 10,
    backgroundColor: 'transparent',
    textAlign: 'center',
    borderRadius: 2,
    color: Colors.white_opacity['70'],
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 20,
    paddingRight: 20,
    wordBreak: 'keep-all',
    border: `1px solid ${Colors.white_opacity['70']}`,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 10,
      paddingRight: 10,
    },
  },

  btnContainer: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnSelect: {
    display: 'flex',
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },
}))

export default GiftTableRow

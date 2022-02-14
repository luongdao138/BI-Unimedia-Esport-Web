import { Box, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ESButton from '@components/Button'
import DeleteConfirmModal from '@containers/StreamingGiftManagement/deletemodal'
import { TargetPersonType } from '@store/giftManage/actions'
import useGiftManage from './useGiftTarget'

interface Props {
  index: number
  item: TargetPersonType
  handleModeUpdate: (id: string) => void
}

const GiftItem: React.FC<Props> = ({ item, index, handleModeUpdate }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { deleteTargetPerson } = useGiftManage()

  const [openDialog, setOpenDialog] = useState(false)

  const handleOnDeleteClick = () => {
    // TODO:
    setOpenDialog(true)
  }
  const handleOnUpdateClick = () => {
    handleModeUpdate(item.id)
  }

  const tableRow = useCallback((label, value, marginBottom) => {
    return (
      <Box className={classes.row} marginBottom={marginBottom}>
        <Typography className={classes.rowLabel}>{label}</Typography>
        <Typography className={classes.rowValue}>{value}</Typography>
      </Box>
    )
  }, [])

  const tableLabel = {
    team_or_individual: isMobile ? t(`streaming_gift_management.team_or_individual_sm`) : t(`streaming_gift_management.team_or_individual`),
    target: isMobile ? t(`streaming_gift_management.target_name_sm`) : t(`streaming_gift_management.target_name`),
    sns_url: isMobile ? t(`streaming_gift_management.sns_url_sm`) : t(`streaming_gift_management.sns_url`),
  }

  const handleCloseConfirmModal = () => {
    setOpenDialog(false)
  }

  const handleConfirmDelete = () => {
    deleteTargetPerson(item.id)
  }

  const deleteModal = () => {
    return (
      <DeleteConfirmModal
        name={item.target_name}
        open={openDialog}
        handleClose={handleCloseConfirmModal}
        handleDelete={handleConfirmDelete}
      />
    )
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography className={classes.label}>{`対象者${index}`}</Typography>
        <Box display="flex" flexDirection="row">
          <ESButton className={classes.editButton} onClick={handleOnUpdateClick}>
            {t('streaming_gift_management.edit')}
          </ESButton>
          <ESButton className={classes.deleteButton} onClick={handleOnDeleteClick}>
            <span className={classes.deleteText}>{t('streaming_gift_management.delete')}</span>
          </ESButton>
        </Box>
      </Box>
      {tableRow(tableLabel.team_or_individual, item.target_value, '8px')}
      {tableRow(tableLabel.target, item.target_name, '8px')}
      {tableRow(tableLabel.sns_url, item.sns_url, '16px')}
      {deleteModal()}
    </Box>
  )
}
const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '15px 24px',
  },
  label: {
    color: Colors.white,
    fontSize: '16px',
    fontWeight: 'bold',
  },
  container: {
    border: `1px solid ${Colors.white_opacity['30']}`,
    borderRadius: '5px',
    backgroundColor: 'black',
    marginBottom: '16px',
    display: 'flex',
    flexDirection: 'column',
    '&:first-child': {
      marginTop: '32px',
    },
  },
  editButton: {
    height: '25px',
    padding: '0px 22px',
    borderRadius: '5px !important',
    border: '1px solid #707070',
  },
  deleteButton: {
    height: '25px',
    padding: '0px 22px',
    borderRadius: '5px !important',
    marginLeft: '10px',
    backgroundColor: `#707070`,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '40px',
    marginRight: '40px',
  },
  rowLabel: {
    width: '162px',
    color: Colors.white_opacity['70'],
    fontSize: '14px',
    marginRight: '10px',
  },
  deleteText: {
    color: 'white',
  },
  rowValue: {
    flex: 1,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
  },
  [theme.breakpoints.down('md')]: {
    rowLabel: {
      width: '127px',
    },
    row: {
      marginLeft: '16px',
      marginRight: '16px',
    },
    header: {
      margin: '15px 16px',
    },
  },
}))
export default GiftItem

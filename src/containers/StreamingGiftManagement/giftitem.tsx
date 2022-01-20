import { Box, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ESButton from '@components/Button'
import DeleteConfirmModal from '@containers/StreamingGiftManagement/deletemodal'

interface Props {
  index: number
}

const GiftItem: React.FC<Props> = ({ index }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [openDialog, setOpenDialog] = useState(false)

  const handleOnDeleteClick = () => {
    // TODO:
    setOpenDialog(true)
  }
  const handleOnEditClick = () => {
    // TODO
  }

  const tableRow = (label, value, marginBottom) =>
    useCallback(() => {
      return (
        <Box className={classes.row} marginBottom={marginBottom}>
          <Typography className={classes.rowLabel}>{label}</Typography>
          <Typography className={classes.rowValue}>{value}</Typography>
        </Box>
      )
    }, [value, isMobile])

  const tableLabel = {
    team_or_individual: isMobile ? t(`streaming_gift_management.team_or_individual_sm`) : t(`streaming_gift_management.team_or_individual`),
    target: isMobile ? t(`streaming_gift_management.target_name_sm`) : t(`streaming_gift_management.target_name`),
    sns_url: isMobile ? t(`streaming_gift_management.sns_url_sm`) : t(`streaming_gift_management.sns_url`),
  }

  const handleCloseConfirmModal = () => {
    setOpenDialog(false)
  }

  const handleConfirmDelete = () => {
    // TODO
  }

  const deleteModal = () => {
    return (
      <DeleteConfirmModal
        name={'かやをかやをかやをかやをか'}
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
          <ESButton className={classes.editButton} onClick={handleOnEditClick}>
            {t('streaming_gift_management.edit')}
          </ESButton>
          <ESButton className={classes.deleteButton} onClick={handleOnDeleteClick}>
            <span className={classes.deleteText}>{t('streaming_gift_management.delete')}</span>
          </ESButton>
        </Box>
      </Box>
      {tableRow(tableLabel.team_or_individual, '個人', '8px')()}
      {tableRow(tableLabel.target, 'かやをかやをかやをかやをか', '8px')()}
      {tableRow(tableLabel.sns_url, 'http://twitter/uni_kayawo', '16px')()}
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

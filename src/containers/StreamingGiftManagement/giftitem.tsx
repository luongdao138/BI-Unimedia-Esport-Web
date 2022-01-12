import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ESButton from '@components/Button'

const GiftItem: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const handleOnDeleteClick = () => {
    // TODO:
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
    }, [value])
  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography className={classes.label}>{'対象者1'}</Typography>
        <Box display="flex" flexDirection="row">
          <ESButton className={classes.editButton} onClick={handleOnEditClick}>
            {t('streaming_gift_management.edit')}
          </ESButton>
          <ESButton className={classes.deleteButton} onClick={handleOnDeleteClick}>
            <span className={classes.deleteText}>{t('streaming_gift_management.delete')}</span>
          </ESButton>
        </Box>
      </Box>
      {tableRow(t('streaming_gift_management.team_or_individual'), '個人', '8px')()}
      {tableRow(
        t('streaming_gift_management.target_name'),
        'かやをかやをかやをかやをかやをかやをかやをかやをかやをかやをかやをかやをかやをかやを',
        '8px'
      )()}
      {tableRow(t('streaming_gift_management.sns_url'), 'http://twitter/uni_kayawo', '16px')()}
    </Box>
  )
}
const useStyles = makeStyles(() => ({
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
    marginTop: '32px',
    display: 'flex',
    flexDirection: 'column',
  },
  editButton: {
    padding: '4.5px 22px',
    borderRadius: '5px !important',
    border: '1px solid #707070',
  },
  deleteButton: {
    padding: '4.5px 22px',
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
    width: '172px',
    color: Colors.white_opacity['70'],
    fontSize: '14px',
  },
  deleteText: {
    color: 'white',
  },
  rowValue: {
    flex: 1,
  },
}))
export default GiftItem

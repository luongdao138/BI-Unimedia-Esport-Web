import { Box, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import React from 'react'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { GiftIndividual } from '@services/liveStream.service'
import ESButton from '@components/Button'

interface Props {
  data: Array<GiftIndividual>
}

const GiftTable: React.FC<Props> = ({ data }) => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation('common')

  const header = () => {
    return (
      <Box className={classes.header}>
        {isMobile && (
          <Box className={classes.headerListIndexColumn}>
            <Typography className={classes.headerLabel}>{'No.'}</Typography>
          </Box>
        )}
        <Box className={classes.headerListNameColumn}>
          <Typography className={classes.headerLabel}>{t('streaming_setting_screen.individual_gift_tab.list_name')}</Typography>
        </Box>
        {!isMobile && (
          <Box className={classes.headerRegNoColumn}>
            <Typography className={classes.headerLabel}>
              {t('streaming_setting_screen.individual_gift_tab.number_of_registration')}
            </Typography>
          </Box>
        )}
      </Box>
    )
  }

  const handleOnRemoveClick = () => {
    // TODO
  }

  const handleOnEditClick = () => {
    // TODO
  }

  const tableRow = (item) => {
    const { index, name, number_of_registration: numberOfRegistration } = item
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
      </Box>
    )
  }
  const tableContent = () => {
    return (
      <Box className={classes.tableContent}>
        {data.map((item) => {
          return tableRow(item)
        })}
      </Box>
    )
  }
  return (
    <Box className={classes.container}>
      {header()}
      {tableContent()}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '24px',
    marginLeft: '48px',
  },
  header: {
    height: '32px',
    backgroundColor: '#000000',
    border: `1px solid ${Colors.white_opacity['30']}`,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    paddingLeft: '84px',
    paddingRight: '214px',
    display: 'flex',
    flexDirection: 'row',
  },
  headerRegNoColumn: {
    width: '72px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerListIndexColumn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '54px',
  },
  headerListNameColumn: {
    flex: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLabel: {
    color: Colors.white,
    fontSize: '12px',
  },
  tableContent: {
    border: `1px solid ${Colors.white_opacity['30']}`,
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    backgroundColor: '#161616',
    padding: '8px 0px',
  },
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
  editButton: {
    border: `1px solid ${Colors.white_opacity['70']}`,
    height: '26px',
  },
  edit: {
    color: Colors.white_opacity['70'],
    fontSize: '14px',
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
  tableText: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      marginLeft: '24px',
      marginRight: '24px',
    },
    indexColumn: {
      width: '54px',
    },
    header: {
      paddingLeft: '0px',
      paddingRight: '162px',
    },
    actionButtonColumn: {
      width: '162px',
    },
  },
}))

export default GiftTable

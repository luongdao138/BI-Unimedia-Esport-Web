import ESChip from '@components/Chip'
import { Box, Theme, Typography, ButtonBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import LoginRequired from '@containers/LoginRequired'
import ESAvatar from '@components/Avatar'
import _ from 'lodash'

const InfoContainer: React.FC<any> = ({ data }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const valueTrue = true

  return (
    <>
      <Box marginTop={2}>
        {!_.isEmpty(data.game_titles) &&
          data.game_titles.map((game) => {
            return <ESChip key={game.id} className={classes.chip} label={game.display_name} />
          })}
        {/* <ESChip className={classes.chip} label={'Ninjala'} style={{ marginRight: 16 }} />
        <ESChip className={classes.chip} label={'対戦'} />
        <ESChip className={classes.chip} label={'交流'} />
        <ESChip className={classes.chip} label={'初心者歓迎'} />
        <ESChip className={classes.chip} label={'内輪向け'} /> */}
      </Box>
      <Box marginTop={2}>
        <Typography>{data.description}</Typography>
      </Box>

      <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={3}>
        <Box className={classes.label}>
          <Typography>{t('common:community.area')}</Typography>
        </Box>
        <Box className={classes.value}>
          <Typography>{data.area_name}</Typography>
        </Box>
      </Box>

      {/* disclosure range */}
      <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
        <Box className={classes.label}>
          <Typography>{t('common:community.disclosure_range')}</Typography>
        </Box>
        <Box className={classes.value}>
          <Typography>公開</Typography>
        </Box>
      </Box>

      {/* approval method */}
      <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
        <Box className={classes.label}>
          <Typography>{t('common:community.approval_method')}</Typography>
        </Box>
        <Box className={classes.value}>
          <Typography>自動承認</Typography>
        </Box>
      </Box>

      {/* caretaker */}
      <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
        <Box className={classes.label}>
          <Typography>{t('common:community.caretaker')}</Typography>
        </Box>
        <Box className={classes.value} flexDirection="column">
          {valueTrue ? (
            <Box key={`3`} display="flex" flexDirection="row" alignItems="center" mt={0}>
              <LoginRequired>
                <ButtonBase>
                  <ESAvatar alt={'わたなべ'} />{' '}
                </ButtonBase>
                <Typography className={classes.breakWord}>{'わたなべ'}</Typography>
              </LoginRequired>
            </Box>
          ) : (
            <Typography>-</Typography>
          )}
        </Box>
      </Box>

      {/* deputy caretaker */}
      <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
        <Box className={classes.label}>
          <Typography>{t('common:community.deputy_caretaker')}</Typography>
        </Box>
        <Box className={classes.value} flexDirection="column">
          {valueTrue ? (
            <>
              <Box key={`1`} display="flex" flexDirection="row" alignItems="center" mt={0}>
                <LoginRequired>
                  <ButtonBase>
                    <ESAvatar alt={'グレちゃん'} />{' '}
                  </ButtonBase>
                  <Typography className={classes.breakWord}>{'グレちゃん'}</Typography>
                </LoginRequired>
              </Box>
              <Box key={`2`} display="flex" flexDirection="row" alignItems="center" mt={1}>
                <LoginRequired>
                  <ButtonBase>
                    <ESAvatar alt={'わたなべ'} />{' '}
                  </ButtonBase>
                  <Typography className={classes.breakWord}>{'わたなべ'}</Typography>
                </LoginRequired>
              </Box>
            </>
          ) : (
            <Typography>-</Typography>
          )}
        </Box>
      </Box>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  label: {
    display: 'flex',
    flex: 2,
  },
  value: {
    display: 'flex',
    flex: 8,
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
  },
  breakWord: {
    wordBreak: 'break-word',
    marginLeft: theme.spacing(1),
  },
  [theme.breakpoints.down('xs')]: {
    label: {
      flex: 3.5,
    },
    value: {
      flex: 6.5,
    },
  },
}))

export default InfoContainer

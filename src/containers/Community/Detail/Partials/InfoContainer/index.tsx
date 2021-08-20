import ESChip from '@components/Chip'
import { Box, Theme, Typography, ButtonBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import LoginRequired from '@containers/LoginRequired'
import ESAvatar from '@components/Avatar'
import _ from 'lodash'
import { CommunityDetail } from '@services/community.service'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'

const InfoContainer: React.FC<{ data: CommunityDetail['attributes'] }> = ({ data }) => {
  const router = useRouter()
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const valueTrue = true

  const toProfile = (user_code) => router.push(`${ESRoutes.PROFILE}/${user_code}`)

  return (
    <>
      <Box marginTop={2}>
        {!_.isEmpty(data.game_titles) &&
          data.game_titles.map((game) => {
            return <ESChip key={game.id} className={classes.chip} label={game.display_name} />
          })}
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
          <Typography>
            {Number(data.open_range) == 0 ? t('common:community_create.public') : t('common:community_create.private')}
          </Typography>
        </Box>
      </Box>

      {/* approval method */}
      <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
        <Box className={classes.label}>
          <Typography>{t('common:community.approval_method')}</Typography>
        </Box>
        <Box className={classes.value}>
          <Typography>
            {Number(data.join_condition) == 0
              ? t('common:community_create.approval_manual')
              : t('common:community_create.approval_automatic')}
          </Typography>
        </Box>
      </Box>

      {/* caretaker */}
      <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
        <Box className={classes.label}>
          <Typography>{t('common:community.caretaker')}</Typography>
        </Box>
        <Box className={classes.value} flexDirection="column">
          {data.admin && (
            <Box display="flex" flexDirection="row" alignItems="center">
              <LoginRequired>
                <ButtonBase onClick={() => toProfile(data.admin.id)}>
                  <ESAvatar alt={data.admin.nickname} src={data.admin.avatar_image_url} />
                </ButtonBase>
                <Typography className={classes.breakWord}>{data.admin.nickname}</Typography>
              </LoginRequired>
            </Box>
          )}
        </Box>
      </Box>

      {/* //TODO when co organizer added to backend */}
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

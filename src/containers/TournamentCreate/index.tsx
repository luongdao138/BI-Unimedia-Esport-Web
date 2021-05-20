import { useState } from 'react'
import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import ESTabs from '@components/Tabs'
import ESTab from '@components/Tab'
import ButtonPrimary from '@components/ButtonPrimary'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { getAuth } from '@store/auth/selectors'
import { useAppSelector } from '@store/hooks'
import useReturnHref from '@utils/hooks/useReturnHref'
import { ESRoutes } from '@constants/route.constants'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'
import { TournamentCreateParams } from '@services/tournament.service'

const TournamentCreate: React.FC = () => {
  const { navigateScreen } = useReturnHref()
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const user = useAppSelector(getAuth)
  const [tab, setTab] = useState(0)
  const [tournamentData, updateData] = useState<TournamentCreateParams>(TournamentHelper.defaultDetails(!user ? 0 : user.id))

  const saveState = (data) => {
    updateData((prevState: TournamentCreateParams) => {
      return { ...prevState, ...data }
    })
  }

  return (
    <>
      <Box pt={7.5} pb={9} className={classes.topContainer}>
        <Box py={2} display="flex" flexDirection="row" alignItems="center">
          <IconButton className={classes.iconButtonBg} onClick={() => navigateScreen(ESRoutes.TOURNAMENTS)}>
            <Icon className="fa fa-arrow-left" fontSize="small" />
          </IconButton>
          <Box pl={2}>
            <Typography variant="h2">{t('common:tournament_create.title')}</Typography>
          </Box>
        </Box>
        <Box className={classes.spacingBorder} />

        <Box pt={8} className={classes.container}>
          <ESTabs value={tab} onChange={(_, v) => setTab(v)} className={classes.tabs}>
            <ESTab className={classes.tabMin} label={t('common:tournament_create.tab1')} value={0} />
            <ESTab className={classes.tabMin} label={t('common:tournament_create.tab2')} value={1} />
            <ESTab className={classes.tabMin} label={t('common:tournament_create.tab3')} value={2} />
            <ESTab className={classes.tabMin} label={t('common:tournament_create.tab4')} value={3} />
          </ESTabs>
        </Box>
        <Box py={4}>
          {tab == 0 && <StepOne data={tournamentData} saveState={saveState} />}
          {tab == 1 && <StepTwo data={tournamentData} saveState={saveState} />}
          {tab == 2 && <StepThree data={tournamentData} saveState={saveState} />}
          {tab == 3 && <StepFour data={tournamentData} saveState={saveState} />}
        </Box>
      </Box>
      <Box className={classes.stickyFooter}>
        <Box className={classes.nextBtnHolder}>
          <Box maxWidth={280} className={classes.buttonContainer}>
            <ButtonPrimary type="submit" round fullWidth>
              {t('common:tournament_create.submit')}
            </ButtonPrimary>
          </Box>
        </Box>
      </Box>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  stickyFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    background: Colors.black,
    borderTop: `1px solid #ffffff30`,
  },
  nextBtnHolder: {
    display: 'flex',
    marginBottom: theme.spacing(11),
    marginTop: theme.spacing(3),
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    margin: '0 auto',
  },
  tabMin: {
    minWidth: 56,
  },
  tabs: {
    borderBottom: `1px solid ${Colors.text[300]}`,
  },
  spacingBorder: {
    borderBottom: `1px solid ${Colors.text[300]}`,
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingTop: theme.spacing(4),
    },
    topContainer: {
      paddingTop: 0,
    },
    spacingBorder: {
      marginLeft: theme.spacing(-3),
      marginRight: theme.spacing(-3),
    },
    tabs: {
      marginLeft: theme.spacing(-3),
      marginRight: theme.spacing(-3),
    },
  },
}))

export default TournamentCreate

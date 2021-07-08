import { makeStyles, Box } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { memo } from 'react'
import ESTabs from '@components/Tabs'
import ESTab from '@components/Tab'
import i18n from '@locales/i18n'

type Props = {
  tab: number
  onTabChange: (value) => void
}

const StepTabs: React.FC<Props> = ({ tab, onTabChange }) => {
  const classes = useStyles()

  return (
    <Box pt={8} className={classes.container}>
      <ESTabs value={tab} onChange={(_, v) => onTabChange(v)} className={classes.tabs}>
        <ESTab className={classes.tabMin} label={i18n.t('common:tournament_create.tab1')} value={0} />
        <ESTab className={classes.tabMin} label={i18n.t('common:tournament_create.tab2')} value={1} />
        <ESTab className={classes.tabMin} label={i18n.t('common:tournament_create.tab3')} value={2} />
        <ESTab className={classes.tabMin} label={i18n.t('common:tournament_create.tab4')} value={3} />
      </ESTabs>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  tabs: {
    borderBottom: `1px solid ${Colors.text[300]}`,
  },
  tabMin: {
    minWidth: 56,
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingTop: theme.spacing(4),
    },
    tabs: {
      marginLeft: theme.spacing(-3),
      marginRight: theme.spacing(-3),
    },
  },
}))

export default memo(StepTabs)

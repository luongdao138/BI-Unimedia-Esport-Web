import { BoxProps, Box, Typography, makeStyles } from '@material-ui/core'
import { TournamentRule } from '@services/arena.service'
import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'

const RuleTitles: Record<TournamentRule, string> = {
  battle_royale: i18n.t('common:arena.rules_title.battle_royale'),
  score_attack: i18n.t('common:arena.rules_title.score_attack'),
  time_attack: i18n.t('common:arena.rules_title.time_attack'),
  single: '',
  double: '',
}

const RuleErrors: Record<TournamentRule, string> = {
  battle_royale: i18n.t('common:arena.rules_title.battle_royale_error'),
  score_attack: i18n.t('common:arena.rules_title.score_attack_error'),
  time_attack: i18n.t('common:arena.rules_title.time_attack_error'),
  single: '',
  double: '',
}

interface RuleHeaderProps extends BoxProps {
  rule: TournamentRule
  showCaution: boolean
  showError: boolean
}

const RuleHeader: React.FC<RuleHeaderProps> = ({ rule, showCaution, showError, ...props }) => {
  const classes = useStyles()

  return (
    <Box {...props}>
      <Typography className={classes.title}>{RuleTitles[rule]}</Typography>
      {showCaution ? (
        <Typography className={classes.title} style={{ paddingTop: 4 }}>
          {i18n.t('common:arena.enter_own_score')}
        </Typography>
      ) : null}
      <Box textAlign="center" pb={3}>
        {showError ? <Typography style={{ color: Colors.secondary, paddingTop: 4 }}>{RuleErrors[rule]}</Typography> : null}
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  title: {
    textAlign: 'center',
    whiteSpace: 'pre-line',
  },
}))

export default RuleHeader

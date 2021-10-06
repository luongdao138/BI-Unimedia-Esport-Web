import { BoxProps, Box, Typography, makeStyles } from '@material-ui/core'
import { TournamentRule } from '@services/arena.service'
import i18n from '@locales/i18n'

const RuleTitles: Record<TournamentRule, string> = {
  battle_royale: i18n.t('common:arena.rules_title.battle_royale'),
  score_attack: i18n.t('common:arena.rules_title.score_attack'),
  time_attack: i18n.t('common:arena.rules_title.time_attack'),
  single: '',
  double: '',
}

interface RuleHeaderProps extends BoxProps {
  rule: TournamentRule
  showCaution: boolean
}

const RuleHeader: React.FC<RuleHeaderProps> = ({ rule, showCaution, ...props }) => {
  const classes = useStyles()

  return (
    <Box {...props}>
      <Typography className={classes.title}>{RuleTitles[rule]}</Typography>
      {showCaution ? (
        <Typography className={classes.title} style={{ paddingTop: 4 }}>
          {i18n.t('common:arena.enter_own_score')}
        </Typography>
      ) : null}
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

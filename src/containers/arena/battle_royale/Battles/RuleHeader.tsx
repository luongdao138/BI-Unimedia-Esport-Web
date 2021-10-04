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
}

const RuleHeader: React.FC<RuleHeaderProps> = ({ rule, ...props }) => {
  const classes = useStyles()

  return (
    <Box {...props}>
      <Typography className={classes.title}>{RuleTitles[rule]}</Typography>
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

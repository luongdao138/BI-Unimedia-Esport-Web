import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import { Colors } from '@theme/colors'
import { AddRounded } from '@material-ui/icons'
import ESChip from '@components/Chip'
import LoginRequired from '@containers/LoginRequired'
import i18n from '@locales/i18n'

import { defaultFilterOptions, loginRequiredFilterOptions } from '@constants/tournament.constants'
import { TournamentFilterOption } from '@services/arena.service'

interface HeaderAreaProps {
  onFilter: (option: string) => void
  toCreate: () => void
  filter: TournamentFilterOption
}

const HeaderArea: React.FC<HeaderAreaProps> = ({ onFilter, toCreate, filter }) => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h2">アリーナ</Typography>
        <LoginRequired>
          <ButtonPrimary round gradient={false} onClick={toCreate} size="small">
            <AddRounded className={classes.addIcon} />
            {i18n.t('common:tournament_create.title')}
          </ButtonPrimary>
        </LoginRequired>
      </div>
      <Grid container className={classes.content}>
        <Box className={classes.filters}>
          {defaultFilterOptions.map((option) => (
            <ESChip
              key={option.type}
              isGameList={true}
              color={option.type === filter ? 'primary' : undefined}
              className={classes.filterChip}
              label={option.label}
              onClick={() => onFilter(option.type)}
            />
          ))}
        </Box>
        <Box className={classes.filtersLoginRequired}>
          {loginRequiredFilterOptions.map((option) => (
            <LoginRequired key={option.type}>
              <ESChip
                key={option.type}
                isGameList={true}
                color={option.type === filter ? 'primary' : undefined}
                className={classes.filterChip}
                label={option.label}
                onClick={() => onFilter(option.type)}
              />
            </LoginRequired>
          ))}
        </Box>
      </Grid>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: Colors.black,
    '& .MuiButtonBase-root.button-primary': {
      padding: '12px 16px',
    },
  },
  filters: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  filtersLoginRequired: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  filterChip: {
    maxWidth: 'none',
    marginBottom: 16,
    marginRight: 16,
  },
  addIcon: {
    position: 'relative',
    left: -8,
  },
  content: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))

export default HeaderArea

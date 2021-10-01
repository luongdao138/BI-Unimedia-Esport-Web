import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import { Colors } from '@theme/colors'
import { AddRounded } from '@material-ui/icons'
import ESChip from '@components/Chip'
import LoginRequired from '@containers/LoginRequired'
import i18n from '@locales/i18n'
import { lobbyFilterOptions } from '@constants/lobby.constants'
import { LobbyFilterItem, LobbyFilterOption } from '@services/lobby.service'

interface HeaderAreaProps {
  onFilter: (option: string) => void
  toCreate: () => void
  filter: LobbyFilterOption
}

const Header: React.FC<HeaderAreaProps> = ({ onFilter, toCreate, filter }) => {
  const classes = useStyles()

  const filterItem = (option: LobbyFilterItem) => (
    <ESChip
      key={option.type}
      isGameList={true}
      color={option.type === filter ? 'primary' : undefined}
      className={classes.filterChip}
      label={option.label}
      onClick={() => onFilter(option.type)}
    />
  )

  const renderFilterItem = (option: LobbyFilterItem) => {
    return option.loginRequired ? (
      <LoginRequired key={option.type}>{filterItem(option)}</LoginRequired>
    ) : (
      <Box key={option.type}>{filterItem(option)}</Box>
    )
  }

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h2">{i18n.t('common:home.lobby')}</Typography>
        <LoginRequired>
          <ButtonPrimary round gradient={false} onClick={toCreate} size="small">
            <AddRounded className={classes.addIcon} />
            {i18n.t('common:lobby_create.title')}
          </ButtonPrimary>
        </LoginRequired>
      </div>
      <Grid container className={classes.filtersContainer}>
        <Box className={classes.filters}>
          {lobbyFilterOptions.filter((o) => !o.loginRequired).map((option) => renderFilterItem(option))}
        </Box>
        <Box className={classes.filters}>{lobbyFilterOptions.filter((o) => o.loginRequired).map((option) => renderFilterItem(option))}</Box>
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
  filterChip: {
    maxWidth: 'none',
    marginBottom: 16,
    marginRight: 16,
  },
  addIcon: {
    position: 'relative',
    left: -8,
  },
  filtersContainer: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))

export default Header

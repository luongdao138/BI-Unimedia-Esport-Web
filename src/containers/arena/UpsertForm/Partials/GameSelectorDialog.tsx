import React, { useState, useEffect, memo } from 'react'
import { Theme, Box, Typography, makeStyles } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { GameTitle } from '@services/game.service'
import { useTranslation } from 'react-i18next'
import GameSelector from '@components/GameSelector'
import ButtonBase from '@material-ui/core/ButtonBase'
import ButtonPrimary from '@components/ButtonPrimary'
import BlankLayout from '@layouts/BlankLayout'
import Icon from '@material-ui/core/Icon'
import ESModal from '@components/Modal'
import _ from 'lodash'
import { FocusContext, FocusContextProvider } from '@utils/hooks/input-focus-context'

type GameTitleItem = GameTitle['attributes']
interface Props {
  values: GameTitleItem[]
  onChange: (games: GameTitleItem[]) => void
  disabled?: boolean
}

const GameSelectorDialog: React.FC<Props> = ({ values, onChange, disabled }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const [open, setOpen] = useState(false)
  const [gameTitles, setGameTitles] = useState(values)

  useEffect(() => {
    if (open === true) {
      setGameTitles(values)
    }
  }, [open])

  const onGameChange = (games: GameTitle['attributes'][]) => {
    setGameTitles(games)
  }

  const onSubmit = () => {
    onChange(gameTitles)
    setOpen(false)
  }

  return (
    <>
      <Box display="flex" alignItems="center" pb={1}>
        <Typography className={classes.labelColor}>{t('common:tournament_create.game')}</Typography>
        <Typography className={classes.required}>{t('common:common.required')}</Typography>
      </Box>
      <ButtonBase
        disabled={disabled}
        onClick={() => setOpen(true)}
        className={`${classes.inputContainer} ${disabled ? classes.disabled : ''}`}
      >
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {_.isEmpty(values) ? (
            <Typography className={classes.hintColor}>{t('common:please_select')}</Typography>
          ) : (
            values.map((item, idx) => (
              <Box paddingRight={1} key={idx}>
                <Typography>{item.display_name}</Typography>
              </Box>
            ))
          )}
        </Box>
        <Icon className={`fa fa-chevron-right ${classes.icon} ${disabled ? classes.disabled : ''}`} fontSize="small" />
      </ButtonBase>

      <ESModal open={open} handleClose={() => setOpen(false)}>
        <FocusContextProvider>
          <BlankLayout>
            <Box pt={7.5} pb={9} className={classes.topContainer}>
              <Box py={2} display="flex" flexDirection="row" alignItems="center">
                <IconButton className={classes.iconButtonBg} onClick={() => setOpen(false)}>
                  <Icon className="fa fa-arrow-left" fontSize="small" />
                </IconButton>
                <Box pl={2}>
                  <Typography variant="h2">{t('common:user_profile.choose_game')}</Typography>
                </Box>
              </Box>

              <Box pt={4} className={classes.container}>
                <GameSelector values={gameTitles} onChange={onGameChange} single />
              </Box>
            </Box>

            <Box className={classes.stickyFooter} />
            <FocusContext.Consumer>
              {({ isFocused }) => (
                <Box className={`${classes.stickyFooter} ${isFocused ? classes.hideOnMobile : ''}`}>
                  <Box className={classes.nextBtnHolder}>
                    <Box maxWidth={280} className={classes.buttonContainer}>
                      <ButtonPrimary type="submit" round fullWidth onClick={onSubmit} disabled={gameTitles.length === 0}>
                        {t('common:tournament_create.decide')}
                      </ButtonPrimary>
                    </Box>
                  </Box>
                </Box>
              )}
            </FocusContext.Consumer>
          </BlankLayout>
        </FocusContextProvider>
      </ESModal>
    </>
  )
}

GameSelectorDialog.defaultProps = {
  disabled: false,
}

export default memo(GameSelectorDialog)

const useStyles = makeStyles((theme: Theme) => ({
  inputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
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
    backgroundColor: Colors.black,
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
  blankSpace: {
    height: 169,
  },
  required: {
    backgroundColor: Colors.primary,
    borderRadius: 2,
    paddingLeft: theme.spacing(1 / 2),
    paddingRight: theme.spacing(1 / 2),
    height: 16,
    fontSize: 10,
    marginLeft: theme.spacing(1),
    color: Colors.white,
  },
  icon: {
    color: Colors.white,
  },
  labelColor: {
    color: Colors.text[200],
  },
  hintColor: {
    color: Colors.text[300],
  },
  [theme.breakpoints.down('sm')]: {
    nextBtnHolder: {
      marginBottom: theme.spacing(5.2),
    },
    container: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: theme.spacing(4),
    },
    topContainer: {
      paddingTop: 0,
    },
    hideOnMobile: {
      display: 'none',
    },
  },
  disabled: {
    color: Colors.white_opacity['30'],
  },
}))

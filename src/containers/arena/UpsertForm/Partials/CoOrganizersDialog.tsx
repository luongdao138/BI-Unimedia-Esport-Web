import React, { useState, useEffect } from 'react'
import { Theme, Box, Typography, makeStyles, DialogContent, Dialog, ButtonBase, Divider } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { Search as SearchIcon } from '@material-ui/icons'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import BlankLayout from '@layouts/BlankLayout'
import _ from 'lodash'
import ButtonPrimary from '@components/ButtonPrimary'
import ESInput from '@components/Input'
import useOrganizerSearch from './useOrganizerSearch'
import { RecommendedUsers } from '@services/arena.service'
import ESAvatar from '@components/Avatar'
import ESLoader from '@components/Loader'
import ESSlider from '@components/Slider'
import InfiniteScroll from 'react-infinite-scroll-component'

interface Props {
  values: RecommendedUsers[]
  onChange: (values: RecommendedUsers[]) => void
}

const CoOrganizersDialog: React.FC<Props> = ({ values, onChange }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const { getRecommendedUsersByName, meta, recommendedUsers, page } = useOrganizerSearch()
  const [selectedUsers, setSelectedUsers] = useState(values)

  useEffect(() => {
    if (open === true) {
      setSelectedUsers(values)
      handleSearch()
    }
  }, [open])

  const onSubmit = () => {
    onChange(selectedUsers)
    setOpen(false)
  }

  const handleChange = (e) => {
    setKeyword(e.target.value)
  }

  const handleSearch = () => {
    getRecommendedUsersByName(keyword, 1)
  }

  const handleCheckbox = (user: RecommendedUsers) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser.id !== user.id))
    } else {
      setSelectedUsers([...selectedUsers, user])
    }
  }

  const loadMore = () => {
    if (page.current_page >= page.total_pages) {
      setHasMore(false)
      return
    }

    getRecommendedUsersByName(keyword, page.current_page + 1)
  }

  const getName = (name: string) => {
    return name.length > 8 ? name.substr(0, 8) + '…' : name
  }

  return (
    <>
      <Box display="flex" alignItems="center" pb={1}>
        <Typography className={classes.labelColor}>{t('common:tournament_create.co_organizer')}</Typography>
      </Box>
      <ButtonBase onClick={() => setOpen(true)} className={classes.inputContainer}>
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {_.isEmpty(values) ? (
            <Typography className={classes.hintColor}>{t('common:common.not_selected')}</Typography>
          ) : (
            values.map((item) => (
              <Box paddingRight={1} key={item.id}>
                <Typography>{item.attributes.nickname}</Typography>
              </Box>
            ))
          )}
        </Box>
        <Icon className={`fa fa-chevron-right ${classes.icon}`} fontSize="small" />
      </ButtonBase>

      <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
        <DialogContent id="scrollableDiv" className={classes.noPadding}>
          <Box className={classes.dialog}>
            <BlankLayout>
              <Box pt={7.5} pb={9} className={classes.topContainer}>
                <Box py={2} display="flex" flexDirection="row" alignItems="center">
                  <IconButton className={classes.iconButtonBg} onClick={() => setOpen(false)}>
                    <Icon className="fa fa-arrow-left" fontSize="small" />
                  </IconButton>
                  <Box pl={2}>
                    <Typography variant="h2">{t('common:tournament_create.co_orgonizer')}</Typography>
                  </Box>
                </Box>

                <Box>
                  <Box pt={8} px={4} className={classes.container}>
                    <ESInput
                      value={keyword}
                      onChange={handleChange}
                      fullWidth
                      endAdornment={
                        <Box marginY="5px" paddingLeft="4px" borderLeft={`2px solid ${Colors.grey[100]}`}>
                          <IconButton aria-label="back" size="small" onClick={handleSearch}>
                            <SearchIcon />
                          </IconButton>
                        </Box>
                      }
                    />
                    <Box pt={1} pb={4}>
                      <Typography variant="body2" className={classes.hint}>
                        {t('common:tournament_create.user_hint')}
                      </Typography>
                    </Box>
                  </Box>

                  {meta.loaded && recommendedUsers.length === 0 && (
                    <Box pt={12} textAlign="center">
                      <Typography color="textSecondary">{t('common:tournament_create.not_found')}</Typography>
                    </Box>
                  )}

                  <InfiniteScroll
                    className={classes.container}
                    dataLength={recommendedUsers.length}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={
                      meta.pending && (
                        <Box textAlign="center">
                          <ESLoader />
                        </Box>
                      )
                    }
                    scrollableTarget="scrollableDiv"
                  >
                    {recommendedUsers
                      .filter((u) => !selectedUsers.map((s) => s.id).includes(u.id))
                      .map((user, idx) => (
                        <ButtonBase key={idx} className={classes.itemContainer} onClick={() => handleCheckbox(user)}>
                          <Box display="flex" flexDirection="row" py={2}>
                            <ESAvatar className={classes.avatar} src={user.attributes.avatar} />
                            <Box display="flex" flexDirection="column" pl={1} justifyContent="flex-start" alignItems="flex-start">
                              <Typography className={classes.oneLine} variant="h2">
                                {user.attributes.nickname}
                              </Typography>
                              <Typography variant="body2" className={classes.userCode}>
                                @{user.attributes.user_code}
                              </Typography>
                            </Box>
                          </Box>
                        </ButtonBase>
                      ))}
                  </InfiniteScroll>
                </Box>

                <Box className={classes.blankSpace}></Box>

                <Box className={classes.stickyFooter}>
                  {selectedUsers.length > 0 && (
                    <BlankLayout>
                      <ESSlider
                        navigation={false}
                        items={selectedUsers.map((user, i) => (
                          <Box className={classes.innerWrap} key={i}>
                            <ESAvatar className={classes.avatar} src={user.attributes.avatar} />
                            <IconButton className={classes.remove} onClick={() => handleCheckbox(user)} disableRipple>
                              <Icon className={`fa fa-times ${classes.iconSmall}`} fontSize="small" />
                            </IconButton>
                            <Box color={Colors.white} pt={2}>
                              <Typography variant="body2">{getName(user.attributes.nickname)}</Typography>
                            </Box>
                          </Box>
                        ))}
                      />
                    </BlankLayout>
                  )}
                  <Divider />
                  <Box className={classes.nextBtnHolder}>
                    <Box maxWidth={280} className={classes.buttonContainer}>
                      <ButtonPrimary type="submit" round fullWidth onClick={onSubmit} disabled={selectedUsers.length === 0}>
                        {t('common:tournament_create.decide')}
                      </ButtonPrimary>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </BlankLayout>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  dialog: {
    backgroundColor: Colors.grey[100],
    minHeight: '100vh',
  },
  itemContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  noPadding: {
    padding: 0,
  },
  oneLine: {
    wordBreak: 'break-word',
  },
  innerWrap: {
    width: 98,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    position: 'relative',
  },
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
  iconSmall: {
    fontSize: 12,
  },
  remove: {
    position: 'absolute',
    right: 10,
    top: -4,
    padding: 6,
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
    '&:hover': {
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
  userCode: {
    color: Colors.text[200],
    wordBreak: 'break-word',
  },
  blankSpace: {
    height: 169,
  },
  hint: {
    color: Colors.text[200],
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
    container: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: theme.spacing(4),
    },
    topContainer: {
      paddingTop: 0,
    },
    nextBtnHolder: {
      marginBottom: theme.spacing(3),
    },
  },
}))

export default CoOrganizersDialog

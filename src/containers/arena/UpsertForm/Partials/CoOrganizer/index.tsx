import React, { useState, useEffect } from 'react'
import { Box, makeStyles, DialogContent, Typography, Theme, IconButton, Badge, Icon, Container, useTheme } from '@material-ui/core'
import ESDialog from '@components/Dialog'
import ESInput from '@components/Input'
import Avatar from '@components/Avatar'
import ButtonPrimary from '@components/ButtonPrimary'
import { Colors } from '@theme/colors'
import MemberItem from './MemberItem'
import _ from 'lodash'
import ESLoader from '@components/Loader'
import i18n from '@locales/i18n'
import { useRect } from '@utils/hooks/useRect'
import ESSlider from '@components/Slider'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { RecommendedUsers } from '@services/arena.service'
import useOrganizerSearch from '../useOrganizerSearch'
import InfiniteScroll from 'react-infinite-scroll-component'

export interface Props {
  open: boolean
  values: RecommendedUsers[]
  onSubmit: (values) => void
  hide: () => void
}

const contentRef = React.createRef<HTMLDivElement>()

const CoOrganizer: React.FC<Props> = ({ open, values, onSubmit, hide }) => {
  const [selectedList, setSelectedList] = useState([] as RecommendedUsers[])
  const theme = useTheme()
  const { getRecommendedUsersByName, meta, recommendedUsers, page } = useOrganizerSearch()
  const [keyword, setKeyword] = useState('')
  const [bottomGap, setBottomGap] = useState<number>(0)
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const height = matches ? bottomGap + 100 : bottomGap + 68
  const classes = useStyles()
  const contentRect = useRect(contentRef)

  useEffect(() => {
    if (open) {
      setSelectedList(values)
      getRecommendedUsersByName(keyword, 1)
    }
  }, [open])

  useEffect(() => {
    setBottomGap(contentRect?.height)
  }, [contentRect?.height])

  const onSearch = () => {
    getRecommendedUsersByName(keyword, 1)
  }

  const handleChange = (event) => {
    setKeyword(event.target.value)
  }

  const handleSubmit = () => {
    onSubmit(selectedList)
    hide()
  }

  const onAdd = (data: RecommendedUsers) => {
    setSelectedList((state) => [...state, data])
  }

  const removeFromList = (id: string) => {
    setSelectedList(_.filter(selectedList, (s) => s.id != id))
  }

  const loadMore = () => {
    getRecommendedUsersByName(keyword, page.current_page + 1)
  }

  const renderLoader = () => {
    if (meta.pending) {
      return (
        <Box height={'100%'} width={'100%'} display="flex" justifyContent="center" alignItems="center">
          <Box className={classes.loaderBox}>
            <ESLoader />
          </Box>
        </Box>
      )
    }
    return null
  }

  const renderFooter = () => (
    <div className={classes.stickyFooter} ref={contentRef}>
      <Box className={classes.bottomSection}>
        <Container maxWidth="md" className={classes.horizantalScroller}>
          <Box className={classes.selectedAvatars}>
            <ESSlider
              containerClass={classes.slider}
              slidesPerView={'auto'}
              navigation={false}
              items={selectedList.map((item, index) => (
                <Box className={classes.item} key={index}>
                  <Badge
                    className={classes.user}
                    key={index}
                    overlap="circle"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    badgeContent={
                      <>
                        <IconButton onClick={() => removeFromList(item.id)} disableRipple className={classes.closeBtn}>
                          <Icon className={`fa fa-times ${classes.closeIcon}`} />
                        </IconButton>
                      </>
                    }
                  >
                    <Avatar key={item.id} src={item.attributes.avatar} alt={item.attributes.nickname} />
                  </Badge>
                  <Box className={classes.nameHolder}>
                    <Typography variant="body2" noWrap={true}>
                      {item.attributes.nickname}
                    </Typography>
                  </Box>
                </Box>
              ))}
            />
          </Box>
        </Container>
      </Box>
      <Box maxWidth={280} className={classes.buttonBottom}>
        <ButtonPrimary type="submit" disabled={_.isEmpty(selectedList)} round fullWidth onClick={handleSubmit}>
          {i18n.t('common:tournament_create.decide')}
        </ButtonPrimary>
      </Box>
    </div>
  )

  const renderItems = () => {
    const selectedUserIds = selectedList.map((user) => user.id)
    return recommendedUsers.map((user) => (
      <MemberItem key={user.id} item={user} onAdd={onAdd} disabled={selectedUserIds.includes(user.id)} />
    ))
  }

  return (
    <Box className={classes.container}>
      <ESDialog
        open={open}
        title={i18n.t('common:tournament_create.choose_co_organizer')}
        handleClose={() => hide()}
        bkColor="rgba(0,0,0,0.8)"
        alignTop
      >
        <DialogContent className={classes.dialogContentWrap} style={{ height: `calc(100vh - ${height}px)` }}>
          <Box className={classes.inputHolder}>
            <ESInput
              placeholder={i18n.t('common:common.username')}
              value={keyword}
              fullWidth
              onChange={handleChange}
              endAdornment={
                <IconButton onClick={onSearch}>
                  <Icon className={`fa fa-search ${classes.icon}`} />
                </IconButton>
              }
            />
            <Box pt={1} />
            <Typography variant="caption">{i18n.t('common:tournament_create.user_hint')}</Typography>
          </Box>
          {renderLoader()}
          {meta.loaded && recommendedUsers.length === 0 && (
            <Box pt={12} textAlign="center">
              <Typography color="textSecondary">{i18n.t('common:tournament_create.not_found')}</Typography>
            </Box>
          )}
          {open ? (
            <div id="scrollableDiv" className={`${classes.scroll} ${classes.list}`}>
              <InfiniteScroll
                dataLength={recommendedUsers.length}
                scrollableTarget="scrollableDiv"
                scrollThreshold={0.99}
                style={{ overflow: 'hidden' }}
                next={loadMore}
                hasMore={true}
                loader={
                  meta.pending && (
                    <Box textAlign="center">
                      <ESLoader />
                    </Box>
                  )
                }
              >
                {renderItems()}
              </InfiniteScroll>
            </div>
          ) : null}

          {renderFooter()}
        </DialogContent>
      </ESDialog>
    </Box>
  )
}

CoOrganizer.defaultProps = {}

const useStyles = makeStyles((theme: Theme) => ({
  dialogContentWrap: {
    padding: 0,
    position: 'relative',
    paddingTop: '100px',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    overflow: 'hidden',
  },
  inputHolder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    flexDirection: 'column',
    paddingBottom: 30,
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  item: {
    width: '100%',
    paddingLeft: 5,
    paddingRight: 5,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  nameHolder: {
    width: '100%',
    textAlign: 'center',
  },
  slider: {
    marginTop: 0,
    '& .swiper-container': {
      padding: '0 !important',
    },
  },
  container: {},
  disableScroll: {},
  horizantalScroller: {
    width: '100%',
    padding: 0,
  },
  user: {
    marginRight: 5,
    marginLeft: 5,
    marginTop: 20,
    '&:first-child': {
      marginLeft: 0,
    },
  },
  nameInfoMsg: {
    textAlign: 'center',
  },
  loaderCenter: {
    width: '100%',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  closeBtn: {
    background: 'rgba(77,77,77, 0.8)',
    padding: 8,
    '&:hover': {
      background: 'rgba(77,77,77, 0.8)',
    },
  },
  closeIcon: {
    fontSize: 12,
  },
  icon: {
    fontSize: 14,
  },
  list: {
    overflow: 'auto',
    overflowX: 'hidden',
    height: '100%',
    paddingBottom: 30,
  },
  scroll: {
    scrollbarColor: '#222 transparent',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 1,
      padding: 2,
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      background: 'rgba(0,0,0,0.5)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#222',
      borderRadius: 6,
    },
  },
  stickyFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    background: Colors.black,
    borderTop: `1px solid`,
    borderTopColor: Colors.text['300'],
    height: 'auto',
  },
  selectedAvatars: {
    width: '100%',
  },
  bottomSection: {},
  buttonBottom: {
    margin: 'auto',
    width: theme.spacing(35),
    minWidth: theme.spacing(18),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(11),
  },
  [theme.breakpoints.down('md')]: {},
  [theme.breakpoints.down('sm')]: {
    dialogContentWrap: {
      padding: '0px 16px',
      paddingTop: '100px !important',
    },
    inputHolder: {
      padding: '0 16px',
    },
    buttonBottom: {
      margin: 'auto',
      width: theme.spacing(35),
      minWidth: theme.spacing(18),
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(5),
    },
  },
}))

export default CoOrganizer

import React, { useState, useEffect, memo } from 'react'
import { Theme, Box, Typography, makeStyles, Container, List } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import ButtonBase from '@material-ui/core/ButtonBase'
import ButtonPrimary from '@components/ButtonPrimary'
import BlankLayout from '@layouts/BlankLayout'
import Icon from '@material-ui/core/Icon'
import ESModal from '@components/Modal'
import ESChip from '@components/Chip'
import _ from 'lodash'
import useCommunityCreate from '../useCommunityCreate'
import { CommunityFeature } from '@services/community.service'

interface Props {
  values: CommunityFeature[]
  onChange: (communityFeatures: CommunityFeature[]) => void
  disabled?: boolean
}

const TagSelectorDialog: React.FC<Props> = ({ values, onChange, disabled }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const [open, setOpen] = useState(false)
  const [categoryTitles, setCategoryTitles] = useState<CommunityFeature[]>(values)
  const { getCommunityFeaturesMeta, communityFeatures } = useCommunityCreate()

  useEffect(() => {
    if (open === true) {
      setCategoryTitles(categoryTitles)
    }
  }, [open])

  const onSubmit = () => {
    onChange(categoryTitles)
    setOpen(false)
  }
  const checkIsSelected = (id: number) => categoryTitles.some((g) => Number(g.id) === id)

  const handleSelect = (feature: CommunityFeature) => {
    const selectedId = Number(feature.id)
    if (checkIsSelected(selectedId)) {
      setCategoryTitles(categoryTitles.filter((feature) => Number(feature.id) !== selectedId))
    } else {
      setCategoryTitles([feature, ...categoryTitles])
    }
  }

  return (
    <>
      <Box display="flex" alignItems="center" pb={1}>
        <Typography className={classes.labelColor}>{t('common:community_create.tag')}</Typography>
      </Box>
      <ButtonBase
        disabled={disabled}
        onClick={() => {
          setOpen(true)
        }}
        className={classes.inputContainer}
      >
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {_.isEmpty(values) ? (
            <Typography className={classes.hintColor}>{t('common:common.not_selected')}</Typography>
          ) : (
            values.map((feature, idx) => <ESChip key={idx} isGameList={true} className={classes.chip} label={feature.attributes.feature} />)
          )}
        </Box>
        <Icon className={`fa fa-chevron-right ${classes.icon}`} fontSize="small" />
      </ButtonBase>

      <ESModal open={open} handleClose={() => setOpen(false)}>
        <BlankLayout>
          <Box pt={7.5} pb={9} className={classes.topContainer}>
            <Box py={2} display="flex" flexDirection="row" alignItems="center">
              <IconButton className={classes.iconButtonBg} onClick={() => setOpen(false)}>
                <Icon className="fa fa-arrow-left" fontSize="small" />
              </IconButton>
              <Box pl={2}>
                <Typography variant="h2">{t('common:community_create.choose_tag')}</Typography>
              </Box>
            </Box>

            <Box pt={8} className={classes.container}>
              <>
                {getCommunityFeaturesMeta.loaded && !getCommunityFeaturesMeta.pending && communityFeatures.length > 0 && (
                  <Container maxWidth="md" className={classes.listContainer}>
                    <List>
                      {communityFeatures.map((g, idx) => (
                        <ESChip
                          key={idx}
                          className={classes.chip}
                          label={g.attributes.feature}
                          onClick={() => handleSelect(g)}
                          color={checkIsSelected(Number(g.id)) ? 'primary' : 'default'}
                          isGameList={true}
                        />
                      ))}
                    </List>
                  </Container>
                )}
              </>
            </Box>
          </Box>

          <Box className={classes.blankSpace} />

          <Box className={classes.stickyFooter}>
            <Box className={classes.nextBtnHolder}>
              <Box maxWidth={280} className={classes.buttonContainer}>
                <ButtonPrimary type="submit" round fullWidth onClick={onSubmit}>
                  {t('common:community_create.decide')}
                </ButtonPrimary>
              </Box>
            </Box>
          </Box>
        </BlankLayout>
      </ESModal>
    </>
  )
}

TagSelectorDialog.defaultProps = {
  disabled: false,
}

export default memo(TagSelectorDialog)

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
  },
  chip: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

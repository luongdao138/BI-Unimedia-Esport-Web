import { Box, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ESLabel from '@components/Label'
import { useFormik } from 'formik'
import ESCheckboxBig from '@components/CheckboxBig'
import ButtonPrimary from '@components/ButtonPrimary'
import ESInput from '@components/Input'
import ESSwitchIOS from '@components/Switch'
import ESButton from '@components/Button'

interface Step2Props {
  step: number
  selectedPoint: number
  cards: Array<any>
  onNext: (step: number) => void
  deleteCard: (card: string) => void
}

const Step2: React.FC<Step2Props> = ({ deleteCard, cards, step, onNext, selectedPoint }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  const formik = useFormik({
    initialValues: [],
    // validationSchema: validationLiveSettingsScheme(),
    enableReinitialize: true,
    onSubmit: () => {
      //TODO: smt
    },
  })

  const onClickNext = () => {
    onNext(step + 1)
  }

  return (
    <Box>
      <Box className={classes.title}>
        <ESLabel label={t('purchase_point_tab.purchase_goods')} />
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box className={classes.container}>
          <Box className={classes.wrap_point}>
            <Typography className={classes.point}>{selectedPoint}</Typography>
            <Typography className={classes.exe_point}>{t('common.eXe_points')}</Typography>
          </Box>
          <Box className={classes.wrap_money}>
            <Typography className={classes.money}>
              {selectedPoint}
              {t('common.money_included_tax')}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.title}>
          <ESLabel label={t('purchase_history.payment_method')} />
        </Box>
        <Box className={classes.card_info_wrap}>
          <Box className={classes.card_wrap + ' ' + classes.first_card_wrap}>
            <Box className={classes.card_info_title}>{t('purchase_point_tab.card_info_title')}</Box>
            <Box className={classes.card_info_container}>
              <Box>
                <ESInput
                  id="card_name"
                  name="card_name"
                  required={true}
                  value=""
                  placeholder={t('purchase_point_tab.card_name_placeholder')}
                  labelPrimary={t('purchase_point_tab.card_name')}
                  fullWidth
                  rows={8}
                  readOnly={true}
                  size="big"
                />
              </Box>
              <Box pt={1}>
                <ESInput
                  id="card_number"
                  name="card_number"
                  required={true}
                  value=""
                  placeholder={t('purchase_point_tab.card_number_placeholder')}
                  labelPrimary={t('purchase_point_tab.card_number')}
                  fullWidth
                  rows={8}
                  readOnly={true}
                  size="big"
                />
              </Box>
              <Box pt={1}>
                <ESInput
                  id="card_expire_date"
                  name="card_expire_date"
                  required={true}
                  value=""
                  placeholder={t('purchase_point_tab.card_expire_date_placeholder')}
                  labelPrimary={t('purchase_point_tab.card_expire_date')}
                  fullWidth
                  rows={8}
                  readOnly={true}
                  size="big"
                />
              </Box>
              <Box pt={1}>
                <ESInput
                  id="card_cvc"
                  name="card_cvc"
                  required={true}
                  value=""
                  placeholder=""
                  labelPrimary={t('purchase_point_tab.card_cvc')}
                  fullWidth
                  rows={8}
                  readOnly={true}
                  size="big"
                />
              </Box>
              <Box className={classes.toggle} pt={2}>
                <ESSwitchIOS
                  key={'register_toggle_name'}
                  handleChange={() => {
                    return ''
                  }}
                  name={'register_toggle_name'}
                  checked={false}
                />
                <Box className={classes.toggle_name}>{t('purchase_point_tab.register_toggle_name')}</Box>
              </Box>
            </Box>
          </Box>
          <Box className={classes.card_wrap}>
            <Box className={classes.card_info_title}>{t('purchase_point_tab.card_title')}</Box>
            <Box className={classes.card_info_container + ' ' + classes.second_card_info_container}>
              {cards.map((card, key) => {
                return (
                  <>
                    <Box className={classes.wrap_all_card}>
                      <ESCheckboxBig
                        checked={false}
                        onChange={() => {
                          formik.handleChange
                        }}
                        name="use_ticket"
                      />
                      <Box>
                        <Box className={classes.wrap_card_number}>{card.number}</Box>
                        <Box className={classes.wrap_money}>
                          <img src="/images/visa.svg" />
                        </Box>
                      </Box>
                    </Box>
                    <Box textAlign="right">
                      <Box
                        className={classes.title_delete_card + ' ' + (key + 1 === cards.length ? classes.last_title_delete_card : '')}
                        onClick={() => {
                          deleteCard('xxxx xxxx xxxx 4256')
                        }}
                      >
                        {t('purchase_point_tab.title_delete_card')}
                      </Box>
                    </Box>
                  </>
                )
              })}
              {cards.length === 0 ? (
                <Box className={classes.wrap_all_card + ' ' + classes.wrap_no_card}>{t('purchase_point_tab.no_card')}</Box>
              ) : (
                <Box textAlign="center" pb={1}>
                  <ESButton className={classes.clear_section_btn} variant="outlined" round fullWidth size="large">
                    {t('purchase_point_tab.clear_section')}
                  </ESButton>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </form>
      <Box pt={2} justifyContent="center" display="flex" className={classes.actionButton}>
        <ButtonPrimary type="submit" round fullWidth onClick={onClickNext}>
          {t('purchase_point_tab.btn_buy')}
        </ButtonPrimary>
      </Box>
    </Box>
  )
}

export default Step2

const useStyles = makeStyles(() => ({
  title: {
    // paddingLeft: 24,
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 28,
    color: Colors.white_opacity['70'],
    paddingBottom: 16,
  },
  container: {
    height: 38,
    // maxWidth: '100%',
    width: 366,
    backgroundColor: Colors.black,
    display: 'flex',
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.white_opacity['30'],
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2),
    // paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(1),
    // marginBottom: theme.spacing(1),
    alignItems: 'center',
    /* font-size: 12px; */
    color: '#4D4D4D',
    padding: '0 9px 0 0',
  },
  actionButton: {
    '& .MuiButtonBase-root.button-primary.full-width': {
      width: 220,
    },
  },
  wrap_point: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  point: {
    paddingLeft: 16,
    fontSize: 18,
    color: Colors.white_opacity['70'],
    width: 110,
  },
  exe_point: {
    fontSize: 12,
  },
  wrap_money: {},
  money: {
    fontSize: 12,
  },
  card_info_title: {
    color: Colors.white_opacity[30],
    paddingBottom: '16px',
  },
  card_info_wrap: {
    display: 'flex',
    fontSize: '14px',
    flex: 1,
  },
  card_wrap: {
    width: '50%',
  },
  first_card_wrap: {
    paddingRight: 28,
  },
  card_info_container: {
    borderRadius: 4,
    background: '#4D4D4D',
    padding: '16px 40px 16px 16px',
  },
  toggle: {
    display: 'flex',
  },
  toggle_name: {
    fontSize: '12px',
    color: Colors.white,
    paddingLeft: 16,
  },
  second_card_info_container: {
    padding: '16px',
  },
  wrap_all_card: {
    borderRadius: 4,
    background: '#000',
    display: 'flex',
    padding: '24px 0 16px 16px',
    height: 96,
    alignItems: 'flex-start',
    '& .MuiCheckbox-root': {
      marginRight: 27,
      marginTop: 15,
    },
    '& .MuiIconButton-label span': {
      borderRadius: '50%',
    },
  },
  wrap_no_card: {
    padding: 16,
    height: '100%',
  },
  wrap_card_number: {
    paddingBottom: 12,
    fontSize: '14px',
    color: Colors.white_opacity[30],
  },
  title_delete_card: {
    fontSize: '10px',
    color: '#FF4786',
    marginTop: 8,
    marginBottom: 22,
    cursor: 'pointer',
    display: 'inline-block',
  },
  last_title_delete_card: {
    marginBottom: 17,
  },
  clear_section_btn: {
    width: 108,
    height: 36,
    fontSize: '14px',
    padding: 0,
    color: Colors.white,
    borderColor: Colors.white,
  },
}))

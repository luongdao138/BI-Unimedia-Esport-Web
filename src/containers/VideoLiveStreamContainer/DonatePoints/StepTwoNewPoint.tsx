import { Box, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ESLabel from '@components/Label'
import { useFormik } from 'formik'
import ESCheckboxBig from '@components/CheckboxBig'
import ButtonPrimary from '@components/ButtonPrimary'

interface StepTwoNewPointProps {
  // step: number
  // onNext: (step: number) => void
  // setSelectedPoint: (point: number) => void
  setTypeStepTwo: (value: string) => void
}

const StepTwoNewPoint: React.FC<StepTwoNewPointProps> = ({ setTypeStepTwo }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const points = [500, 1000, 2000, 3000, 5000, 10000]

  const formik = useFormik({
    initialValues: [],
    // validationSchema: validationLiveSettingsScheme(),
    enableReinitialize: true,
    onSubmit: () => {
      //TODO: smt
    },
  })

  const onClickNext = () => {
    // setSelectedPoint(5000)
    // onNext(step + 1)
    setTypeStepTwo('missing_point')
  }

  return (
    <Box>
      <Box className={classes.title}>
        <ESLabel label={t('purchase_point_tab.point_number_select')} required={true} />
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box className={classes.wrap_all_points}>
          {points.map((point_value) => {
            return (
              <Box className={classes.wrap_one_point} key={point_value}>
                <ESCheckboxBig
                  checked={false}
                  onChange={() => {
                    formik.handleChange
                  }}
                  name="use_ticket"
                />
                <Box className={classes.container}>
                  <Box className={classes.wrap_point}>
                    <Typography className={classes.point}>{point_value}</Typography>
                    <Typography className={classes.exe_point}>{t('common.eXe_points')}</Typography>
                  </Box>
                  <Box className={classes.wrap_money}>
                    <Typography className={classes.money}>
                      {point_value}
                      {t('common.money_included_tax')}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Box>
      </form>
      <Box pb={4} justifyContent="center" display="flex" className={classes.actionButton}>
        <ButtonPrimary type="submit" round fullWidth onClick={onClickNext}>
          {t('purchase_point_tab.enter_payment_info')}
        </ButtonPrimary>
      </Box>
    </Box>
  )
}

export default StepTwoNewPoint

const useStyles = makeStyles((theme) => ({
  wrap_all_points: {
    padding: '28px 32px 67px 32px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  title: {
    // paddingLeft: 24,
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 28,
    color: Colors.white_opacity['70'],
  },
  container: {
    height: 38,
    // maxWidth: '100%',
    width: 'calc(100% - 34px)',
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
  wrap_point: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  point: {
    paddingLeft: 16,
    fontSize: 18,
    color: Colors.white_opacity['70'],
    width: 76,
  },
  exe_point: {
    fontSize: 12,
  },
  wrap_money: {},
  money: {
    fontSize: 12,
  },
  wrap_one_point: {
    width: '45%',
    display: 'flex',
    paddingBottom: 16,
    '& .MuiCheckbox-root': {
      marginRight: 18,
    },
    '& .MuiIconButton-label span': {
      borderRadius: '50%',
    },
  },
  actionButton: {
    '& .MuiButtonBase-root.button-primary.full-width': {
      width: 220,
    },
  },
  [theme.breakpoints.down('lg')]: {
    wrap_all_points: {
      padding: '32px 8px 40px 8px',
    },
    wrap_one_point: {
      width: '47%',
    },
  },
  [theme.breakpoints.down('sm')]: {
    wrap_all_points: {
      padding: '32px 0 30px 0',
    },
    wrap_one_point: {
      width: '100%',
    },
  },
}))

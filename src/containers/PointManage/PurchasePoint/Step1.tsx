import { Box, Typography, makeStyles, withStyles } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ESLabel from '@components/Label'
import { useFormik } from 'formik'
import ButtonPrimary from '@components/ButtonPrimary'
import Radio from '@material-ui/core/Radio'
import { RadioProps } from '@material-ui/core/Radio'
import { POINTS } from '@constants/common.constants'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { calValueFromTax } from '@utils/helpers/CommonHelper'
import usePurchasePointData from './usePurchasePointData'
import ESLoader from '@components/FullScreenLoader'

interface Step1Props {
  step: number
  onNext: (step: number) => void
  setSelectedPoint: (point: any) => void
}

const Step1: React.FC<Step1Props> = ({ step, onNext, setSelectedPoint }) => {
  const [selectedPoint, changeSelectedPoint] = React.useState<any>('')

  const { 
    metaSavedCardsMeta
  } = usePurchasePointData()

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
    setSelectedPoint(selectedPoint)
    onNext(step + 1)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeSelectedPoint(Number(event.target.value))
  }

  return (
    <Box>
      {(metaSavedCardsMeta.pending) && <ESLoader open={metaSavedCardsMeta.pending} />}
      <Box className={classes.title}>
        <ESLabel label={t('purchase_point_tab.point_number_select')} required={true} />
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box className={classes.wrap_all_points}>
          {POINTS.map((point_value) => {
            return (
              <Box className={classes.wrap_one_point} key={point_value}>
                <Box className={classes.wrap_check_box}>
                  <CustomRadio
                    checked={selectedPoint === point_value}
                    onChange={handleChange}
                    value={point_value}
                    name="radio-button"
                    size="small"
                  />
                </Box>
                <Box className={classes.container}>
                  <Box className={classes.wrap_point}>
                    <Typography className={classes.point}>{FormatHelper.currencyFormat(point_value.toString())}</Typography>
                    <Typography className={classes.exe_point}>{t('common.eXe_points')}</Typography>
                  </Box>
                  <Box className={classes.wrap_money}>
                    <Typography className={classes.money}>
                      {FormatHelper.currencyFormat(calValueFromTax(point_value).toString())}
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
        <ButtonPrimary type="submit" round fullWidth onClick={onClickNext} disabled={!selectedPoint}>
          {t('purchase_point_tab.enter_payment_info')}
        </ButtonPrimary>
      </Box>
    </Box>
  )
}

export default Step1

const CustomRadio = withStyles({
  root: {
    color: Colors.white_opacity[30],
    background: '#212121',
    padding: 0,
    '&$checked': {
      color: Colors.primary,
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />)

const useStyles = makeStyles((theme) => ({
  wrap_all_points: {
    padding: '28px 32px 67px 32px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 28,
    color: Colors.white_opacity['70'],
  },
  container: {
    height: 38,
    width: 'calc(100% - 34px)',
    backgroundColor: Colors.black,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.white_opacity['30'],
    alignItems: 'center',
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
  wrap_check_box: {
    width: '34px',
    display: 'flex',
    alignItems: 'center',
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

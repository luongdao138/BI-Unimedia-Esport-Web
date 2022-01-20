import React, { useEffect, useState } from 'react'
import HeaderWithButton from '@components/HeaderWithButton'
import { Box, makeStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
// import { useMediaQuery, useTheme } from '@material-ui/core'
// import ESTooltip from '@components/ESTooltip'
// import { FormatHelper } from '@utils/helpers/FormatHelper'
// import { Pagination } from '@material-ui/lab'
// import { Colors } from '@theme/colors'
import Steps from './Steps'
import useLiveSetting from '@containers/StreamingSettingContainer/useLiveSetting'
import { ArchiveDetailFormType, getInitialArchiveDetailValues, validationArchiveDetailScheme } from './ArchiveDetailFormData'
import { useFormik } from 'formik'
import useArchivedList from '@containers/ArchivedListContainer/useArchivedList'

const ArchiveDetailContainer: React.FC = () => {
  const [step, setStep] = useState(1)
  const { t } = useTranslation('common')
  const classes = useStyles()
  // const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down(475))

  const { categoryData, getCategory } = useLiveSetting()
  const { videoArchivedDetail } = useArchivedList()

  const initialValues = getInitialArchiveDetailValues(videoArchivedDetail)
  const formikArchiveDetail = useFormik<ArchiveDetailFormType>({
    initialValues: initialValues,
    validationSchema: validationArchiveDetailScheme(),
    enableReinitialize: true,
    validateOnBlur: false,
    onSubmit: () => {
      //TODO: smt
    },
  })

  const onChangeStep = (step: number): void => {
    // console.log('click next step', step, stateChannelMedia)
    setStep(step)
    // setShare(isShare)
    // setPost(post)
    // if (step === 3) {
    //   setModal(true)
    // }
  }

  useEffect(() => {
    getCategory()
  }, [])

  return (
    <div>
      <HeaderWithButton title={t('archive_detail_screen.title')} />
      <Box className={classes.wrapper}>
        <Steps step={step} onNext={onChangeStep} category={categoryData} formik={formikArchiveDetail} />
      </Box>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  wrapper: {},
}))

export default ArchiveDetailContainer

import { useTranslation } from 'react-i18next'
import { FormikProps } from 'formik'
import ESInput from '@components/Input'
import { FormType } from './FormModel/FormType'
import MainTopic from '@containers/Community/TopicDetail/Partials/MainTopic'
import { makeStyles, Box, Theme } from '@material-ui/core'

interface ConfirmProps {
  values?: FormikProps<FormType>['values']
}

ESInput.defaultProps = {
  size: 'small',
}

const Confirm: React.FC<ConfirmProps> = () => {
  const { t } = useTranslation(['common'])

  const classes = useStyles()

  return (
    <Box pb={20} className={classes.viewHolder}>
      <Box pb={8} />
      <Box ml={3}>
        <ESInput labelPrimary={t('common:topic_create.name')} fullWidth disabled />
      </Box>
      <Box pb={2} />
      <Box ml={3}>
        <ESInput labelPrimary={t('common:topic_create.preview')} fullWidth disabled />
      </Box>

      <MainTopic
        username="コイチコイチコイチコイチコイチコイチコイチコイチコイチコイチ"
        mail="@koichi"
        date="2020年07月07日"
        count={900}
        discription="トピックス本文が入ります。トピックス本文が入ります。トピックス本文が入ります。トピックス本文が入ります。トピックス本文が入ります。トピックス本文が入ります。トピックス本文が入ります。"
        image="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2019%2F11%2Frick-and-morty-season-4-2000.jpg&q=85"
      />
      <Box pb={2} />
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  viewHolder: {
    marginRight: 40,
    marginLeft: 40,
    width: 800,
    position: 'relative',
    left: -150,
  },

  [theme.breakpoints.down('sm')]: {
    viewHolder: {
      marginLeft: 0,
      marginRight: 0,
      width: 500,
      position: 'relative',
      left: 50,
    },
  },
}))

export default Confirm

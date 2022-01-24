// import { MESSAGE_TABS } from '@containers/VideoLiveStreamContainer/ChatContainer'
// import { Box, makeStyles, Typography } from '@material-ui/core'
// import { Colors } from '@theme/colors'
// import { useTranslation } from 'react-i18next'

// type SubTabType = {
//   label: string
//   value: MESSAGE_TABS.ALL
// }

// interface Props {
//   nameTab: string
//   subTab?: Array<SubTabType>
//   onClickTab: () => void
//   onCLickSubTab?: () => void
// }

// const TabSelect: React.FC<Props> = ({ nameTab, subTab, onClickTab, onCLickSubTab }) => {
//   const { t } = useTranslation('common')
//   const classes = useStyles()

//   const classSubTabMessageAll = `${classes.textSubTab} ${isChatTab && messageTab === MESSAGE_TABS.ALL && classes.active}`
//   const classSubTabMessageTip = `${classes.textSubTab} ${isChatTab && messageTab === MESSAGE_TABS.TIP && classes.active}`

//   return (
//     <Box className={classes.tab}>
//       <Box className={classes.boxTab}>
//         <Typography onClick={onClickTab} className={`${classes.textTab} ${isChatTab && classes.active}`}>
//           {t('live_stream_screen.chat_header')}
//         </Typography>
//         {isChatTab && (
//           <Box className={classes.subTab}>
//             {subTab.map((x, index) => (
//               <Typography
//                 key={index}
//                 onClick={onCLickSubTab}
//                 className={`${x.value === MESSAGE_TABS.ALL ? classSubTabMessageAll : classSubTabMessageTip}`}
//               >
//                 {x.label}
//               </Typography>
//             ))}
//             {/*
//             <Typography onClick={onChangeMessageTab} className={classSubTabMessageTip}>
//               {t('live_stream_screen.tip_mess_tab_title')}
//             </Typography> */}
//           </Box>
//         )}
//       </Box>
//     </Box>
//   )
// }

// const useStyles = makeStyles(() => ({
//   container: {},
//   tab: {
//     width: 'calc(100%/3)',
//     padding: 10,
//   },
//   messageTab: {},
//   receiptSendTab: {},
//   item: {
//     width: '100%',
//   },
//   programInfo: {
//     height: '100%',
//     width: '100%',
//     textAlign: 'center',
//     borderBottom: '2px solid #4D4D4D',
//   },
//   boxTab: {
//     cursor: 'pointer',
//     position: 'relative',
//   },
//   subTab: {
//     width: '100%',
//     position: 'absolute',
//     top: '100%',
//     backgroundColor: Colors.black_opacity['30'],
//     zIndex: 99,
//   },
//   textTab: {
//     borderBottom: '2px solid #4D4D4D',
//     padding: 10,
//     textAlign: 'left',
//     position: 'relative',
//     '&::before': {
//       right: 15,
//       top: '33%',
//       content: '""',
//       position: 'absolute',
//       border: `4px solid ${Colors.grey['200']}`,
//       borderColor: `${Colors.transparent} ${Colors.grey['200']} ${Colors.grey['200']} ${Colors.transparent}`,
//       transform: 'rotate(45deg)',
//     },
//     '&$active': {
//       color: Colors.white,
//       borderBottom: `2px solid ${Colors.white}`,
//       '&::before': {
//         transform: 'rotate(225deg)',
//         borderColor: `${Colors.transparent} ${Colors.white} ${Colors.white} ${Colors.transparent}`,
//       },
//     },
//   },
//   textSubTab: {
//     textAlign: 'center',
//     padding: 10,
//     '&$active': {
//       color: Colors.white,
//     },
//   },
//   active: {},
// }))

// export default TabSelect

const TabSelect: React.FC = () => {
  return <></>
}

export default TabSelect

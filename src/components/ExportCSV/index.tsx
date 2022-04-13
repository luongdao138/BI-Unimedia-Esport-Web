import ESButton from '@components/Button'
import { Colors } from '@theme/colors'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'
import ExcelJS, { Column } from 'exceljs'
import encoding from 'encoding-japanese'
interface Props {
  headers: Column[]
  disableBtnCSV: boolean
  data: any
  fileName: string
  textExport?: string
}

const UTF8 = 'UTF8'
const SJIS = 'SJIS'

const ExportCSV: React.FC<Props> = ({ headers, disableBtnCSV, data, fileName, textExport }) => {
  const classes = useStyles()

  const handClickExportCSV = async () => {
    const workbook = new ExcelJS.Workbook()
    workbook.addWorksheet('sheet1')
    const worksheet = workbook.getWorksheet('sheet1')
    worksheet.columns = headers
    worksheet.addRows(data)
    const sjisArray = await workbook.csv.writeBuffer()
    const uint8Array = new Uint8Array(
      encoding.convert(sjisArray, {
        from: UTF8,
        to: SJIS,
      })
    )
    const blob = new Blob([uint8Array], {
      type: 'application/octet-binary',
    })

    const url = window.URL.createObjectURL(blob)
    const aElement = document.createElement('a')
    aElement.href = url
    aElement.download = `${fileName}.` + 'csv'
    aElement.click()
    aElement.remove()
  }
  return (
    <ESButton variant={'contained'} className={classes.btnCSV} disabled={disableBtnCSV} onClick={handClickExportCSV}>
      <Typography className={classes.textBtnCSV}>{textExport}</Typography>
    </ESButton>
  )
}

export default ExportCSV

const useStyles = makeStyles((theme) => ({
  btnCSV: {
    backgroundColor: '#FF4786',
    maxHeight: '32px',
    '&:hover': {
      '& $textBtnCSV': {
        color: '#FF4786',
      },

      backgroundColor: Colors.white,
    },
  },
  textBtnCSV: {
    color: Colors.white,
    textDecoration: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    btnCSV: {
      fontSize: 12,
    },
  },
}))

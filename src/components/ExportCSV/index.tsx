import { CSVLink } from 'react-csv'

export interface LabelKeyObject {
  label: string
  key: string
}
export type Headers = LabelKeyObject[] | string[]
interface Props {
  data: any
  headers?: Headers | undefined
  className?: string
  textExport?: string
  fileName?: string
}

const ExportCSV: React.FC<Props> = ({ headers, data, className, textExport, fileName }) => {
  return (
    <CSVLink headers={headers} data={data} className={className} filename={fileName}>
      {textExport}
    </CSVLink>
  )
}

export default ExportCSV

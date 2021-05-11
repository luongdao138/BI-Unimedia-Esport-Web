import { StandardProps } from '@material-ui/core'

export interface TabPanelProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'root'> {
  children?: React.ReactNode
  index: any
  value: any
}

function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...rest } = props

  return <div {...rest}>{value === index && children}</div>
}

export default TabPanel

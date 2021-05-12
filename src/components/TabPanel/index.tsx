interface TabPanelProps extends JSX.IntrinsicAttributes {
  index: any
  value: any
  children?: React.ReactNode
}

function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...rest } = props

  return <div {...rest}>{value === index && children}</div>
}

export default TabPanel

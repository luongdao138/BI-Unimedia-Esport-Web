import { Tabs, TabsProps } from '@material-ui/core'
import { ChangeEvent, FormEvent } from 'react'

interface TabsPropsFixed extends Omit<TabsProps, 'onChange'> {
  onChange: // eslint-disable-next-line @typescript-eslint/ban-types
  ((event: ChangeEvent<{}>, value: any) => void) | ((event: FormEvent<HTMLButtonElement>) => void)
}

const ESTabs: React.FC<TabsPropsFixed> = ({ children, ...rest }) => {
  return (
    <Tabs indicatorColor="primary" textColor="primary" {...rest}>
      {children}
    </Tabs>
  )
}

export default ESTabs

import { Tabs } from '@material-ui/core'
import { useState } from 'react'

const ESTabs: React.FC = ({ children, ...rest }) => {
  const [value, setValue] = useState(0)
  return (
    <div>
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue)
        }}
        {...rest}
      >
        {children}
      </Tabs>
    </div>
  )
}

export default ESTabs

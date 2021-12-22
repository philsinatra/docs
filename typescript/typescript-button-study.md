# Typescript Button Study

```typescript
import React, { ButtonHTMLAttributes, FunctionComponent } from 'react'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  block?: true
  color: string
}

const Button: FunctionComponent<IProps> = ({ children, color }) => (
  <button className={color} style={{ color: color }}>
    {children}
  </button>
)

Button.defaultProps = {
  color: 'black',
  type: 'button',
}

export default Button
```

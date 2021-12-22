# React Hooks

Some helpful hooks!

## `useToggle`

```javascript
import React, { FunctionComponent } from 'react'

import { useToggle } from '../hooks'

const ButtonToggleExample: FunctionComponent = () => {
  const [isOn, toggleIsOn] = useToggle()
  return <button onClick={toggleIsOn}>Turn {isOn ? 'Off' : 'On'}</button>
}

export default ButtonToggleExample
```

```javascript
// Hook
import { useReducer } from 'react'

function useToggle(initialValue: boolean = false) {
  // Returns the tuple [state, dispatch]
  // Normally with useReducer you pass a value to dispatch to indicate
  // what action to take on the state, but in this case there's only
  // one action.
  return useReducer(state => !state, initialValue)
}

export default useToggle
```

## ButtonToggleExample Component

```javascript
import React, { FunctionComponent } from 'react'

import { useToggle } from '../hooks'

const ButtonToggleExample: FunctionComponent = () => {
  const [isOn, toggleIsOn] = useToggle()
  return <button onClick={toggleIsOn}>Turn {isOn ? 'Off' : 'On'}</button>
}

export default ButtonToggleExample
```

## References

- Ragland, G. (2021, January 09). UseToggle. Retrieved January 26, 2021, from https://usehooks.com/useToggle/

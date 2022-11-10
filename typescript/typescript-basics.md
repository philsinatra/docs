# Typescript Basics

## Explicit Type

```typescript
type Style = 'bold' | 'italic' | 23

let font: Style

font = 'bold'
```

## Objects

```typescript
interface Person {
  first: string
  last: string
  [key: string]: any
}

const person: Person = {
  first: 'John',
  last: 'Doe',
  age: 23,
}

const person2: Person = {
  first: 'Usain',
  last: 'Bolt',
}
```

### Passing Dynamic Keys to an Object

[Record type](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)

```typescript
const createCache = () => {
  const cache: Record<string, string> = {}
  
  const add = (id: string, value: string) => {
    cache[id] = value
  }
  
  const remove = (id: string) => {
    delete cache[id]
  }
  
  return {
    cache,
    add,
    remove
  }
}
```

## Functions

```typescript
function pow(x: number, y: number): string {
  return Math.pow(x, y).toString()
}

pow(5, 10)
```

If a function does not return a value, it should return `void`

```typescript
function pow(x: number, y: number): void {
  console.log(Math.pow(x, y).toString())
}
```

### Typing Functions

Useful when we pass functions into other functions
<https://www.totaltypescript.com/tutorials/beginners-typescript/typing-functions/solution>

```typescript
type FocusListener = (is_focused: boolean) => void

const add_listener(on_focus_change: FocusListener) => {
  window.addEventListener('focus', () => {
    const array_of_strings = on_focus_change(true)
  })

  window.addEventListener('blur', () => {
    on_focus_change(false)
  })

  add_listener((is_focused) => {
    // console.log({is_focused})
  })
}
```

## Arrays

```typescript
const arr: number[] = []

arr.push(1)
arr.push(23)
arr.push(false)
```

```typescript
// add a question mark to note that each is optional
type MyList = [number?, string?, boolean?]

const arr: MyList = []

arr.push(1)
arr.push(23)
arr.push(false)
```

## Try-Catch

```typescript
const my_function = (state: 'fail' | 'succeed') => {
  try {
    if (state === 'fail')
      throw new Error('Failure')
  } catch (e) {
    if (e instanceof Error)
      return e.message
  }
}
```

## Inheriting Interface Properties

```typescript
interface Base {
  id: number
}

interface User extends Base {
  first_name: string
  last_name: string
}
```

## Selectively Construct Types from Other Types

```typescript
interface User {
  id: string,
  first_name: string,
  last_name: string
}

// Option 1: Omit
type MyType1 = Omit<User, 'first_name'>

// Option 2: Pick
type MyType2 = Pick<User, 'id' | 'last_name'>
```

## References

- [https://www.youtube.com/watch?v=ahCwqrYpIuM](https://www.youtube.com/watch?v=ahCwqrYpIuM)

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

## References

- [https://www.youtube.com/watch?v=ahCwqrYpIuM](https://www.youtube.com/watch?v=ahCwqrYpIuM)

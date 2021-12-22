# ES6 Sets

```javascript
let uniqueArray = [...new Set([5,5,2,2,2,4,2])];
// [5,2,4]
```

Imagine you have a JavaScript array that contains many elements, some of which are duplicated:

```javascript
let dupeArray = [1,1,4,5,4,4,2,1,5];
```

Your goal is to remove the duplicates and leave only one entry per value:

```javascript
let uniqueArray = [1,4,5,2];
```

Let's create a Set, add some values to it and query the size.

```javascript
let mySet = new Set().add(1).add(3).add(2).add(1);
// Set(3) {1, 3, 2}
mySet.size
// 3
```

Notice how the final 1 wasn't added and the size of the Set remained at 3 instead of 4. In an array, it would have been added and the length would be 4.

There are two ways to add values to a Set. Firstly by using the add method as above. Secondly by passing an array to the constructor (new Set()):

```javascript
let arraySet1 = new Set([3,2,1]);
// Set(3) {3, 2, 1}
```

Duplicated values are also removed if they are included in the initial array:

```javascript
let arraySet2 = new Set([8,8,9,2]);
// Set(3) {8,9,2}
arraySet2.size;
// 3
```

All that’s left to do is to convert this Set into an array and we’ve achieved our original goal. There are two ways to do this: both using ES6 methods.

## Array.from Method

The Array.from method creates a new array from an array-like structure.

```javascript
let dupeArray = [3,2,3,3,5,2];
let uniqueArray = Array.from(new Set(dupeArray));
```

## ... Spread operator

Those three dots are ubiquitous in ES6. They crop up everywhere and have several uses (and they're a right pain to google). When we use them as the spread operator they can be used to create an array:

```javascript
let uniqueArray = [...new Set(dupeArray)];
```

Which of these two methods should you use? The spread syntax looks cool, but Array.from is more explicit in its purpose and easier to read. They both accomplish the same thing here so the choice is yours.

Something that would have took many lines of code and variables can now be executed in a one-liner in ES6. What a time to be alive

## Conclusion

```javascript
let uniqueArray = [...new Set([5,5,2,4,2])];
// [5,2,4]
```
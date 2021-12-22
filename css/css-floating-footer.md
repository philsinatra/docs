# Floating Footer Fix

If the **height of the footer is unknown**, it's best to use flex:

```html
<body>
  <header></header>
  <main></main>
  <footer></footer>
</body>
```

```css
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.content {
  flex: 1;
}
```

## References

- Footer below content, but not floating mid-air if not enough content. (2014,
  September 4). Stack Overflow. [StackOverflow](https://stackoverflow.com/questions/25671073/footer-below-content-but-not-floating-mid-air-if-not-enough-content/#answer-48479240)

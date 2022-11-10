## aria/attribute state styling

```html
<head>
  <style>
    body {
      display: grid;
      place-items: center;
    }
    div {
      height: 300px;
      width: 300px;
      background: orange;
    }
    div[data-placement="bottom"] {
      align-items: flex-end;
      display: flex;
      margin-top: 1rem;
    }
    p {
      margin: 0;
    }
  </style>
</head>
<body>
  <div>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nihil
      velit corporis numquam! Dolores totam aperiam voluptas, alias magni
      magnam pariatur nostrum, beatae porro impedit placeat sapiente eum,
      laboriosam inventore.
    </p>
  </div>
  <div data-placement="bottom">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nihil
      velit corporis numquam! Dolores totam aperiam voluptas, alias magni
      magnam pariatur nostrum, beatae porro impedit placeat sapiente eum,
      laboriosam inventore.
    </p>
  </div>
</body>
```

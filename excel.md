# Excel 

## Address Seperator

Example data:

```
Clarence Center NY 14032
Buffalo NY 14221
New York NY 11111
```

To separate the data into columns, use the following equations: (_NOTE_: assuming here the data is in cells A1, A2 and A3)

```
City (cell B1):     =LEFT(A1,LEN(A1)-9)
State (cell C1):    =MID(A1,LEN(A1)-7,2)
ZIP (cell D1):      =RIGHT(A1,5)
```

- [reference](https://www.quora.com/I-have-an-Excel-cell-with-an-address-that-includes-city-state-and-zipcode-how-can-I-separate-these-using-macro-VB-or-similar)
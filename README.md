# dconvert-array

Convert 1d array to 2d array

## Installation

### npm

```bash
$ npm i dconvert-array
```

## Usage

```jsx | prue
import oneArray2twoArray from 'dconvert-array';

const data1 = [1, 2, 3, 4, 5, 6, 7];
const data2 = [1, 2, 3, 4, 5, 6, 7, 8];
const rdata1 = oneArray2twoArray(data1, 3);
const rdata2 = oneArray2twoArray(data2, 3, item => (item === 5 ? 2 : 1));
console.log(rdata1);
console.log(rdata2);
```

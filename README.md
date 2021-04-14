# tiny-rng
```
Tiny LCG class for seed-based value generation.
```

# Install 
```
$ npm install tiny-rng --s
```

```javascript
const prng = require('tiny-rng');
```


# Usage
```javascript
// basic usage

const r = new prng(); // default seed and precision (3)
r.random() // default range (min: 0, max: 1)
> 0.000 - 1.000

const r = new prng(0, 58973); // precision: 0 (returns integer), seed: 58973
const arr = [];
for (let i = 0; i < 10; i++) {
    arr.push(r.random(0, 100)); // min: 0, max: 100
}
arr > [ 54, 46, 42, 40, 65, 60, 81, 39, 60, 66 ]
```

# About
```javascript
// constructor params
// @_precision <optional number default 3> -> number of decimal places (0 = integer)
// @_seed <optional number default Date.now() % 2**31-1> -> starting seed of prng instance
// @_a <optional number default 16807> -> LCG multiplier
// @_c <optional number default 0> -> LCG increment
// @_modulus <optional number default 2**31-1 -> LCG modulus

const r = new prng(_precision, _seed, _a, _c, _modulus);

// random() params
// @min <optional number default 0> -> minimum output
// @max <optional number default 1> -> maximum output
// @precision <optional number default instance.precision> -> decimal precision of output
// passing this parameter can be used to override the current precision of the instance without changing it.

let random_value = r.random(min, max, precision);

// setPrecision()

r.setPrecision(2);
```


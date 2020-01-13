import { add, sqrt } from 'Utils/math'

import { join } from 'Utils/join'

import(/* webpackChunkName:"app-vendor" */ './vendor').then(getMsg => {
  console.log(getMsg())
})

console.log(add)
console.log(sqrt)
console.log(join)

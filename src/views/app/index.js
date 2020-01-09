import { add, sqrt } from 'Utils/math'

import(/* webpackChunkName:"app-vendor" */ './vendor').then(getMsg => {
  console.log(getMsg())
})

console.log(add)

console.log(sqrt)

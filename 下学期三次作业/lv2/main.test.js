import{describe,test,expect} from 'vitest'
import {priceDiscount,priceAdd} from './math.js'

describe('priceDiscount',()=>{
  test('should return the price with discount',()=>{
    expect(priceDiscount(100,0.8)).toBe(80)
  })
})
describe('priceAdd',()=>{
  test('should return the price with add',()=>{
    expect(priceAdd(100,10)).toBe(110)
  })
})

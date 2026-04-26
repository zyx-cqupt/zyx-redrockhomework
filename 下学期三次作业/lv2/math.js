const priceDiscount = (price,discount) => {
  if(price>0 && discount>0 && discount<1){
  return price * discount
}
else{
   return "请输入正确的价格和折扣"
}}
const priceAdd = (price,add) => {
  return price + add
}
export {priceDiscount,priceAdd}
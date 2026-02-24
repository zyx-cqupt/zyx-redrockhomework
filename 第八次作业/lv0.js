//AJAX方法
const xhr = new XMLHttpRequest()
xhr.open("GET",'https://api.github.com/users/zyx-cqupt',true)
xhr.send()
xhr.onreadystatechange = () =>{
  if(xhr.status === 200 && xhr.readyState === XMLHttpRequest.DONE){
    const re = JSON.parse(xhr.responseText)
    console.log('请求成功',re)
  }
  else{
    console.log('请求失败',xhr.status)
  }
}
//fetch
const re = fetch('https://api.github.com/users/zyx-cqupt')
console.log(re)
re
.then(response =>{
  if(!response.ok){
    throw new Error(`错误${response.status}`)
  }
  else{
    return response.json()
  }
})
.then(data =>{
  console.log('信息',data)
})

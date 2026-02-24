const cityName = 'chongqing'
const apiKey = '8ecdca6c386be7a18f6b1b500ab775ea'
const re = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=zh_cn`)
re
.then(response =>{
  if(response.ok){
    console.log(response)
    return response.json()
  }
  else{
    throw new Error("请求失败");
    
  }
})
.then(data =>{
  console.log(data)
  console.log(`重庆的天气为${data.weather[0].description}`)
  console.log(`重庆的温度为${data.main.temp}`)
})

// 1.侧边栏点击变色
const asideup = document.querySelector('.up')
asideup.addEventListener('click', e => {
  const asideactive = asideup.querySelector('.asideactive')
  if (e.target.tagName === 'LI') {
    if (asideactive) {
      asideactive.children[0].style.color = ''
      asideactive.children[1].style.color = ''
      asideactive.classList.remove('asideactive')
      e.target.classList.add('asideactive')
      e.target.children[1].style.color = "white"
    }
    if (e.target.dataset.hash) {
      window.location.hash = e.target.dataset.hash
    }
  }
  if (e.target.tagName === 'SPAN' || e.target.tagName === 'I') {
    const parentli = e.target.parentNode
    if (asideactive) {
      asideactive.children[0].style.color = ''
      asideactive.children[1].style.color = ''
      asideactive.classList.remove('asideactive')
      parentli.classList.add('asideactive')
      parentli.children[1].style.color = 'white'
    }
    if (parentli.dataset.hash) {
      window.location.hash = parentli.dataset.hash
    }

  }
})

//路由控制精选页面子页面切换
// 路径控制
const router = {
  '#/jingxuan': 'jingxuan',
  '#/ground': 'ground',
  '#/ranking': 'ranking',
  '#/singer': 'singer',
  '#/vip': 'vip'
}
//侧边栏路由切换
const asideRouter = {
  '#/bigRecommend': 'bigRecommend',
  '#/bigJingxuan': 'bigJingxuan',
}
// 初始化页面
const initPage = () => {
  const totalBox = document.querySelector('.totalBox')
  Array.from(totalBox.children).forEach(val => {
    val.style.display = 'none'
  })
  const container = document.querySelector('.container')
  Array.from(container.children).forEach(val => {
    val.style.display = 'none'
  })
}
// 默认显示精选页面
window.addEventListener('load', () => {
  initPage()
  const defaultHash = '#/jingxuan'
  window.location.hash = defaultHash//加载后哈希值已经改变
  document.getElementById(router[defaultHash]).style.display = 'block'
  document.querySelector('#bigJingxuan').style.display = 'block'

})

const jingxuanNavUl = document.querySelector('.nav ul')
jingxuanNavUl.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    const hash = e.target.dataset.hash
    window.location.hash = hash
    const navactive = document.querySelector('.navactive')
    if (navactive) {
      navactive.classList.remove('navactive')
    }
    e.target.children[0].classList.add('navactive')
    const lineactive = document.querySelector('.lineactive')
    if (lineactive) {
      lineactive.classList.remove('lineactive')
    }
    e.target.children[1].classList.add('lineactive')
  }
  if (e.target.tagName === 'SPAN' || e.target.tagName === 'I') {
    const hash = e.target.parentNode.dataset.hash
    window.location.hash = hash
    const navactive = document.querySelector('.navactive')
    if (navactive) {
      navactive.classList.remove('navactive')
    }
    e.target.classList.add('navactive')
    const lineactive = document.querySelector('.lineactive')
    if (lineactive) {
      lineactive.classList.remove('lineactive')
    }
    e.target.parentNode.children[1].classList.add('lineactive')
  }
})
window.addEventListener('hashchange', () => {
  //外层侧边栏路由切换
  const curHash = window.location.hash
  const asidePageId = asideRouter[curHash]
  if (asidePageId) {
    Array.from(document.querySelectorAll('.totalBox > div')).forEach(val => {
      val.style.display = 'none'
    })
    document.getElementById(asidePageId).style.display = 'block'
  }
  //精选页面路由切换
  const navactive = document.querySelector('.navactive')
  if (navactive) {
    navactive.classList.remove('navactive')
  }

  const lineactive = document.querySelector('.lineactive')
  if (lineactive) {
    lineactive.classList.remove('lineactive')
  }

  const pageId = router[curHash]
  if (!pageId) {
    return
  }
  Array.from(document.querySelector('.container').children).forEach(val => {
    val.style.display = 'none'
  })
  document.querySelector(`#${pageId}`).style.display = 'block'
  const targetLi = document.querySelector(`[data-hash="${curHash}"]`)
  if (targetLi) {
    targetLi.children[0].classList.add('navactive')
    targetLi.children[1].classList.add('lineactive')
  }
})

//封装debounce防抖函数
function deBounce(fn, delay) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, delay)

  }
}
//获取数据
async function dataObtain(str) {
  return fetch(`http://localhost:3000/${str}`, {
    credentials: 'include'
  })
    .then(res => res.json())
}
// 登录接口
//dataObtain('captcha/sent?phone=15023364257')
//获取用户信息
dataObtain('user/account')
  .then(data => {
    // console.log(data)
    const userName = document.querySelector('.rightpart .head .right .name')
    userName.innerHTML = data.profile.nickname
    document.querySelector('.groundContainer .groundRecommend h3:nth-child(1)')
      .innerHTML = `Hi ${data.profile.nickname},快来听听`

  })
dataObtain('user/detail?uid=4056006797')
  .then(data => {
    //console.log(data)
    const userAvatar = document.querySelector('.rightpart .head .right img')
    userAvatar.src = data.profile.avatarUrl//头像
  })

//热搜榜
dataObtain('search/hot')
  .then(data => {
    //console.log(data)
    const hotList = document.querySelector('.head .left .search .searchRecord .hot ul')
    hotList.innerHTML = data.result.hots.map((val, index) => {
      return ` <li> <span>${index + 1}</span>.${val.first}</li>`
    }).join('')
  })
  .catch(error => {
    console.log('获取热搜榜失败:', error)
  })
//搜索框
const searchInput = document.querySelector('.head .left .search input')
searchInput.addEventListener('focus', e => {
  const searchRecord = document.querySelector('.head .left .search .searchRecord')
  searchRecord.style.opacity = 1
  searchRecord.style.pointerEvents = 'auto'
})
searchInput.addEventListener('blur', e => {
  const searchRecord = document.querySelector('.head .left .search .searchRecord')
  searchRecord.style.opacity = 0
  searchRecord.style.pointerEvents = 'none'
})
//默认搜索记录
dataObtain('search/default')
  .then(data => {
    //console.log(data)
    const searchInput = document.querySelector('.head .left .search input')
    searchInput.placeholder = data.data.showKeyword
  }
  )
  .catch(error => {
    console.log('获取默认搜索记录失败:', error)
  })
//搜索建议
const debounceLinkSearch = deBounce(linkSearch, 200)//防抖函数唯一实例
const searchRecord = document.querySelector('.head .left .search .searchRecord ')
searchInput.addEventListener('input', () => {
  if (searchInput.value === '') {
    // 恢复原始界面
    searchRecord.innerHTML = `<h3>搜素历史</h3>
              <ul>
                <li>我只能离开</li>
              </ul>
              <h3>猜你喜欢</h3>
              <ul>
                <li>我只能离开</li>
              </ul>
              <div class="hot">
                <h3>热搜榜</h3>
                <ul>
                </ul>`
    // 重新获取并渲染热搜榜
    dataObtain('search/hot')
      .then(data => {
        const hotList = document.querySelector('.head .left .search .searchRecord .hot ul')
        hotList.innerHTML = data.result.hots.map((val, index) => {
          return ` <li> <span>${index + 1}</span>.${val.first}</li>`
        }).join('')
      })
    return // 当搜索框为空时，恢复原始界面后直接返回
  }
  debounceLinkSearch()//联想搜索

})
//联想搜索函数
function linkSearch() {
  dataObtain(`search/suggest?keywords=${searchInput.value}`)
    .then(data => {
      console.log(data)
      searchRecord.innerHTML = data.result.songs.map((val, index) => {
        return ` <li class = "suggestItem"><span>${index + 1}</span>.${val.name} </li>`
      }).join('')
    })
}

//官方歌单渲染
dataObtain('top/playlist/highquality')
  .then(data => {
    // console.log(data)
    const guangfangList = document.querySelectorAll('.jingxuan .guanfang> ul li')
    const songsId = []//存放歌单id
    guangfangList.forEach((val, index) => {
      val.style.background = `url(${data.playlists[index].coverImgUrl}) no-repeat center center/cover`
      val.innerHTML = ` <div class="bofangCount"><i class="iconfont icon-erji"></i>${(data.playlists[index].playCount / 10000).toFixed(2)}万</div>
                    <div class="bottom"></div>
                    <div class="hoverBox">
                      <div class="name">${data.playlists[index].name}</div>
                      <ul>
                        <li>1.粤语流行趋势</li>
                      </ul>
                    </div>`
      const ele = val.querySelector('ul')
      songsId.push({
        id: data.playlists[index].id,
        element: ele
      })
    })
    songsId.forEach((val, index) => {
      dataObtain(`playlist/track/all?id=${val.id}&limit=3`)
        .then(data => {
          //console.log(data)获取歌单内的3首歌曲
          //const guanfangUl = document.querySelectorAll('.jingxuan .guanfang>ul ul')
          val.element.innerHTML = data.songs.map((val, index) => {
            return ` <li>${index + 1}.${val.name}</li>`
          }).join('')

        })
    })
  })

//最新音乐渲染
dataObtain('personalized/newsong')
  .then(data => {
    //console.log(data)
    const newestMusicList = document.querySelectorAll('.jingxuan #newestMusic> ul li')
    newestMusicList.forEach((val, index) => {
      val.innerHTML = `
                    <div class="songFengmian" >
                       <i class="iconfont icon-bofang4"></i>
                    </div>
                    <div class="songName">
                      ${data.result[index].name}
                    <div class="singer">${data.result[index].song.artists[0].name}</div>
                    </div>
                    <div class="tuBiao">
                      <i class="iconfont icon-xiazai"></i>
                      <i class="iconfont icon-ziyuan"></i>
                      <i class="iconfont icon-shenglvehao"></i>
                    </div>
                  `
      val.children[0].style.background = `url(${data.result[index].picUrl}) no-repeat center center/cover`
    })
  })
//歌单广场

//渲染函数
function renderPlaylistSquare(type) {
  const groundContainer = document.querySelector('.groundContainer')
  groundContainer.innerHTML = ''
  const songsId = []//存放歌单id
  dataObtain(`top/playlist/highquality?cat=${type}`)
    .then(data => {
      // console.log(data)
      const groundContainer = document.querySelector('.groundContainer')
      const str = data.playlists.map((val, index) => {
        return `<li>
                    <div class="bofangCount"><i class="iconfont icon-erji"></i>${(val.playCount / 10000).toFixed(2)}万</div>
                    <div class="bottom"></div>
                    <div class="hoverBox">
                      <div class="name">${val.name}</div>
                      <ul>
                        <li></li>
                      </ul>
                    </div>
                    </li>
                    `
      }).join('')
      groundContainer.innerHTML = `<ul>${str}</ul>`
      const groundRecommendLis = document.querySelectorAll('.groundContainer > ul > li ')
      Array.from(groundRecommendLis).forEach((item, liIndex) => {
        item.style.background = `url(${data.playlists[liIndex].coverImgUrl
          }) no-repeat center center/cover`
        const ele = item.querySelector('ul')
        songsId.push({
          id: data.playlists[liIndex].id,
          element: ele
        })
      })
      songsId.forEach((val, index) => {
        dataObtain(`playlist/track/all?id=${val.id}&limit=3`)
          .then(data => {
            val.element.innerHTML = data.songs.map((val, index) => {
              return ` <li>${index + 1}.${val.name}</li>`
            }).join('')

          })
      })
    }


    )


}

//推荐
function renderRecommend() {
  dataObtain('user/account')
    .then(data => {
      //console.log(data)
      document.querySelector('.groundContainer .groundRecommend h3:nth-child(1)')
        .innerHTML = `Hi ${data.profile.nickname},快来听听`
    })
  dataObtain('personalized?limit=25')
    .then(data => {
      // console.log(data)
      const songsId = []//存放歌单id
      const groundRecommendLis = document.querySelectorAll('.groundRecommend>ul li')
      Array.from(groundRecommendLis).forEach((val, index) => {
        val.innerHTML = `
                    <div class="bofangCount"><i class="iconfont icon-erji"></i>${(data.result[index].playCount / 10000).toFixed(2)}万</div>
                    <div class="bottom"></div>
                    <div class="hoverBox">
                      <div class="name">${data.result[index].name}</div>
                      <ul>
                        <li></li>
                      </ul>
                    </div>
                    `
        val.style.background = `url(${data.result[index].picUrl}) no-repeat center center/cover`
        const ele = val.querySelector('ul')
        songsId.push({
          id: data.result[index].id,
          element: ele
        }
        )
      })
      songsId.forEach((val, index) => {
        dataObtain(`playlist/track/all?id=${val.id}&limit=3`)
          .then(data => {
            //console.log(data)
            // const groundRecommendUl = document.querySelectorAll('.groundRecommend > ul li ul')
            //console.log(val.element)
            val.element.innerHTML = data.songs.map((val, index) => {
              return ` <li>${index + 1}.${val.name}</li>`
            }).join('')


          })
          .catch(err => {
            console.error(`歌单${val.id}加载失败:`, err);
            val.element.innerHTML = '<li>加载失败</li>';
          });
      })


    })
}
renderRecommend()//默认渲染推荐页面

//广场导航栏
const groundNavLis = document.querySelectorAll('.groundNav ul li')
groundNavLis.forEach((val, index) => {
  val.addEventListener('click', () => {
    groundNavLis.forEach((item, index) => {
      item.classList.remove('groundNavActive')
    })
    val.classList.add('groundNavActive')
    if (val.dataset.hash === '#/china') {
      renderPlaylistSquare('华语')
      return
    }
    if (val.dataset.hash === '#/official') {
      renderPlaylistSquare('流行')
      return
    }
    if (val.dataset.hash === '#/rock') {
      renderPlaylistSquare('摇滚')
      return
    }
    if (val.dataset.hash === '#/electro') {
      renderPlaylistSquare('电子')
      return
    }
    if (val.dataset.hash === '#/folk') {
      renderPlaylistSquare('民谣')
      return
    }
    if (val.dataset.hash === '#/trance') {
      renderPlaylistSquare('轻音乐')
      return
    }
    if (val.dataset.hash === '#/recommend') {
      const groundContainer = document.querySelector('.groundContainer')
      groundContainer.innerHTML = `
      <div id="groundRecommend" class="groundRecommend">
                  <h3>Hi ,快来听听</h3>
                  <ul>
                    <li>
                      <div class="bofangCount"><i class="iconfont icon-erji"></i></div>
                      <div class="bottom"></div>
                      <div class="hoverBox">
                        <div class="name"></div>
                        <ul>
                          <li>1.粤语流行趋势</li>
                        </ul>
                      </div>
                    </li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                  </ul>
                  <h3>每日新鲜推荐</h3>
                  <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                  </ul>
                  <h3>音乐新发现</h3>
                  <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                  </ul>
                  <h3>这些歌单你一定在找</h3>
                  <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                  </ul>

                </div>`
      renderRecommend()
      return
    }
  })
})
//排行榜页面
dataObtain('toplist')
  .then(data => {
    //console.log(data)
    const rankList = document.querySelectorAll('#ranking > ul li ')
    Array.from(rankList).forEach((val, index) => {
      val.style.background = `url(${data.list[index].coverImgUrl}) no-repeat center center/cover`
      val.innerHTML = ''
    })
  })

//推荐页面
dataObtain('recommend/resource')
  .then(data => {
    //console.log(data)
    const recommendList = document.querySelectorAll('.recommendList ul li ')
    const cardsLi = document.querySelectorAll('.cards ul li ')
    Array.from(recommendList).forEach((val, index) => {
      val.style.background = `url(${data.recommend[index].picUrl}) no-repeat center center/cover`
    })
    Array.from(cardsLi).forEach((val, index) => {
      val.style.background = `url(${data.recommend[index + 9].picUrl}) no-repeat center center/cover`
      val.innerHTML = ''
    })
  })
let currentIndex = 0
let bannerLis = []
let bannerUl = null

dataObtain('banner')
  .then(data => {
    console.log(data)
    bannerLis = document.querySelectorAll('.lunboContainer ul li')
    bannerUl = document.querySelector('.lunboContainer ul')

    Array.from(bannerLis).forEach((val, index) => {
      if (data.banners[index]) {
        val.style.background = `url(${data.banners[index].imageUrl}) no-repeat center center/cover`
        val.innerHTML = ''
      }
    })

    startBanner()
  })

function startBanner() {
  setInterval(() => {
    currentIndex++

    if (currentIndex >= 2) {
      currentIndex = 0
    }

    const moveDistance = currentIndex * -100

    bannerUl.style.transition = 'transform 0.5s ease-in-out'
    bannerUl.style.transform = `translateX(${moveDistance}%)`
  }, 3000)
}












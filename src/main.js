const x=localStorage.getItem('x')
const xObject=JSON.parse(x)

let hashMap=xObject || [
    {
        logo:'A',
        logoType:'text',
        url:'https://www.acfun.cn'
    }
    ,
    {
        logo:'B',
        logoType:'text',
        url:'https://www.bilibili.com'
    }
]
const cutUrl=(url)=>{
  return  url.replace('https://','').replace('http://','').replace('www.','').replace(/\/.*/,'')
}
const $siteList=$('.siteList')
const $last=$siteList.find('.last')
// hashMap.forEach((node)=>{
//     const site=$(`
//     <li>
//          <a href="${node.url}">  
//              <div class="site">
//              <div class="logo">${node.logo[0]}</div>
//              <div class="link">${node.url}</div>
//          </div>
//           </a>
       

//      </li>

// `).insertBefore($last)
// })

const render=()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li=$(`
        <li>
             
                 <div class="site">
                 <div class="logo">${node.logo}</div>
                 <div class="link">${cutUrl(node.url)}</div>

                 <div class="delete">
                 <svg class="icon" >
               <use xlink:href="#icondelete"></use>
                </svg>
              
              </div>
            
                </div>
             
            
    
         </li>
    
    `).insertBefore($last)
      $li.on('click',(e)=>{
          window.open(node.url)
      })
       
       $li.on('click','.delete',(e)=>{
           e.stopPropagation()
           hashMap.splice(index,1)
           render()
         
       })
    
    })
    

}
render()
$('.addButton').on('click',()=>{
   let url=prompt('input your site:')
    if(url.indexOf('http')!==0){
        url='https://'+url;
    }
    console.log(url)
    hashMap.push(
        {
            logo:cutUrl(url)[0].toUpperCase(),
            logoType:'text',
            url:url
        }
    )
    render()
})
window.onbeforeunload=()=>{
    const string=JSON.stringify(hashMap)
    console.log(typeof hashMap);
    console.log(typeof string);
    localStorage.setItem('x',string)
}

$(document).on('keypress',(e)=>{
    console.log(e.key);
    const {key} = e
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
        }
    }
})
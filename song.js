/**
 * Created by lzc on 2017/8/23.
 */

let audio = document.createElement('audio')
// audio.src = "http://ov4sliu3n.bkt.clouddn.com/%E6%88%91%E7%9A%84%E4%B8%80%E4%B8%AA%E9%81%93%E5%A7%91%E6%9C%8B%E5%8F%8B.mp3"
audio.oncanplay = function () {
    audio.play()
}
$('.icon-pause').on('click', function () {
    audio.pause()
    $('.disc-container').removeClass('playing')
    $('.light').addClass('pause')
    $('.center-image').addClass('pause')
})
$('.icon-play').on('click', function () {
    audio.play()
    $('.disc-container').addClass('playing')
    $('.light').removeClass('pause')
    $('.center-image').removeClass('pause')
})
$(function(){
    let url=window.location.href
    let reg = /.*\=(.*)/
    let id = url.match(reg)[1]
    $.get('./song.json').then(function(object){
        for(var i=0;i<object.length;i++){
            if(object[i].id === id){
                console.log(object[i]['img'])
            //    xx(object[i].name,object[i].lyric,object[i].singer,object[i]['img'],object[i]['song'])
               xx({
                   name: object[i].name,
                   lyric: object[i]['lyric'],
                   singer: object[i]['singer'],
                   song: object[i]['song'],
                   img: object[i]['img'],
                   background: object[i]['background']
               })
            }
        }
    })
    function xx(options){
        let {name,lyric,singer,song,background,img} = options
        console.log(name,singer,background)
        let image = document.querySelector('.center-image') 
        let $page = $('.page')
        $page.css('background',`transparent url(${background}) no-repeat`)
       $('.lyric-head').text(`${name} - ${singer}`)
       image.src = img
       //想听什么歌
       audio.src = song
       let array = lyric.split('\n')
       let reg = /\[(.*)\](.+)/
       let arr = []
       let $lyric = $('.lyric-moving')
       array = array.map((string) => {
           let obj = {}
           obj = string.match(reg)
           return obj
       })
       for(var i=0;i<array.length;i++){
           if(array[i]){
               let $p = `
                  <p data-time="${array[i][1]}">${array[i][2]}</p>
                    `
               $lyric.append($p)
           }
       }
    }
})
// $(function(){
//     $.get('./song.json').then(function(object){
//         let {lyric} = object
//         let array = lyric.split('\n')
//         let reg = /\[(.*)\](.+)/
//         let arr = []
//         let $lyric = $('.lyric-moving')
//         array = array.map((string) => {
//             let obj = {}
//             obj = string.match(reg)
//             return obj
//         })
//         for(var i=0;i<array.length;i++){
//             if(array[i]){
//                 let $p = `
//                    <p data-time="${array[i][1]}">${array[i][2]}</p>
//                      `
//                 $lyric.append($p)
//             }
//         }
//     })
// })
setInterval(function(){
     let time = audio.currentTime
     let minute = ~~(time/60)
     let newminute = (minute>9)?minute:'0'+minute
     let second = time - minute*60
     let newSecond = (second > 10)?second:`0`+second
    // console.log(newSecond)
     let newTime = `${newminute}:${newSecond}`
     let $p = $('.lyric-moving>p')
    $.each($p,function(item){
        let pTime = $p.eq(item).attr('data-time')
        let pNextTime = $p.eq(item+1).attr('data-time')
        // console.log(pTime,pNextTime)
        if(newTime >= pTime && newTime < pNextTime){
            let movingPx = `-${(item-1)*24}px`
            $('.lyric-moving').css('transform',`translateY(${movingPx})`)
            $p.eq(item).css('color','white')
            $p.eq(item-1).css('color','rgba(255,255,255,.6)')
        }
    })
},300)

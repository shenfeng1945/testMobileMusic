/**
 * Created by lzc on 2017/8/23.
 */

let audio = document.createElement('audio')
audio.src = 'http://ov4sliu3n.bkt.clouddn.com/955d%252F222a%252F3b98%252F1115a4c61c8e7fc1c65a96c8c0efd5db.mp3'
audio.oncanplay = function () {
    audio.play()
}
$('.icon-pause').on('click', function () {
    audio.pause()
    $('.disc-container').removeClass('playing')
})
$('.icon-play').on('click', function () {
    audio.play()
    $('.disc-container').addClass('playing')
})

$(function () {
    $.get('/song.json').then(function (object) {
        let { lyric } = object
        let array = lyric.split('\n')
        let reg = /\[(.+)\](.*)/
        let arr = []
        let $lyric = $('.lyric-moving')
        for (let i = 0; i < array.length; i++) {
            if (array[i]) {
                arr.push(array[i].match(reg))
            }
            if(arr[i][2]){
            var $p = $('<p>')
            $p.attr('date-time', arr[i][1]).text(arr[i][2])
            $p.appendTo($lyric)
            }
        console.log(arr)
        }
    })
})

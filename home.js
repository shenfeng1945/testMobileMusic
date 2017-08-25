/**
 * Created by lzc on 2017/8/22.
 */
$('ol.tabs').on('click','li',function(){
    let $li = $(this)
    let index = $li.index()
    $li.addClass('active').siblings('.active').removeClass('active')
    // console.log($('.tabsContent > li').eq(index))
    $('ol.tabsContent > li').eq(index).addClass('active').siblings('.active').removeClass('active')
})

var APP_ID = '82InV9gcyTzIw099BrTuO1wd-gzGzoHsz';
var APP_KEY = 'qCBb2prMElwslrBNaryawyER';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
var query = new AV.Query('Song');
query.find().then(function (results) {
    $('.new-music > .loading').css('display','none')
    for(let i=0;i<results.length;i++){
        let content = results[i].attributes
        let {music,singer,hasSq,origin} = content
        //判断h2里span有没有内容
       if(! origin){origin = ''}
       //判断有没有没svg图标
       if(hasSq === 'true'){
            let $li = `
             <li>
                 <a href="./song.html">
                    <div class="music-item">
                       <h2>${music}<span>${origin}</span></h2>
                       <p>
                          <svg class="icon-sq">
                             <use xlink:href="#icon-sq"></use>
                          </svg>
                          ${singer}
                       </p>
                     </div>
                    <div class="play">
                          <svg>
                             <use xlink:href="#icon-play"></use>
                          </svg>
                    </div>
                 </a>
             </li>
`
    $('.new-lists').append($li)
   }else if(hasSq === 'false'){
       let $li = `
             <li>
                 <a href="./song.html">
                    <div class="music-item">
                       <h2>${music}<span>${origin}</span></h2>
                       <p>
                          ${singer}
                       </p>
                     </div>
                    <div class="play">
                          <svg>
                             <use xlink:href="#icon-play"></use>
                          </svg>
                    </div>
                 </a>
             </li>
`
       $('.new-lists').append($li)
   }
    }
}, function (error) {
});
//搜索框
let $output = $('#output')
$output.on('input',function(){
    let value = this.value.trim()
    //把搜索内容删除时，它会打出所有结果，通过以下判断可以删除所有结果
    if(value === ''){
        $('#searchResults').addClass('hidden')
        return
    }
    var query = new AV.Query('Song');
    query.contains('music',value);
    query.find().then(function(result){
        $('#searchResults').removeClass('hidden')
        //每次进来之前清空这个没有结果
        $('#searchResults').empty()
        if(result.length === 0){
            $('#searchResults').html('没有结果')
        }
        else {
            for (var i = 0; i < result.length; i++) {
                let content = result[i].attributes
                let {music} = content
                let id = result[i].id
                let $li = `
                  <li data-id=${id}>${music}</li>
               `
                $('#searchResults').append($li)
            }
        }
    })
})



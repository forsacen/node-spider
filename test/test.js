const spider=require('../index')
const Cookie=require('../cookie')
var headers={
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
}
spider.init({
    crawler:{
        base:{
            maxConnections: 10,
            //debug:true,
            callback: function (error, res) {
                if (error) {
                    console.log(error);
                } else {
                    var $ = res.$;
                    console.log(res.statusCode)
                    // $ is Cheerio by default
                    //a lean implementation of core jQuery designed specifically for the server
                    console.log($("title").text());
                }
            },
        },
        extra:{

        }
    },
    puppeteer:{
        base:{
            ///headless:true,
        },
        extra: {

        }
    }
})
spider.crawler.on('drain',function(){
    // For example, release a connection to database.
    console.log('drain')
})
spider.puppeteer.on('schedule',function(options){
    //console.log(options)
})
spider.puppeteer.on('drain',function(){
    console.log('finish')
})
spider.puppeteer.on('request',function(interceptedRequest,opt){
    if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg')|| interceptedRequest.url().endsWith('.ico'))
        interceptedRequest.abort()
    else
        interceptedRequest.continue()
})
let cookie=new Cookie()
var cookieStr='BIDUPSID=C72A4D41C2B6707CB82AA04E298A690F; PSTM=1566923817; BDUSS=ViLU8wUi1vZVNDc0Y2THdHb3hCRTBjYmRLMTgxUGl4SmdKVTN3c1Q2cFdUdzVlRVFBQUFBJCQAAAAAAAAAAAEAAAA4vbUdQW5nbGVfU2VhbgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFbC5l1WwuZdTH; BAIDUID=CDE2B1BBBF28C29C9955503B6F6F3579:FG=1; ispeed_lsm=0; BD_UPN=123353; delPer=0; BD_CK_SAM=1; PSINO=6; rsv_jmp_slow=1585723134399; BD_HOME=1; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; H_PS_PSSID=1446_21095_30908_30824_26350_22160'
cookie.add(cookieStr,'https://www.baidu.com',{domain:'.baidu.com'})
let j=cookie.getJar()
spider.crawler.queue({url:'https://2020.ip138.com/',headers:headers,jar:j})
spider.puppeteer.queue({
    url:'https://www.baidu.com',
    timeout:'100000',
    jar:j,
    callback:async function(err,page){
        if(err){
            throw err
        }
        let $=page.$
        console.log($('title').text())
    }
})

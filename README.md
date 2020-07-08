# node-spider
node爬虫，用js编写，用node-crawler和puppeteer封装，支持常规和puppeteer两种方式

const spider=require('./node-spider')

spider.init(option)

    /******************
    
        设置代理均略有不同 proxy:'(socks5/https/http):127.0.0.1:1080'  
        
    ******************/
    opiton.crawler:option
    
        crawler.base:完全等于官方node-crawler选项
        crawler.extra:额外增加选项
            extra.proxyTimeout:连接代理超时选项,毫秒,默认比较长,20秒左右
            
    option.puppeteer:option
    
        puppeteer.base:完全等于官方puppeteer选项
        puppeteer.extra:额外增加选项
            extra.timeout:超时选项,毫秒,默认30,0不限
            extra.rateLimit: 延迟加载,单位毫秒,maxConnections将被强制设置为1
            extra.maxConnections:爬虫并发数,默认10,0不限
            extra.waitUntil:页面加载等待选项,默认为domcontentloaded,和官方puppeteer一致
            extra.callback:可以为async函数,加载完成后调用,如果要进一步操作page,必须是async函数
                        error:Error
                        page:puppeteer的page
                        
spider.crawler:method

    crawler.queue(option):添加任务
        该option和官方一模一样,唯一的区别是option.proxy在后面回调函数中会变成option.proxyOld


spider.puppeteer:method     
 
    puppeteer.queue(option):添加任务        
        option:每次请求选项
        option.url:要加载的url
        option.timeout:页面超时选项,毫秒,默认0秒为不限
        option.waitUntil:页面加载等待选项,默认为domcontentloaded,和官方puppeteer一致
        option.waitFor:页面打开后等待选项,整数为等待毫秒数,字符串为等待selector标签出现为止,还有function
        option.waitForOption:waitfor选项,和官方的waitFor参数一致
        option.callback:可以为async函数,加载完成后调用,如果要进一步操作page,必须是async函数
            error:Error
            page:puppeteer的page,callback返回后会自动关闭
        option.headers:object对象,覆盖对应的浏览器默认header项                                           
        option.userAgent:string,自定义userAgent
        option.jar:request.jar,自定义cookiejar
        option.device:'puppeteer/DeviceDescriptors',指定用什么设备模拟
        option.proxy:string,代理(http,https,socks5),例如socks5://127.0.0.1:1080
spider.puppeteer:event
    
    Event: 'schedule',任务即将开始前触发
    arg: 
        options
    exampe:
    spider.puppeteer.on('schedule',function(options){
        
    });
    
    Event: 'request',请求前触发
    arg:
        interceptedRequest 被拦截的request,和官方的一样
        options queue方法参数的option选项
    example:
    spider.puppeteer.on('request',function(interceptedRequest,option){
            if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg')|| interceptedRequest.url().endsWith('.ico'))
                interceptedRequest.abort()
            else
                interceptedRequest.continue()
        })
        
    Event: 'drain',任务空了的时候处理
    spider.puppeteer.on('drain',function(){
        db.end();// close connection to MySQL
    }); 

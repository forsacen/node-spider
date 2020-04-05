function spider(){
}

spider.prototype.init=function(opt){
    if('crawler' in opt){
        const Crawler=require('./crawler')
        this.crawler=new Crawler(opt.crawler)
    }
    if('puppeteer' in opt){
        const Puppeteer = require('./puppeteer')
        this.puppeteer=new Puppeteer()
        this.puppeteer.init(opt.puppeteer)
    }
}

module.exports=new spider()
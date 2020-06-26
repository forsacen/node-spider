const NodeCrawler=require('crawler')
const util=require('util')
const httpProxyAgent = require("http-proxy-agent");
const httpsProxyAgent = require("https-proxy-agent");
const socksProxyAgent = require("socks-proxy-agent");
function crawler(opt){
    this.option=opt
    if (opt.base.hasOwnProperty('callback')){
        let cb=opt.base.callback
        opt.base.callback=function (error, res, done){
            if(cb && typeof cb=='function')
                cb(error,res)
            if(done && typeof done=='function')
                done()
        }
    }
    NodeCrawler.call(this,opt.base)
}
util.inherits(crawler,NodeCrawler)
crawler.prototype._queueOld=crawler.prototype.queue
crawler.prototype.queue=function(opt){
    if(opt.hasOwnProperty('callback')){
        let cb=opt.callback
        opt.callback=function (error, res, done){
            if(cb && typeof cb=='function')
                cb(error,res)
            if(done && typeof done=='function')
                done()
        }
    }
    if(opt.proxy){
        if (opt.proxy.startsWith("socks5")) {
            var agent=new socksProxyAgent(opt.proxy);
        }
        else if (opt.url.startsWith("https")) {
            agent = new httpsProxyAgent(opt.proxy);
        } else {
            agent = new httpProxyAgent(opt.proxy);
        }
        opt.agent=agent
        if('extra' in this.option &&'proxyTimeout' in this.option.extra){
            opt.agent.timeout=this.option.extra.proxyTimeout
        }
        opt.proxyOld=opt.proxy
        delete(opt.proxy)
    }
    this._queueOld(opt)
}
module.exports=crawler


function meta(){}

/***************************************
 * 把一个树型对象转换成线性,方便以upsert的方式插入数据库
 * 该函数所有存在的key均为覆盖处理
 * @param obj object
 */

meta.prototype.getLinearData=function(obj){
    let result={}
    for(let k in obj){
        if(typeof obj[k]=='object'){
            let r =this.getLinearData(obj[k])
            for(let ck in r){
                result[k+'.'+ck]=r[ck]
            }
        }else{
            result[k]=obj[k]
        }
    }
    return result
}

module.exports=new meta()
const router = require("koa-router")();
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const request = require("request");
var crypto = require("crypto");
const filePath = path.join(__dirname, "./json/data.json");
const appID = `wx3407dbfa77b7f3a2`
const appSecret = `c61d56e31970d33532513c5b125beaba`
//测试ID
// const appID = `wxcf40256705ee4fc3`
// const appSecret = `b916713a16b12a4ec7bd7fe8b30cf8b2`
/**
 * @description 获取微信签名
 */
 var wxConfig = async (ctx, next) => {
    const req = ctx.request.query;
    console.log(req.nowUrl);
    let nowUrl = req.nowUrl
 
    /**
     * 获取accessToken
     */
    const getToken = () => {
        let p1 = new Promise((resolve, reject) => {
            request(
                ` https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appSecret}`,
                (error, response, body) => {
                    if (!error && response.statusCode == 200) {
                        console.log(body);
                        let token = JSON.parse(body).access_token;
                        if (token !== '') {
                            resolve(getJsapi(token));
                        }
                    }
                }
            )
        });
        return p1;
    };

    /**
     * 获取jsapi_ticket
     */
    const getJsapi = (token) => {
        let p2 = new Promise((resolve, reject) => {
            request(
                `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`,
                (error, response, body) => {
                    if (!error && response.statusCode == 200) {
                        console.log(body);
                        // 存储当前ticket
                        const ticketData = {
                            jsapi_ticket: '',
                            time: moment().format('YYYY/MM/DD HH:mm:ss')
                        };
                        if (JSON.parse(body).errcode === 0) {
                            // 如果获取到
                            ticketData.jsapi_ticket = JSON.parse(body).ticket;
                            // 在同级目录创建个json文件存储jsapi_ticket和请求时间，用于下次接口调用时的校验
                            fs.writeFile(filePath, JSON.stringify(ticketData), (err) => {
                                if (err) console.error(err);
                                console.log("写入文件成功");
                            });
                            resolve(JSON.parse(body).ticket);
                        } else {
                            fs.writeFile(filePath, JSON.stringify(ticketData), (err) => {
                                if (err) console.error(err);
                                console.log("写入ticketData的json文件失败！");
                            });
                        }
                    }
                }
            );
        });
        return p2
            .then(result => {
                console.log(result);
                // 在这里返回签名生成函数的结果给前台
                let sendData = getSignature(nowUrl, result);
                ctx.status = 200;
                ctx.body = sendData;
            })
            .catch(err => {
                console.log(err);
            });
    };
    /*这里是先判断存储json文件是否存在，若不存在或者文件存在但已过期，
    就调用上方的串行函数，直接返回生成的签名给前台。若文件存在没过期，
    直接使用json文件中的jsapi_ticket生成签名返回给前台使用。*/
    if (fs.existsSync(filePath)) {
        console.log("文件路径存在");
        // 先读取
        const jsapiData = JSON.parse(fs.readFileSync(filePath));
        console.log(jsapiData);
        // 先判断时间是否过期，若不过期传key，过期不传key
        let t1 = jsapiData.time; // 数据,必须是2018/12-/01 12:09:04这种格式，否则Date对象无法转换
        let dateBegin = new Date(t1); // 转化为Date对象的形式
        let dateEnd = new Date(); //当前时间数据
        let dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
        // console.log(Math.floor(dateDiff / 1000))
        if (Math.floor(dateDiff / 1000) > 7198) {
            // 缓存时间超过有效期（过期）
            sendData = await getToken();
        } else {
            // 不过期，调用签名生成函数生成结果直接ctx返回给前台
            let signaData = await getSignature(nowUrl, jsapiData.jsapi_ticket);
            ctx.status = 200;
            ctx.body = signaData;
        }
    } else {
        console.log("文件路径不存在");
        sendData = await getToken();
    }
}

// 生成签名函数
const getSignature = function (nowUrl, key) {
    let noncestr = Math.random()
        .toString(36)
        .substr(2); // 随机字符串
    let timestamp = moment().unix(); // 获取时间戳，数值类型
    let jsapi_ticket = `jsapi_ticket=${key}&noncestr=${noncestr}&timestamp=${timestamp}&url=${nowUrl}`;
    console.log(jsapi_ticket)
    jsapi_ticket = getSha1(jsapi_ticket);
    return {
        code: 200,
        message: 'SUCCESS',
        data: {
            appId: appID,
            noncestr: noncestr,
            timestamp: timestamp,
            signature: jsapi_ticket
        },
    }  
};

/**
 * @sha1加密模块 (加密固定,不可逆)
 * @param str string 要加密的字符串
 * @retrun string 加密后的字符串
 * */
const getSha1 = function (str) {
    var sha1 = crypto.createHash("sha1"); //定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
    sha1.update(str);
    var res = sha1.digest("hex"); //加密后的值d
    return res;
};

module.exports = {
    wxConfig
}
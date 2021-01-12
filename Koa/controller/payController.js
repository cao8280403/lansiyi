const request = require('request')
var xmlreader = require('xmlreader')
const fs = require('fs')
var wxpay = require('../tools/paySign')

var appid = 'wx28f86efd25cc3312';
var appid = 'wx28f86efd25cc3312';
var appsecret = 'b8687555bf947b1947b62767c448723';
var mchid = '1499403456'
var mchkey = '8r435jVd7yA0354nsvkxb4cN3x7Se4322';
var wxurl = 'http://XXXXXXXXX/weixinNotify.action';
// h5支付
var wxPayConfig = async (ctx, next) => {
    let orderCode = ctx.request.query.orderCode;
    let money = ctx.request.query.money;
    let orderID = ctx.request.query.orderID;
    console.log('APP传入参数是', orderCode + '----' + money + '------' + orderID + '----' + appid + '-----' + appsecret + '-----' + mchid + '-----' + mchkey)

    // 生成签名sign
    appid
    let mch_id = mchid;
    let nonce_str = wxpay.WxPay.createNonceStr();
    let timestamp = wxpay.WxPay.createTimeStamp();
    let body = '测试微信支付';
    let out_trade_no = orderCode;
    let total_fee = wxpay.WxPay.getmoney(money);
    let spbill_create_ip = req.connection.remoteAddress;
    let notify_url = wxurl;
    let trade_type = 'APP';

    let sign = wxpay.WxPay.paysignjsapi(appid, body, mch_id, nonce_str, notify_url, out_trade_no, spbill_create_ip, total_fee, trade_type, mchkey);

    console.log('sign==', sign);

    // 组装xml数据
    var formData = `<xml>
                    <appid>${appid}</appid>
                    <body><![CDATA["+"测试微信支付"+"]]></body>
                    <mch_id>${mch_id}</mch_id>
                    <nonce_str>${nonce_str}</nonce_str>
                    <notify_url>${notify_url}</notify_url>
                    <out_trade_no>${out_trade_no}</out_trade_no>
                    <spbill_create_ip>${spbill_create_ip}</spbill_create_ip>
                    <total_fee>${total_fee}</total_fee>
                    <trade_type>${trade_type}</trade_type>
                    <sign>${sign}</sign>
                    </xml>`
    console.log('formData===', formData)

    var url = 'https://api.mch.weixin.qq.com/pay/unifiedorder'
    request({
        url: url,
        method: 'POST',
        body: formData
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            console.log(body);
            xmlreader.read(body.toString('utf-8'), (errors, response) => {
                if (null !== errors) {
                    console.log(errors)
                    return;
                }
                console.log('长度===', response.xml.prepay_id.text().length);
                var prepay_id = response.xml.prepay_id.text();
                console.log('解析后的prepay_id==', prepay_id);

                //将预支付订单和其他信息一起签名后返回给前端
                let finalsign = wxpay.WxPay.paysignjsapifinal(appid, mch_id, prepay_id, nonce_str, timestamp, mchkey)
                res.json({
                    'appId': appid,
                    'partnerId': mchid,
                    'prepayId': prepay_id,
                    'nonceStr': nonce_str,
                    'timeStamp': timestamp,
                    'package': 'Sign=WXPay',
                    'sign': finalsign
                })
            });
        }
    });
}
// jsapi 支付
var wxJsApiPay = async (ctx, netx) => {
    // 签名  mchkey是你在支付平台设置的一个API密钥
    const MSign = (param, mchkey) => {
        var string = raw(param);
        string = string + '&key=' + mchkey; //key拼接在字符串最后面
        var crypto = require('crypto');
        return crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase();
    }

    // args是一个JSON，方法将json中的字段按照ASCII码从小到大排序，生成一个字符串key1=value1&key2=value2。
    const raw = (args) => {
        var keys = Object.keys(args);
        keys = keys.sort();
        var newArgs = {};
        keys.forEach(function (key) {
            newArgs[key] = args[key];
        });
        var string = '';
        for (var k in newArgs) {
            string += '&' + k + '=' + newArgs[k];
        }
        string = string.substr(1);
        return string;
    }

    // 创建订单
    // 随机数
    const getRandomNumberSection = (begin, end) => {
        return Math.floor(Math.random() * (begin - end) + end);
    }
    //创建随机字符串
    const getRandomStr = (length) => {
        let value = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let result = "";
        for (let i = 0; i < length; i++) {
            let v = value[getRandomNumberSection(0, value.length - 1)];
            while (i === 0 && v === '0') {
                v = value[getRandomNumberSection(0, value.length - 1)];
            }
            result += v;
        }
        return result;
    }
    // 创建JSAPI订单
    // openid:微信用户的OPENID
	// body: 订单信息;
	// out_trade_no: 你自己生产的商户订单号;
	// spbill_create_ip: 客户端IP地址
    // total_fee: 支付金额(单位分)
    const CreateJSAPIpay = async (openid, body, out_trade_no, spbill_create_ip, total_fee, callback) => {
        let that = this;
		let notify_url = '你需要设置支付完成后的回调URL';
		let WxAppid = '微信APPID';
		let mch_id = '商户ID';
		let trade_type = 'JSAPI';
		let sign_type = 'MD5';
		let noncestr = (new Date()).getTime() + '_';
        noncestr += getRandomStr(31 - noncestr.length);	//产生32位随机字符串;
        //1.签名参数;
		let sign = MSign({
			appid: WxAppid,
			mch_id: mch_id,
			nonce_str: noncestr,
			notify_url: notify_url,
			trade_type: trade_type,
			sign_type: sign_type,
			openid: openid,		//微信用户的OPENID
			body: body,			//订单信息;
			out_trade_no: out_trade_no,//你自己生产的商户订单号;
			spbill_create_ip: spbill_create_ip,//客户端IP地址
			total_fee: total_fee	//金额(单位分)
        }, this.mchkey);
        
        // 生成XML格式
        let fornData = `<xml>
                            <appid>${WxAppid }</appid>
                            <body><![CDATA[${body}]]></body>
                            <mch_id>${mch_id}</mch_id>
                            <nonce_str>${noncestr}</nonce_str>
                        </xml>`
    }
}



module.exports = {
    wxPayConfig,
    wxJsApiPay
}
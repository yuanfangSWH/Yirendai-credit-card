//jsencrypt插件
import JSEncrypt from '../../common/js/jsencrypt.min.js';
//MD5加密
import md5 from 'js-md5';
// var baseURL = uni.getStorageSync('DomainURL');
// baseURL = baseURL + "/v1/";
var baseURL = 'http://bank.yuangfang.com/v1/'
var pubkey =
	`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEFXkm8pA01MGAIUA/cm7qIcea
6qYVm6xP5krX5HDPakQrNkN/szXB9qhzQi9EEI82VxcNU8PxIbTiJo0DRhaF1mm1
cN0myTd4Fs44h59hMLkJocRfeGU4hCD6ZRmzbwd3H1eTCAoljMcDTynwevdEeAqe
ZvazB3IiviZyakwVjQIDAQAB
-----END PUBLIC KEY-----`


// 通过接口获取数据
function apiPost(url, parameter, data, method, callback) {
	let address = baseURL + url + parameter;
	//Sessionid
	//var sessionid = uni.getStorageSync('SessionId');
	//加密
	let md = md5(address);
	var en = new JSEncrypt();
	en.setPublicKey(pubkey);
	let encrypted = en.encrypt(md);
	uni.request({
		url: baseURL + url,
		header: {
			'Content-Type': 'application/json',
			'id': '116626',
			'os': 'android',
			'version': '1.0',
			'sign': encrypted,
			'useragent': '',
			'Sessionid': 'c84gquhm2grf4sihodbt046af5',
			//'cookie': 'PHPSESSID=' + 'c84gquhm2grf4sihodbt046af5',
			'uuid': '862119030524073',
			'devicetoken': 'BLN-AL10'
		},
		data: data,
		method: method || 'post',
		success: (res) => {
			switch (res.data.status) {
				case 200:
					callback(true, res.data.status, res.data)
					break;
				case 152:
					callback(false, res.data.status, res.data)
					break;
				case 153:
					callback(false, res.data.status, res.data)
					break;
				case 154:
					callback(false, res.data.status, res.data)
					//跳转登录页面
					uni.reLaunch({
						url: '/pages/login/login'
					});
					break;
				case 157:
					callback(false, res.data.status, res.data)
					//跳转账号冻结页面
					uni.reLaunch({
						url: '/pages/seal/seal'
					});
					break;
				case '':
					callback(false, res.data.status, res.data)
					break;
				default:
					callback(false, res.data.status, res.data)
			}
		},
		fail: (res) => {
			console.log(res.data);
		}
	});
}
//取得接口使用域名(弃用)
function DomainName(url) {
	uni.request({
		url: "http://services.yuangfang.cn?url=" + url,
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		method: 'get',
		success: (res) => {
			switch (res.data.code) {
				case 200:
					uni.setStorageSync('DomainURL', res.data.data.host);
					break;
				case '':
					uni.setStorageSync('DomainURL', '');
					break;
				default:
					uni.setStorageSync('DomainURL', '');
			}
		},
		fail: (res) => {
			console.log(res.data);
		}
	});
}
//未登陆
function ONONON_login(url, callback) {
	//取到状态缓存
	var stateData = uni.getStorageSync('state');
	//取到当前url地址
	//#ifdef H5
	var valueData = location.href;
	//#endif
	if (url == 'bank/banklist') {
		// 从"?"处切割得到数组
		var info = valueData.split('?');
		var urlData = encodeURIComponent(info[0]);
	} else {
		// 从"?"处切割得到数组
		var info = valueData.split('#');
		if (info[1] == '' || info[1] == undefined) {
			var valueTB = info[0];
		} else {
			var valueTB = info[0] + '#' + info[1];
		}
		var urlData = encodeURIComponent(valueTB);
	}
	if (stateData == 152) {
		//步骤1
		failureEx(url + '?url=' + urlData, (credentials, res) => {
			if (credentials == 153) {
				uni.setStorageSync('state', '153');
				//#ifdef H5
				//重定向URL
				location.assign(res.data.url);
				//#endif
			} else {
				uni.showToast({
					title: res.message,
					icon: 'none',
					duration: 2000
				});
			}
		});
	} else if (stateData == 153) {
		// 从"?"处切割得到数组
		var info = valueData.split('?');
		// 取到正确的值
		var group = info[info.length - 1];
		var code = group.split('&');
		//步骤2
		failureEx(url + '?' + code[0], (credentials, res) => {
			if (credentials == 154) {
				uni.setStorageSync('state', '');
				uni.setStorageSync('codeData', '');
				//跳转关注公众号页面
				uni.navigateTo({
					url: '/pages/public/public'
				});
			} else {
				uni.setStorageSync('state', '');
				uni.setStorageSync('codeData', '');
				var again1 = valueData.split('?');
				var again2 = valueData.split('#');
				var zhenURL = again1[0]+'#'+again2[1];
				//#ifdef H5
				//重定向URL
				location.replace(zhenURL);
				//#endif
			}
		});
	} else if (stateData == 159) {
		uni.setStorageSync('state', '');
		uni.setStorageSync('codeData', '');
		callback(true, '')
	}
}
function failureEx(url, callback) {
	let address = baseURL + url;
	//Sessionid
	//var sessionid = uni.getStorageSync('SessionId');
	//加密
	let md = md5(address);
	var en = new JSEncrypt();
	en.setPublicKey(pubkey);
	let encrypted = en.encrypt(md);
	uni.request({
		url: baseURL + url,
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'id': '116626',
			'os': 'android',
			'version': '1.0',
			'sign': encrypted,
			'useragent': '',
			'Sessionid': 'c84gquhm2grf4sihodbt046af5',
			//'cookie': 'PHPSESSID=' + 'c84gquhm2grf4sihodbt046af5',
			'uuid': '862119030524073',
			'devicetoken': 'BLN-AL10'
		},
		method: 'get',
		success: (res) => {
			callback(res.data.status, res.data)
		},
		fail: (res) => {
			console.log(res.data);
		}
	});
}
//特殊使用接口api(废弃)
function apiPost2(url, params, parameter, data, method, callback) {
	let address = baseURL + url + params + parameter;
	//Sessionid
	var sessionid = uni.getStorageSync('SessionId');
	//加密
	let md = md5(address);
	var en = new JSEncrypt();
	en.setPublicKey(pubkey);
	let encrypted = en.encrypt(md);
	uni.request({
		url: baseURL + url + params,
		header: {
			'id': '116626',
			'os': 'android',
			'version': '1.0',
			'sign': encrypted,
			'lang': 'zh',
			'Content-Type': 'application/x-www-form-urlencoded',
			'useragent': '',
			'dpi': '',
			'Sessionid': sessionid,
			'cookie': 'PHPSESSID=' + sessionid
		},
		data: data,
		method: method || 'post',
		success: (res) => {
			switch (res.data.code) {
				case 200:
					callback(true, res.data.status, res.data)
					break;
				case '':
					callback(false, res.data.status, res.data)
					break;
				default:
					callback(false, res.data.status, res.data)
			}
		},
		fail: (res) => {
			console.log(res.data);
		}
	});

}
//注册用特殊接口方法
function apiPost3(url, parameter, data, params, method, callback) {
	let address = baseURL + url + parameter;
	//Sessionid
	var sessionid = uni.getStorageSync('SessionId');
	//加密
	let md = md5(address);
	var en = new JSEncrypt();
	en.setPublicKey(pubkey);
	let encrypted = en.encrypt(md);
	uni.request({
		url: baseURL + url,
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'id': '116626',
			'os': 'android',
			'version': '1.0',
			'sign': encrypted,
			'useragent': '',
			'Sessionid': 'c84gquhm2grf4sihodbt046af5',
			//'cookie': 'PHPSESSID=' + 'c84gquhm2grf4sihodbt046af5',
			'uuid': '862119030524073',
			'devicetoken': 'BLN-AL10'
		},
		params: params,
		data: data,
		method: method || 'post',
		success: (res) => {
			switch (res.data.status) {
				case 200:
					callback(true, res.data.status, res.data)
					break;
				case 152:
					callback(false, res.data.status, res.data)
					break;
				case 153:
					callback(false, res.data.status, res.data)
					break;
				case 154:
					callback(false, res.data.status, res.data)
					//跳转登录页面
					uni.reLaunch({
						url: '/pages/login/login'
					});
					break;
				case 155:
					callback(false, res.data.status, res.data)
					//跳转实名页面
					uni.reLaunch({
						url: '/pages/login/realb/realb'
					});
					break;
				case 157:
					callback(false, res.data.status, res.data)
					//跳转账号冻结页面
					uni.reLaunch({
						url: '/pages/seal/seal'
					});
					break;
				case '':
					callback(false, res.data.status, res.data)
					break;
				default:
					callback(false, res.data.status, res.data)
			}
		},
		fail: (res) => {
			console.log(res.data);
		}
	});
}
//握手接口(废弃)
function Shakehands() {
	let address = 'http://bank.rong298.cn/v1/handshake';
	//Sessionid
	var sessionid = uni.getStorageSync('SessionId');
	//加密
	let md = md5(address);
	var en = new JSEncrypt();
	en.setPublicKey(pubkey);
	let encrypted = en.encrypt(md);
	var sessionid = uni.getStorageSync('SessionId');
	var headerData = {
		id: '116626',
		os: 'android',
		version: '1.0',
		sign: encrypted,
		lang: 'zh',
		'Content-Type': 'application/x-www-form-urlencoded',
		useragent: '',
		dpi: '',
		Sessionid: sessionid,
		cookie: 'PHPSESSID=' + sessionid
	};
	if (sessionid == '' || sessionid == undefined) {
		delete headerData.Sessionid;
		delete headerData.cookie;
	}
	uni.request({
		url: address,
		header: headerData,
		data: '',
		method: 'get',
		success: res => {
			if (res.data.code == 200) {
				//Sessionid信息本地缓存储存
				var cacheHeader = JSON.stringify(res.header);
				var filterData = cacheHeader.replace(/\s*/g, '');
				var sessionData = JSON.parse(filterData);
				var sessionJudge = sessionData.Sessionid;
				uni.setStorageSync('SessionId', sessionJudge);
				if (sessionJudge == '' || sessionJudge == undefined) {
					uni.showToast({
						title: '未知错误，请退出应用程序重试',
						icon: 'none',
						duration: 2000
					});
				} else {
					console.log('成功握手')
					//跳转登录页面
					// uni.reLaunch({
					// 	url: '/pages/login/login'
					// });
				}
			} else {
				uni.showToast({
					title: '网络异常，请重试',
					icon: 'none',
					duration: 2000
				});
			}
		}
	});

}
//初始验证状态
function failurePlan() {
	var _this = this;
	var value = uni.getStorageSync('landing');
	if (value == '' || value == undefined) {
		Shakehands();
	} else {
		apiPost('/member/getuserinfo', '', '', 'post', (status, res) => {
			if (status) {
				//登录信息本地缓存储存
				uni.setStorageSync('landing', res.data);
				if (res.data.member_tj_id == '' || res.data.member_tj_id == 0) {
					//未填写邀请码
					uni.reLaunch({
						url: '/pages/registered/invitation/invitation'
					});
				} else if (res.data.member_card == '') {
					//未实名认证
					uni.reLaunch({
						url: '/pages/registered/reality/reality'
					});
				} else if (res.data.member_password == '') {
					//未设置密码
					uni.reLaunch({
						url: '/pages/registered/setpassword/setpassword'
					});
				} else {
					uni.showToast({
						title: '欢迎登录',
						icon: 'none',
						duration: 2000
					});
					//跳转首页
					uni.reLaunch({
						url: '/pages/index/index'
					});
				}
			} else {
				uni.showToast({
					title: '网络异常，请重试',
					icon: 'none',
					duration: 2000
				});
				//跳转登录页面
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}
		});
	}
}
export default {
	apiPost,
	apiPost2,
	apiPost3,
	failurePlan,
	Shakehands,
	ONONON_login,
	failureEx,
	DomainName
}

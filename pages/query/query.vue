<template>
	<view>
		<view class="query-title">
			<view class="query-imag"><image src="../../static/images/mrtx.png" /></view>
			<view class="query-zi">浦发银行</view>
		</view>
		<view class="query-mi">建议在申请办卡后3到7个工作日查询进度</view>
		<view class="query-wz middle">身份证</view>
		<view class="query-ms middle">4502251***********</view>
		<view class="query-wz middle">手机号</view>
		<view class="query-ms middle">139****9874</view>
		<view class="query-wz middle">图形验证</view>
		<view class="query-div middle">
			<view class="query-input"><input class="child-input" type="text" placeholder="请点击图片可刷新" placeholder-style="color:#CDCDCD" /></view>
			<view class="query-tx"></view>
		</view>
		<view class="query-wz middle">短信验证</view>
		<view class="query-div middle">
			<view class="query-input"><input class="child-input" type="text" placeholder="请输入短信验证码" placeholder-style="color:#CDCDCD" /></view>
			<view class="query-yzm" @click="takeGL()">{{ animation }}</view>
		</view>
		<view class="query-an middle">下 一 步</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//倒数动画
			animation: '获取验证码',
			//倒数
			yzmZJ: true,
			countdown: 60
		};
	},
	methods: {
		//验证
		takeGL: function() {
			if (this.yzmZJ == true) {
				this.obtainYZ();
			}
		},
		//获取验证码
		obtainYZ: function() {
			//验证码倒数动画
			this.setTime();
			// var data = {
			// 	mobile: this.mobile
			// };
			// var parameter = '?mobile=' + this.mobile;
			// api.apiPost('/member/forgetstep1', parameter, data, 'post', (status, res) => {
			// 	if (status) {
			// 		//验证码倒数动画
			// 		this.setTime();
			// 		this.mobile = res.data.mobile;
			// uni.showToast({
			// 	title: '验证码发送成功',
			// 	icon: 'none',
			// 	duration: 2000
			// });
			// 	} else {
			// 		uni.showToast({
			// 			title: '获取验证码错误，请重试',
			// 			icon: 'none',
			// 			duration: 2000
			// 		});
			// 	}
			// });
		},
		//验证码倒数动画
		setTime: function() {
			let _this = this;
			if (this.countdown == 0) {
				this.countdown = 60;
				this.yzmZJ = true;
				this.animation = '获取验证码';
			} else {
				this.animation = this.countdown + '秒';
				this.countdown--;
				this.yzmZJ = false;
				setTimeout(function() {
					_this.setTime();
				}, 1000);
			}
		}
	}
};
</script>

<style>
.query-title {
	width: 100%;
	height: 169upx;
	background-color: #2c7fff;
	display: flex;
}
.query-imag {
	width: 91upx;
	height: 90upx;
	padding-top: 40upx;
	padding-left: 220upx;
}
.query-imag image {
	width: 91upx;
	height: 90upx;
}
.query-zi {
	flex: 1;
	height: 90upx;
	padding-top: 40upx;
	padding-left: 20upx;
	line-height: 90upx;
	font-size: 44upx;
	font-weight: bold;
	color: #ffffff;
}
.query-mi {
	width: 100%;
	height: 60upx;
	background-color: #f5f9ff;
	text-align: center;
	line-height: 60upx;
	font-size: 22upx;
	color: #257bff;
	margin-bottom: 20upx;
}
.query-wz {
	width: 650upx;
	height: 86upx;
	line-height: 106upx;
	font-size: 28upx;
	color: #000000;
}
.query-ms {
	width: 650upx;
	height: 86upx;
	line-height: 86upx;
	font-size: 28upx;
	color: #000000;
	border-bottom: 1px #dcdcdc solid;
}
.query-div {
	width: 650upx;
	height: 86upx;
	display: flex;
	border-bottom: 1px #dcdcdc solid;
}
.query-input {
	width: 480upx;
	height: 86upx;
}
.child-input {
	width: 490upx;
	height: 86upx;
	line-height: 86upx;
	font-size: 32upx;
	color: #182130;
}
.query-tx {
	width: 170upx;
	height: 68upx;
	margin-top: 10upx;
	background-color: #a2adc0;
}
.query-yzm {
	width: 170upx;
	height: 68upx;
	background: #257bff;
	color: #ffffff;
	font-size: 26upx;
	line-height: 68upx;
	text-align: center;
	margin-top: 10upx;
	-moz-border-radius: 40upx;
	-webkit-border-radius: 40upx;
	border-radius: 40upx;
}
.query-an {
	width: 491upx;
	height: 85upx;
	background: #257bff;
	text-align: center;
	line-height: 85upx;
	font-size: 34upx;
	color: #ffffff;
	margin-top: 60upx;
	-moz-border-radius: 50upx;
	-webkit-border-radius: 50upx;
	border-radius: 50upx;
}
</style>

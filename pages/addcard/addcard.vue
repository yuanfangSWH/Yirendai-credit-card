<template>
	<view>
		<view class="add-title">数据已加密防护</view>
		<view class="add-mi">保障您的信息安全</view>
		<view class="add-zi">姓名</view>
		<view class="add-div">{{ userData.name }}</view>
		<view class="add-zi">身份证</view>
		<view class="add-div">{{ userData.user_id_card }}</view>
		<view class="add-zi">银行卡号</view>
		<view class="add-div"><input class="child-input" type="text" placeholder="请输入银行卡号" v-model="yhkCard" /></view>
		<view class="add-an middle" @click="Confirmcard()">下 一 步</view>
	</view>
</template>

<script>
import api from '../../common/api/api.js';
export default {
	data() {
		return {
			//身份数据
			userData: [],
			//银行卡号
			yhkCard: ''
		};
	},
	//监听页面加载
	onLoad() {
		var stateData = uni.getStorageSync('state');
		if (stateData == '') {
			this.pullData();
		} else {
			this.Special('user/addcard');
		}
	},
	methods: {
		//获取数据
		pullData: function() {
			api.apiPost('user/addcard', '', '', 'get', (status, credentials, res) => {
				if (status) {
					//身份数据
					this.userData = res.data;
				} else {
					if (credentials == 152) {
						uni.setStorageSync('state', '152');
						this.Special('user/addcard');
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						});
					}
				}
			});
		},
		//未登陆？ 我系内阿爸啊~
		Special: function(url) {
			api.ONONON_login(url, (status,res) => {
				if (status) {
					this.pullData();
				} else {
					uni.showToast({
						title: res.message,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//下一步
		Confirmcard: function() {
			var reg = /^(\d{16}|\d{19})$/;
			if (this.yhkCard == '') {
				uni.showToast({
					title: '请填写银行卡号',
					icon: 'none',
					duration: 2000
				});
			} else if (!reg.test(this.yhkCard)) {
				uni.showToast({
					title: '银行卡格式错误',
					icon: 'none',
					duration: 2000
				});
			} else {
				uni.navigateTo({
					url: '/pages/confirmcard/confirmcard?card=' + this.yhkCard
				});
			}
		}
	}
};
</script>

<style>
.add-title {
	width: 100%;
	height: 42upx;
	text-align: center;
	font-size: 44upx;
	font-weight: bold;
	color: #000000;
	padding-top: 70upx;
	padding-bottom: 25upx;
}
.add-mi {
	width: 100%;
	height: 25upx;
	text-align: center;
	font-size: 28upx;
	color: #b6bbc3;
	padding-bottom: 50upx;
}
.add-zi {
	width: 620upx;
	height: 50upx;
	line-height: 50upx;
	font-size: 28upx;
	color: #000000;
	margin-left: auto;
	margin-right: auto;
	padding-top: 40upx;
}
.add-div {
	width: 620upx;
	height: 80upx;
	line-height: 80upx;
	font-size: 32upx;
	color: #000000;
	padding-bottom: 10upx;
	border-bottom: 1px #dcdcdc solid;
	margin-left: auto;
	margin-right: auto;
}
.child-input {
	width: 620upx;
	height: 80upx;
	line-height: 80upx;
	font-size: 32upx;
	color: #182130;
}
.add-an {
	width: 630upx;
	height: 90upx;
	background: #257bff;
	text-align: center;
	line-height: 90upx;
	font-size: 34upx;
	color: #ffffff;
	margin-top: 80upx;
	-moz-border-radius: 50upx;
	-webkit-border-radius: 50upx;
	border-radius: 50upx;
}
</style>

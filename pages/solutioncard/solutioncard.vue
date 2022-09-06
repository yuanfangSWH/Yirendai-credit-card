<template>
	<view>
		<view class="solu-zi">
			<view class="at">银行卡号</view>
			<view class="bt">{{ userData.card }}</view>
		</view>
		<view class="solu-zi">
			<view class="at">手机号</view>
			<view class="bt">{{ userData.phone }}</view>
		</view>
		<view class="solu-zi">
			<view class="at">身份证</view>
			<view class="bt">{{ userData.user_id_card }}</view>
		</view>
		<view class="solu-zi">
			<view class="at">姓名</view>
			<view class="bt">{{ userData.name }}</view>
		</view>
		<view class="solu-an middle" @click="solution()">解 绑</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
export default {
	data() {
		return {
			//身份数据
			userData: []
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
			api.apiPost('user/addcard?type=detail', '', '', 'get', (status, credentials, res) => {
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
		//解绑弹框
		solution: function() {
			var _this = this;
			uni.showModal({
				title: '提示',
				content: '是否解绑当前银行卡',
				success: function(res) {
					if (res.confirm) {
						_this.Unbundling();
					}
				}
			});
		},
		//解绑银行卡
		Unbundling:function(){
			api.apiPost('user/unbind', '', '', 'get', (status, credentials, res) => {
				if (status) {
					uni.reLaunch({
						url: '/pages/solutioncg/solutioncg'
					});
				} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						});
				}
			});
		}
	}
};
</script>

<style>
page {
	background-color: #f1f4f8;
}
.solu-zi {
	width: 100%;
	height: 94upx;
	margin-top: 32upx;
	background-color: #ffffff;
	line-height: 94upx;
	font-size: 32upx;
	color: #000000;
	display: flex;
}
.solu-zi .at {
	width: 160upx;
	height: 100%;
	margin-left: 60upx;
}
.solu-zi .bt {
	flex: 1;
}
.solu-an {
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

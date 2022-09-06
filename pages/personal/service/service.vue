<template>
	<view>
		<view class="ser-title middle">我的客服</view>
		<view class="ser-div middle">
			<view class="ser-ta">
				<image class="middle" :src="service.img" />
				长按二维码即可识别
			</view>
			<view class="ser-tb">
				<view class="ser-zi">在线时间</view>
				<view class="ser-sj">{{ service.info }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from '../../../common/api/api.js';
export default {
	data() {
		return {
			//客服数据
			service: []
		};
	},
	//监听页面加载
	onLoad() {
		var stateData = uni.getStorageSync('state');
		if (stateData == '') {
			this.pullData();
		} else {
			this.Special('apply/kf');
		}
	},
	methods: {
		//获取数据
		pullData: function() {
			api.apiPost('apply/kf', '', '', 'get', (status, credentials, res) => {
				if (status) {
					//客服数据
					this.service = res.data;
				} else {
					if (credentials == 152) {
						uni.setStorageSync('state', '152');
						this.Special('apply/kf');
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
		}
	}
};
</script>

<style>
/* body属性 */
page {
	background-color: #f1f4f8;
}
.ser-title {
	width: 670upx;
	height: 120upx;
	line-height: 120upx;
	font-size: 34upx;
	color: #000000;
	padding-bottom: 15upx;
	font-weight: bold;
}
.ser-div {
	width: 670upx;
	height: 216upx;
	background: linear-gradient(-51deg, rgba(85, 117, 255, 1), rgba(60, 175, 255, 1));
	box-shadow: 0px 7px 6px 0px rgba(208, 220, 255, 1), 0px 3px 7px 0px rgba(80, 146, 255, 1);
	display: flex;
}
.ser-ta {
	width: 290upx;
	height: 100%;
	font-size: 20upx;
	color: #ffffff;
	text-align: center;
}
.ser-ta image {
	width: 113upx;
	height: 113upx;
	display: block;
	padding-top: 28upx;
	padding-bottom: 20upx;
}
.ser-tb {
	flex: 1;
	padding-left: 30upx;
}
.ser-zi {
	font-size: 24upx;
	color: #d8e2ff;
	padding-top: 64upx;
}
.ser-sj {
	font-size: 26upx;
	color: #ffffff;
	padding-top: 22upx;
}
</style>

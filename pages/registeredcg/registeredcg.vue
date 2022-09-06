<template>
	<view>
		<view class="bt-wz middle">微信认证</view>
		<view class="mi-wz middle">扫码添加管理员为微信好友，完成新用户资质审核</view>
		<view class="gd-wz middle">
			<view class="mokzdwzo1">请添加管理员为好友以完成注册</view>
			<view class="mokzdwzo2">添加时请备注姓名哦</view>
			<image class="gjlimg middle" :src="urlData" />
			<view class="tbf">长按识别二维码添加管理员</view>
		</view>
		<view class="baoc-wz">审核通过实践为1-2个工作日。请您耐心等待~</view>
		<view class="b-an middle" @click="determine()">返回首页</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				//二维码图片
				urlData: ''
			}
		},
		onLoad() {
			this.pullData();
		},
		methods: {
			pullData: function() {
				api.apiPost('user/gzhqr', '', '', 'get', (status, credentials, res) => {
					if (status) {
						this.urlData = res.data.url;
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			determine: function() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #F1F4F8;
	}
.bt-wz{
	width:660upx;
	height: 50upx;
	line-height: 50upx;
	font-size: 48upx;
	color: #000000;
	margin-top: 70upx;
}
.mi-wz{
	width:660upx;
	height: 80upx;
	line-height: 80upx;
	font-size: 26upx;
	color: #938F8F;
}
.gd-wz{
	width:660upx;
	height:630upx;
	background:rgba(255,255,255,1);
	border-radius:36upx;
	margin-top: 50upx;
}
.mokzdwzo1{
	width:100%;
	height: 50upx;
	line-height: 50upx;
	text-align: center;
	font-size: 34upx;
	color: #2C3138;
	padding-top: 70upx;
	font-weight:bold;
}
.mokzdwzo2{
	width:100%;
	height: 70upx;
	line-height: 70upx;
	text-align: center;
	font-size: 28upx;
	color: #9DA1A7;
}
.gjlimg{
	width: 321upx;
	height: 323upx;
	display:block;
	padding-top: 10upx;
}
.tbf{
	width:100%;
	height: 50upx;
	line-height: 50upx;
	text-align: center;
	font-size: 28upx;
	color: #218EFF;
}
.baoc-wz{
	width:100%;
	height: 70upx;
	line-height: 70upx;
	text-align: center;
	font-size: 26upx;
	color: #938F8F;
	padding-top: 70upx;
	padding-bottom: 70upx;
}
.b-an{
	width:630upx;
	height:87upx;
	background:rgba(37,123,255,1);
	border-radius:44upx;
	line-height: 87upx;
	text-align: center;
	font-size: 34upx;
	color: #FFFFFF;
}
</style>

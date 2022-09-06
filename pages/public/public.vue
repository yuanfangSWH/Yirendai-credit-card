<template>
	<view>
		<view class="erwm">
			<view class="e-bt">恭喜您成为优选客户</view>
			<view class="e-ms">邀请您申请最高20万元白金信用卡</view>
			<image class="middle" :src="ulrData" />
			<view class="ebc">长按识别二维码立即激活</view>
		</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				ulrData:''
			}
		},
		//监听页面加载
		onLoad() {
			this.pullData();
		},
		methods: {
//拉取数据
		pullData:function(){
			api.apiPost('user/gzhqr', '', '', 'get', (status, credentials, res) => {
				if (status) {
					//二维码图片
					this.ulrData = res.data.url;
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
	}
</script>

<style>
	/* body属性 */
	page {
		background-color: #f1f4f8;
	}

	.erwm {
		width: 660upx;
		height: 660upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 36upx;
		position: absolute;
		top: 50%;
		margin-top: -330upx;
		left: 50%;
		margin-left: -330upx;
	}

	.e-bt {
		color: #2C3138;
		font-size: 38upx;
		line-height: 142upx;
		height: 142upx;
		text-align: center;
		font-weight: bold;
	}

	.e-ms {
		color: #9DA1A7;
		font-size: 26upx;
		height: 30upx;
		text-align: center;
		margin-bottom: 48upx;
	}

	.erwm image {
		width: 321upx;
		height: 323upx;
		display: block;
	}

	.ebc {
		color: #218EFF;
		font-size: 28upx;
		line-height: 100upx;
		height: 100upx;
		text-align: center;
	}
</style>

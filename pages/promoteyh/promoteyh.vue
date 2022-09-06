<template>
	<view>
		<view class="prom-img middle"><image :src="imgData" /></view>
		<view class="prom-mi">点击可重新生成海报</view>
		<view class="prom-fz middle"  @click="cxtb()">重新生成</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				//海报数据
				imgData: '',
				//ID
				idData:''
			};
		},
		//监听页面加载
		onLoad(option) {
			this.idData = option.id;
			uni.showLoading({
				title: '加载中'
			});
			if (option.title == ''||option.title==null) {
				//设置当前标题
				uni.setNavigationBarTitle({
					title:'推广海报'
				});
			}else{
				//设置当前标题
				uni.setNavigationBarTitle({
					title: option.title+'推广海报'
				});
			}
			this.pullData();
		},
		methods: {
			//获取海报数据
			pullData: function(id) {
				api.apiPost('bank/poster?id='+this.idData, '', '', 'get', (status, credentials, res) => {
					if (status) {
						//海报
						this.imgData = res.data.img;
						setTimeout(function() {
							//隐藏加载框
							uni.hideLoading();
						}, 300);
					} else {
						if (credentials == 152) {
							//跳转首页
							uni.switchTab({
								url: '/pages/index/index'
							});
						} else {
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
							uni.showToast({
								title: '数据获取失败，请重试',
								icon: 'none',
								duration: 2000
							});
						}
					}
				});
			},
			//重新加载
			cxtb:function(){
				uni.showLoading({
					title: '加载中'
				});
				setTimeout(function() {
					//隐藏加载框
					uni.hideLoading();
				}, 1000);
				this.pullData();
			}
		}
	};
</script>

<style>
.prom-img {
	width: 539upx;
	height: 958upx;
	padding-top: 34upx;
}
.prom-img image {
	width: 539upx;
	height: 958upx;
}
	.prom-mi {
		width: 100%;
		height: 60upx;
		padding-top: 30upx;
		padding-bottom: 30upx;
		line-height: 60upx;
		font-size: 24upx;
		color: #7a8da5;
		text-align: center;
	}

	.prom-fz {
		width: 270upx;
		height: 64upx;
		background-color: #2682ff;
		box-shadow: 0px 6px 6px 0px rgba(201, 224, 255, 1);
		-moz-border-radius: 30upx;
		-webkit-border-radius: 30upx;
		border-radius: 30upx;
		text-align: center;
		line-height: 64upx;
		font-size: 28upx;
		color: #fefefe;
	}
</style>

<template>
	<view>
		<!-- 商品列表 -->
		<view class="daopl">
			<view class="shldbt">
				<view class="cnmdxian1"></view>
				<view class="siqdh">免费商品 每日更新</view>
				<view class="cnmdxian2"></view>
			</view>
			<view class="zjietm" v-for="(item, key) in creditData" :key="key" @click="spxq(item.id)">
				<view class="tebdtp">
					<image :src="item.main_img"></image>
				</view>
				<view class="tljdbmk">
					<view class="bfjjmbt">{{item.name}}</view>
					<view class="jdt">
						<view class="mdjsl"></view>
						<view class="snmb">剩余{{item.shop_number}}件</view>
					</view>
					<view class="jiago">
						<view class="heh">天猫价¥{{item.old_price}}</view>
						<view class="zhtmz">到手价<span>¥{{item.now_price}}</span></view>
						<view class="qgouhsb" >0元购</view>
						<view class="qgouhsb" style="background-color: #C3CAD4; display: none;">0元购</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 悬浮底部 -->
		<view class="dibdtmd">
			<image class="tebdjbwaz" src="../../static/images/hzgtt.png"></image>
			<view class="qiangsd">剩余抢购机会<span>{{snapUp}}</span>次</view>
			<view class="zmbdlteao" @click="qgjl()">抢购记录</view>
		</view>
		<!-- 背景 -->
		<view class="sdbjtooo">
			<image src="../../static/images/jif-bjt.png"></image>
		</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				//商品数据
				creditData: [],
				//抢购次数
				snapUp: 0
			};
		},
		//页面显示时加载
		onShow() {
			var stateData = uni.getStorageSync('state');
			if (stateData == '') {
				this.pullData();
			} else {
				this.Special('shop/shoplist');
			}
		},
		methods: {
			//获取数据
			pullData: function() {
				api.apiPost('shop/shoplist', '', '', 'get', (status, credentials, res) => {
					if (status) {
						//商品数据
						this.creditData = res.data.shop;
						//抢购次数
						this.snapUp = res.data.usernumber;
					} else {
						if (credentials == 152) {
							uni.setStorageSync('state', '152');
							this.Special('shop/shoplist');
						} else {
							uni.showToast({
								title: '数据获取失败，请重试',
								icon: 'none',
								duration: 2000
							});
						}
					}
				});
			},
			//未登陆？ 我系内阿爸啊~
			Special: function(url) {
				api.ONONON_login(url, (status, res) => {
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
			//商品详情
			spxq: function(id) {
				uni.navigateTo({
					url: '/pages/integral/details/details?id=' + id
				});
			},
			//抢购记录
			qgjl: function() {
				uni.navigateTo({
					url: '/pages/integral/qgrecord/qgrecord'
				});
			}
		}
	};
</script>

<style>
	@import '../../common/css/integral.css';

	/* body属性 */
	page {
		background-color: #3A27A5;
		background-image: url('~@/static/images/cfdhd.png');
		background-size: contain;
	}
</style>

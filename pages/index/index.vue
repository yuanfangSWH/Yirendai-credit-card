<template>
	<view>
		<!-- 活动弹框 -->
		<view class="activity" v-if="activitynr">
			<image class="ac_zhuyt" :src="activityData.popup_img" @click="tiaozlj()" />
			<image class="ac_fxx" @click="activityTK()" src="../../static/images/shouyx.png" />
		</view>
		<view class="zhezc" v-if="activitynr"></view>
		<!-- 活动弹框结束 -->
		<view class="version middle">
			<swiper class="swiper" :autoplay="true" :interval="5000" :duration="500">
				<swiper-item v-for="(item, key) in bannerData" :key="key">
					<view>
						<image :src="item.banner_img" @click="tiaozwl(key)" />
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="title-div middle">
			<view class="title-zi" @click="tebdjql()">
				热门银行
			</view>
			<view class="title-gd" @click="AAWY()">
				<view class="gd-wz">返佣一览表</view>
				<image src="../../static/images/tonyjt2.png" />
			</view>
		</view>
		<view class="index-list">
			<view class="product" v-for="(item, key) in creditData" :key="key" v-if="item.bank_status!=3">
				<view @click="List(item.bank_id,item.bank_status)">
					<view class="index-tu middle">
						<image :src="item.bank_logo" />
					</view>
					<view class="index-title" v-if="item.bank_status==1">{{ item.bank_name }}</view>
					<view class="index-title" style="color: #1B1B1B;" v-else-if="item.bank_status==0">{{ item.bank_name }}</view>
					<view class="index-tbbaog middle">
						<view class="wjtngjltt" v-if="item.bank_status==1">
							<view class="index-bi" :id="'bitb'+index" v-for="(second, index) in yhbqData[key].bank_tab" :key="index" v-if="yhbqData[key].bank_tab.length>=2">{{ second.banktabname }}</view>
							<view class="index-bi" id="bitb2" v-else>{{ yhbqData[key].bank_tab[0].banktabname }}</view>
						</view>
						<view class="wjtngjltt" style="" v-else-if="item.bank_status==0">
							<view class="index-bi" id="bitb2" style="color: #818B9A;border: 1px #818B9A solid;">即将开放</view>
						</view>
					</view>
					<view class="index-mi" v-if="item.bank_status==1">
						<view class="index-wz middle">{{ item.bank_desc }}</view>
						<view class="index-wz middle">{{ item.bank_propaganda }}</view>
					</view>
					<view class="index-mi" v-else-if="item.bank_status==0">
						<view class="index-wz middle">敬请期待</view>
						<view class="index-wz middle">敬请期待</view>
					</view>
				</view>
				<view class="index-ku" @click="Reward(item.bank_id)" v-if="item.bank_status==1">
					<view class="index-an middle" v-if="partnerData==1">结算价¥{{ priceData[key].price }}</view>
					<view class="index-an middle" v-else-if="partnerData==0">免费申请</view>
				</view>
				<view class="index-ku" v-else-if="item.bank_status==0">
					<view class="index-an an-huie middle">即将开放</view>
				</view>
			</view>
		</view>
		<!-- 悬浮按钮 -->
		<view class="tiebd-xf">
			<view class="t-wjbnr middle" @click="Become()">
				<image class="tebiyatb" src="../../static/images/yqtb01.png" />
				<view class="tfgdwz">我要推广信用卡</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				//banner图
				bannerData: [],
				//信用卡数据
				creditData: [],
				//合伙人依据
				partnerData: 0,
				//结算价格
				priceData: [],
				//银行标签
				yhbqData: [],
				//活动弹框数据
				activityData: [],
				//活动弹框显示
				activitynr: false,
			};
		},
		//页面显示时加载
		onShow() {
			var stateData = uni.getStorageSync('state');
			if (stateData == '') {
				this.pullData();
			} else {
				this.Special('bank/banklist');
			}
		},
		//页面隐藏时
		onHide() {
			this.activitynr = false;
			//显示 tabBar
			uni.showTabBar();
		},
		methods: {
			//测试
			AAWY: function() {
				// uni.navigateTo({
				// 	url: '/pages/integral/integral'
				// });
				uni.showToast({
					title: '暂未开放，敬请期待',
					icon: 'none',
					duration: 2000
				});
			},
			//清理缓存
			tebdjql: function() {
				uni.showModal({
					title: '提示',
					content: '是否清理本地数据缓存',
					success: function(res) {
						if (res.confirm) {
							//清理全部本地数据缓存
							uni.clearStorage();
						} else if (res.cancel) {}
					}
				});
			},
			//获取数据
			pullData: function() {
				var _this = this;
				api.apiPost('bank/banklist', '', '', 'get', (status, credentials, res) => {
					if (status) {
						//是/否合伙人
						uni.setStorageSync('partner', res.data.user_is_hehuo);
						this.partnerData = res.data.user_is_hehuo;
						//banner图
						this.bannerData = res.data.bannerlist;
						//信用卡
						this.creditData = res.data.banklist;
						//银行标签
						for (var i = 0; i < this.creditData.length; i++) {
							var bqt = this.creditData[i].bank_tab.slice(0, 2);
							this.yhbqData.push({
								'bank_tab': bqt
							})
						}
						//结算价格
						for (var i = 0; i < this.creditData.length; i++) {
							var group = this.creditData[i].bank_commission.split(".")
							this.priceData.push({
								'price': group[0]
							})
						}
						//活动弹框
						if (res.data.pop != "" && res.data.pop != null && res.data.pop != undefined) {
							this.activityData = res.data.pop;
							this.activityTK();
						}
					} else {
						if (credentials == 152) {
							uni.setStorageSync('state', '152');
							this.Special('bank/banklist');
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
			//跳转产品列表一览
			listData: function() {
				uni.navigateTo({
					url: '/pages/list/list'
				});
			},
			//银行卡列表
			List: function(id, status) {
				if (status == 1) {
					uni.navigateTo({
						url: '/pages/list/list?id=' + id
					});
				}
			},
			//奖励说明
			Reward: function(id) {
				uni.navigateTo({
					url: '/pages/reward/reward?id=' + id
				});
			},
			//成为合伙人
			Become: function() {
				if (this.partnerData == 1) {
					uni.navigateTo({
						url: '/pages/personal/promote/promote'
					});
				} else {
					uni.navigateTo({
						url: '/pages/registered/registered?cip=200'
					});
				}
			},
			//跳转外链
			tiaozwl: function(value) {
				//#ifdef H5
				location.assign(this.bannerData[value].banner_href);
				//#endif
			},
			//显示/关闭活动弹框
			activityTK: function() {
				if (this.activitynr) {
					this.activitynr = false;
					//显示 tabBar
					uni.showTabBar();
				} else {
					this.activitynr = true;
					//隐藏 tabBar
					uni.hideTabBar();
				}
			},
			//活动弹框跳转链接
			tiaozlj: function() {
				api.apiPost('bank/readpopup?id=' + this.activityData.popup_id, '', '', 'get', (status, credentials, res) => {
					if (status) {
						//#ifdef H5
						location.assign(this.activityData.popup_href);
						//#endif
					} else {
						if (credentials == 152) {
							uni.setStorageSync('state', '152');
							this.Special('bank/banklist');
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							});
						}
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

	/* 悬浮 */
	.tiebd-xf {
		width: 420upx;
		height: 106upx;
		background: rgba(255, 255, 255, 0.6);
		border-radius: 53upx;
		position: fixed;
		bottom: 120upx;
		left: 50%;
		margin-left: -210upx;
	}

	.t-wjbnr {
		width: 383upx;
		height: 76upx;
		background: linear-gradient(270deg, rgba(85, 117, 255, 1), rgba(38, 130, 255, 1), rgba(60, 175, 255, 1));
		border: 1px solid rgba(70, 151, 255, 1);
		box-shadow: 0px 8upx 14upx 0px rgba(173, 205, 255, 1);
		border-radius: 38upx;
		display: flex;
		margin-top: 14upx;
	}

	.tebiyatb {
		width: 32upx;
		height: 32upx;
		display: block;
		margin-top: 22upx;
		margin-left: 60upx;
	}

	.tfgdwz {
		height: 76upx;
		line-height: 76upx;
		font-size: 30upx;
		color: #FFFFFF;
		margin-left: 20upx;
	}

	/* 活动弹框 */
	.zhezc {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(33, 37, 41, 1);
		opacity: 0.7;
		z-index: 30;
	}

	.activity {
		width: 540upx;
		height: 580upx;
		position: fixed;
		top: 50%;
		margin-top: -290upx;
		left: 50%;
		margin-left: -270upx;
		z-index: 40;
	}

	.ac_zhuyt {
		width: 540upx;
		height: 580upx;
		border-radius: 29upx;
	}

	.ac_fxx {
		width: 78upx;
		height: 157upx;
		position: absolute;
		bottom: -158upx;
		left: 238upx;
	}

	.swiper {
		height: 210upx;
	}

	.index-tu {
		width: 68upx;
		height: 68upx;
		margin-top: 20upx;
		margin-bottom: 15upx;
		border: 1px solid rgba(217, 236, 255, 1);
		border-radius: 36upx;
	}

	.index-tu image {
		width: 48upx;
		height: 48upx;
		display: block;
		border-radius: 36upx;
		margin-top: 10upx;
		margin-left: auto;
		margin-right: auto;
	}

	.index-title {
		width: 100%;
		height: 40upx;
		text-align: center;
		line-height: 40upx;
		font-size: 34upx;
		color: #1b1b1b;
		padding-bottom: 10upx;
		font-weight: bold;
	}

	.title-huie {
		font-weight: normal;
	}

	.wjtngjltt {
		margin-left: 10%;
		margin-right: 10%;
		display: flex;
	}

	.index-tbbaog {
		height: 36upx;
	}

	.index-bi {
		height: 30upx;
		line-height: 30upx;
		font-size: 24upx;
		border-radius: 4px;
		color: #2a7fff;
		border: 1px #2a7fff solid;
	}

	#bitb0 {
		padding-left: 4upx;
		padding-right: 4upx;
	}

	#bitb1 {
		flex: 1;
		text-align: center;
		overflow: hidden;
		margin-left: 6upx;
	}

	#bitb2 {
		padding-left: 4upx;
		padding-right: 4upx;
		margin-left: auto;
		margin-right: auto;
	}

	.bi-huie {
		color: #b2b7bd;
		border: 1px #b2b7bd solid;
	}

	.index-mi {
		width: 100%;
		height: 80upx;
	}

	.index-wz {
		width: 170upx;
		height: 40upx;
		text-align: center;
		line-height: 40upx;
		font-size: 24upx;
		color: #a2adc0;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	.wz-huie {
		line-height: 76upx;
	}

	.index-ku {
		width: 100%;
		height: 65upx;
		border-top: 1px #f5f6f8 solid;
	}

	.index-an {
		width: 183upx;
		height: 48upx;
		text-align: center;
		color: #ffffff;
		font-size: 26upx;
		line-height: 48upx;
		background-color: #2682ff;
		margin-top: 16upx;
		-moz-border-radius: 30px;
		-webkit-border-radius: 30px;
		border-radius: 30px;
	}

	.an-huie {
		background-color: #b2b7bd;
	}

	.index-list {
		width: 700upx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-left: 36upx;
		padding-bottom: 200upx;
	}

	.index-list .product {
		width: 217upx;
		height: 370upx;
		background-color: #ffffff;
		margin-right: 16upx;
		margin-bottom: 16upx;
	}

	.version {
		width: 691upx;
		height: 210upx;
		padding-top: 40upx;
		padding-bottom: 30upx;
	}

	.version image {
		width: 691upx;
		height: 210upx;
		border-radius: 8px;
	}

	.title-div {
		width: 691upx;
		height: 71upx;
		line-height: 71upx;
		display: flex;
		padding-bottom: 30upx;
	}

	.title-zi {
		color: #222427;
		font-size: 36upx;
		font-weight: 1000;
		flex: 1;
	}

	.title-gd {
		width: 165upx;
		color: #2682ff;
		font-size: 28upx;
		display: flex;
	}

	.title-gd .gd-wz {
		flex: 1;
	}

	.title-gd image {
		width: 16upx;
		height: 20upx;
		margin-top: 26upx;
	}
</style>

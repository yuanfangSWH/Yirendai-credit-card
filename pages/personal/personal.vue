<template>
	<view>
		<view class="center">
			<view class="per-xinx">
				<view class="per-toux">
					<image :src="userData.user_avatar==''?'../../static/images/default.png': userData.user_avatar" />
				</view>
				<view class="per-wza">
					<view class="per-nic">
						<view class="per-xm">{{ userData.user_nickname }}</view>
						<view class="per-dji" v-if="partnerData==1">合伙人</view>
						<view class="per-dji" v-else>普通用户</view>
					</view>
					<view class="per-sbie">{{ userData.user_phone }}<text class="tjbdtex">|</text>UID：{{ userData.user_id }}</view>
				</view>
				<view class="per-anc">
					<view class="per-tonz" @click="Notice()">
						<view class="per-hond"></view>
						通知
					</view>
				</view>
			</view>

			<view class="per-jinexi">
				<view class="per-ak">
					<view class="per-wznr">可提现(元)</view>
					<view class="per-tixj">
						<text>￥</text>
						{{ userData.user_money }}
					</view>
					<view class="per-wznr">总收入(元)</view>
					<view class="per-zsr">
						<text>￥</text>
						{{ userData.totalmoney }}
					</view>
				</view>
				<view class="per-bk">
					<view class="per-tixan" @click="Withdrawal()">提现</view>
					<view class="per-shouzm" @click="Record()">收支明细></view>
				</view>
			</view>
			<view class="per-tba" v-if="partnerData==1">
				<view class="per-di" @click="Order()">
					<image class="middle" src="../../static/images/tab1.png" />
					<view class="per-tb-zi middle">申卡订单</view>
				</view>
				<view class="per-di" @click="Customer()">
					<image class="middle" src="../../static/images/tab2.png" />
					<view class="per-tb-zi middle">客户管理</view>
					<view class="per-di"></view>
				</view>
				<view class="per-di" @click="Team()">
					<image class="middle" src="../../static/images/tab3.png" />
					<view class="per-tb-zi middle">下属团队</view>
					<view class="per-di"></view>
				</view>
				<view class="per-di" @click="Problem()">
					<image class="middle" src="../../static/images/tab4.png" />
					<view class="per-tb-zi middle">常见问题</view>
					<view class="per-di"></view>
				</view>
			</view>
			<view class="per-tba" v-else>
				<view class="per-di" @click="Order()">
					<image class="middle" src="../../static/images/tab1.png" />
					<view class="per-tb-zi middle">申卡订单</view>
				</view>
				<!-- <view class="per-di" @click="Become()">
					<image class="middle" src="../../static/images/tab6.png" />
					<view class="per-tb-zi middle">推荐有钱</view>
					<view class="per-di"></view>
				</view> -->
				<view class="per-di" @click="Service()">
					<image class="middle" src="../../static/images/tab5.png" />
					<view class="per-tb-zi middle">联系客服</view>
					<view class="per-di"></view>
				</view>
				<view class="per-di" @click="Problem()">
					<image class="middle" src="../../static/images/tab4.png" />
					<view class="per-tb-zi middle">常见问题</view>
					<view class="per-di"></view>
				</view>
			</view>
			<view class="ptg-mk" v-if="partnerData==1">
				<!-- <view class="ptg-li" @click="Promote()">
					<image class="ptgimg1" src="../../static/images/tbdjtb1.png" />
					<view class="ptgwz">合伙人招募</view>
					<image class="ptgimg2" src="../../static/images/jtlj2.png" />
				</view> -->
				<view class="ptg-li" @click="Promote2()">
					<image class="ptgimg1" src="../../static/images/tbdjtb2.png" />
					<view class="ptgwz">信用卡推广</view>
					<image class="ptgimg2" src="../../static/images/jtlj2.png" />
				</view>
				<view class="ptg-li" @click="Tgjc()">
					<image class="ptgimg1" src="../../static/images/tbdjtb3.png" />
					<view class="ptgwz tebdcz">操作指南<view class="wynbixk">必看</view></view>
					<image class="ptgimg2" src="../../static/images/jtlj2.png" />
				</view>
				<view class="ptg-li" @click="Service()">
					<image class="ptgimg1" src="../../static/images/tbdjtb4.png" />
					<view class="ptgwz">在线客服</view>
					<image class="ptgimg2" src="../../static/images/jtlj2.png" />
				</view>
			</view>
			<!-- 占位块 -->
			<view class="zhangw"></view>
		</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				//用户数据
				userData: [],
				//合伙人依据
				partnerData: 0
			};
		},
		//页面显示时加载
		onShow() {
			var stateData = uni.getStorageSync('state');
			if (stateData == '') {
				this.pullData();
			} else {
				this.Special('user/center');
			}
		},
		methods: {
			//获取数据
			pullData: function() {
				api.apiPost('user/center', '', '', 'get', (status, credentials, res) => {
					if (status) {
						//用户数据
						this.userData = res.data;
						//是/否合伙人
						uni.setStorageSync('partner', res.data.user_is_hehuo);
						this.partnerData = res.data.user_is_hehuo;
					} else {
						if (credentials == 152) {
							uni.setStorageSync('state', '152');
							this.Special('user/center');
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
			//通知
			Notice: function() {
				uni.navigateTo({
					url: '/pages/personal/notice/notice'
				});
			},
			//提现
			Withdrawal: function() {
				uni.navigateTo({
					url: '/pages/withdrawal/withdrawal'
				});
			},
			//收支明细
			Record: function() {
				uni.navigateTo({
					url: '/pages/personal/record/record'
				});
			},
			//订单列表
			Order: function() {
				uni.navigateTo({
					url: '/pages/personal/order/order'
				});
			},
			//客户管理
			Customer: function() {
				uni.navigateTo({
					url: '/pages/personal/customer/customer'
				});
			},
			//我的团队
			Team: function() {
				uni.navigateTo({
					url: '/pages/personal/team/team'
				});
			},
			//常见问题
			Problem: function() {
				uni.navigateTo({
					url: '/pages/personal/problem/problem'
				});

			},
			//我的推广
			Promote: function() {
				uni.navigateTo({
					url: '/pages/personal/promote/promote'
				});
			},
			//海报推广
			Promote2: function() {
				uni.navigateTo({
					url: '/pages/promoteyh/promoteyh?id=0'
				});
			},
			//在线客服
			Service: function() {
				uni.navigateTo({
					url: '/pages/personal/service/service'
				});
			},
			//成为合伙人
			Become: function() {
				uni.navigateTo({
					url: '/pages/registered/registered?cip=200'
				});
			},
			//推广教程
			Tgjc: function() {
				uni.navigateTo({
					url: '/pages/operation/operation'
				});
			}
		}
	};
</script>

<style>
	@import '../../common/css/personal.css';

	/* body属性 */
	page {
		background-color: #f1f4f8;
	}
	.tebdcz{
		position: relative;
	}
	.wynbixk{
		width:76upx;
		height:36upx;
		background:linear-gradient(90deg,rgba(245,77,77,1),rgba(255,186,124,1));
		border-radius:18upx 4upx 18upx 18upx;
		font-size: 24upx;
		color: #FFFFFF;
		line-height: 36upx;
		text-align: center;
		position: absolute;
		top: 40upx;
		left: 170upx;
	}
</style>

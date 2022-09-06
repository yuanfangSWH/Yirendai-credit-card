<template>
	<view>
		<view class="sear-div">
			<view class="sear-shous">
				<view class="sear-tub">
					<image src="../../../static/images/shoutb.png" />
				</view>
				<view class="sear-in"><input class="child-input" type="number" placeholder="输入用户手机号" placeholder-style="color:#CDCDCD" v-model="searchData" /></view>
			</view>
			<view class="sear-an" @click="search()">搜索</view>
		</view>
		<view class="ord-tab">
			<view class="ord-mk">
				<view class="ord-wz" :class="{ selected: conditions == 2 ? true : false }" @click="change(2)">待查询</view>
			</view>
			<view class="ord-mk">
				<view class="ord-wz" :class="{ selected: conditions == 3 ? true : false }" @click="change(3)">待审核</view>
			</view>
			<view class="ord-mk">
				<view class="ord-wz" :class="{ selected: conditions == 1 ? true : false }" @click="change(1)">已完成</view>
			</view>
			<view class="ord-mk">
				<view class="ord-wz" :class="{ selected: conditions == 4 ? true : false }" @click="change(4)">未通过</view>
			</view>
			<view class="ord-mk">
				<view class="ord-wz" :class="{ selected: conditions == 0 ? true : false }" @click="change(0)">失效订单</view>
			</view>
		</view>
		<!-- 订单 -->
		<view class="ord-din" v-for="(item, key) in Theorder" :key="key">
			<view class="ord-ta">
				<view class="ord-tx">
					<image :src="item.user_avatar" />
				</view>
				<view class="ord-nic">{{ item.user_nickname }}</view>
				<view class="ord-dh">{{ item.apply_phone }}</view>
			</view>
			<view class="ord-tb">
				<view class="ord-a">
					<view class="ord-zi">{{ item.card_name }}</view>
					<view class="ord-sj">申请时间：{{ item.apply_time }}</view>
					<view class="ord-zt">
						申请状态：
						<text v-show="conditions == 2">待查询</text>
						<text v-show="conditions == 3">待审核</text>
						<text v-show="conditions == 1">已完成</text>
						<text v-show="conditions == 4">未通过</text>
						<text v-show="conditions == 0">失效订单</text>
					</view>
				</view>
				<view class="ord-b">
					<view class="ord-an-a">进度查询</view>
					<view class="ord-an-b" style="display: none;">再次申请</view>
				</view>
			</view>
		</view>
		<!-- 订单 -->
		<!-- 暂无数据 -->
		<view class="tebzw" v-show="Theorder==''">
			<image class="middle" src="../../../static/images/wusj.png" />
			<view class="tbdwz">暂无<text v-show="conditions == 2">待查询</text>
				<text v-show="conditions == 3">待审核</text>
				<text v-show="conditions == 1">已完成</text>
				<text v-show="conditions == 4">未通过</text>
				<text v-show="conditions == 0">失效订单</text>订单</view>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
				//订单数据
				Theorder: [],
				//搜索值
				searchData: '',
				//页数
				page: 1,
				//最大页数
				pageCount: 1,
				//状态
				conditions: 2
			};
		},
		//监听页面加载
		onLoad() {
			var stateData = uni.getStorageSync('state');
			if (stateData == '') {
				uni.showLoading({
					title: '加载中'
				});
				this.pullData();
			} else {
				this.Special('apply/orderlist');
			}
		},
		//上拉加载
		onReachBottom() {
			uni.showLoading({
				title: '加载中'
			});
			this.loadingData();
		},
		methods: {
			//改变条件
			change: function(value) {
				if (this.conditions == value) {
					uni.showLoading({
						title: '加载中'
					});
					setTimeout(function() {
						//隐藏加载框
						uni.hideLoading();
					}, 500);
				} else {
					uni.showLoading({
						title: '加载中'
					});
					this.conditions = value;
					this.pullData();
				}
			},
			//点击搜索
			search: function() {
				var re = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
				if (this.searchData == '') {
					uni.showToast({
						title: '请输入要搜索的手机号',
						icon: 'none',
						duration: 2000
					});
				} else if (!re.test(this.searchData)) {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none',
						duration: 2000
					});
				} else {
					api.apiPost('apply/orderlist?search=' + this.searchData + 'order_type=' + this.conditions + '&page=1', '', '',
						'get', (status, credentials, res) => {
							if (status) {
								//订单数据
								this.Theorder = res.data.orderlist;
							} else {
								if (credentials == 152) {
									uni.setStorageSync('state', '152');
									this.Special('apply/orderlist');
								} else {
									uni.showToast({
										title: res.message,
										duration: 2000
									});
								}
							}
						});
				}
			},
			//获取数据
			pullData: function() {
				api.apiPost('apply/orderlist?order_type=' + this.conditions + '&page=' + this.page, '', '', 'get', (status,
					credentials, res) => {
					if (status) {
						//订单数据
						this.Theorder = res.data.orderlist;
						//最大页数
						this.pageCount = res.page.pageCount;
						//隐藏加载框
						uni.hideLoading();
					} else {
						if (credentials == 152) {
							uni.setStorageSync('state', '152');
							this.Special('apply/orderlist');
						} else {
							uni.showToast({
								title: res.message,
								duration: 2000
							});
						}
					}
				});
			},
			//加载数据
			loadingData: function() {
				this.page++;
				if (this.page > this.pageCount) {
					uni.showToast({
						title: '没有更多记录了',
						icon: 'none',
						duration: 2000
					});
				} else {
					api.apiPost('apply/orderlist?order_type=' + this.conditions + '&page=' + this.page, '', '', 'get', (status,
						credentials, res) => {
						if (status) {
							this.Theorder = this.Theorder.concat(res.data.orderlist);
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
						} else {
							uni.showToast({
								title: res.message,
								duration: 2000
							});
						}
					});
				}
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
			}
		}
	};
</script>

<style>
	/* body属性 */
	page {
		background-color: #f1f4f8;
	}
	
	.ord-din {
		width: 684upx;
		height: 257upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3px 16px 0px rgba(231, 239, 249, 1);
		border-radius: 8upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 30upx;
	}

	.ord-ta {
		width: 635upx;
		height: 70upx;
		display: flex;
		border-bottom: 1px #e9eef6 solid;
		margin-left: auto;
		margin-right: auto;
	}

	.ord-tx {
		width: 44upx;
		height: 44upx;
		padding-top: 14upx;
		padding-left: 20upx;
		padding-right: 30upx;
	}

	.ord-tx image {
		width: 44upx;
		height: 44upx;
		border-radius: 40upx;
	}

	.ord-nic {
		width: 390upx;
		height: 44upx;
		padding-top: 14upx;
		font-size: 26upx;
		color: #000000;
		line-height: 44upx;
	}

	.ord-dh {
		flex: 1;
		height: 44upx;
		padding-top: 14upx;
		font-size: 26upx;
		color: #99a8bc;
		line-height: 44upx;
	}

	.ord-tb {
		width: 635upx;
		height: 150upx;
		display: flex;
		padding-top: 20upx;
		margin-left: auto;
		margin-right: auto;
	}

	.ord-a {
		width: 480upx;
		height: 100%;
	}

	.ord-zi {
		font-size: 34upx;
		font-weight: bold;
		color: #000000;
	}

	.ord-sj {
		padding-top: 14upx;
		font-size: 22upx;
		color: #aeb7c2;
	}

	.ord-zt {
		padding-top: 14upx;
		font-size: 22upx;
		color: #aeb7c2;
	}

	.ord-zt text {
		color: #2a8cfb;
	}

	.ord-b {
		flex: 1;
		height: 100%;
	}

	.ord-an-a {
		width: 140upx;
		height: 50upx;
		line-height: 50upx;
		background: rgba(42, 140, 251, 1);
		box-shadow: 0px 3px 8px 0px rgba(163, 206, 255, 1);
		border-radius: 25upx;
		font-size: 24upx;
		text-align: center;
		color: rgba(255, 255, 255, 1);
		margin-top: 46upx;
	}

	.ord-an-b {
		width: 140upx;
		height: 50upx;
		line-height: 50upx;
		border: 1px solid rgba(42, 140, 251, 1);
		border-radius: 25upx;
		font-size: 24upx;
		text-align: center;
		color: #2a8cfb;
		margin-top: 46upx;
	}

	.ord-tab {
		width: 100%;
		height: 120upx;
		padding-top: 25upx;
		display: flex;
	}

	.ord-mk {
		flex: 1;
		height: 95upx;
	}

	.ord-wz {
		width: 120upx;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		font-size: 26upx;
		color: #000000;
		margin-left: auto;
		margin-right: auto;
	}

	.selected {
		font-size: 30upx;
		font-weight: bold;
		border-bottom: 4px #2a8cfb solid;
	}

	.sear-div {
		width: 100%;
		height: 133upx;
		display: flex;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(231, 238, 248, 1);
		box-shadow: 0px 4px 17px 3px rgba(239, 246, 255, 1);
	}

	.sear-shous {
		width: 557upx;
		height: 66upx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(200, 212, 229, 1);
		border-radius: 33upx;
		margin-top: 30upx;
		margin-left: 40upx;
		display: flex;
	}

	.sear-tub {
		width: 30upx;
		height: 30upx;
		padding-top: 8upx;
		padding-left: 20upx;
		margin-right: 20upx;
	}

	.sear-tub image {
		width: 30upx;
		height: 30upx;
	}

	.sear-in {
		flex: 1;
		height: 66upx;
	}

	.child-input {
		width: 100%;
		height: 66upx;
		line-height: 66upx;
		font-size: 26upx;
	}

	.sear-an {
		flex: 1;
		height: 133upx;
		line-height: 133upx;
		text-align: center;
		font-size: 30upx;
		color: #7e8691;
	}
</style>

<template>
	<view>
		<!-- 弹框 -->
		<view class="kzzwtk" v-show="bounced">
			<view class="tjbst">口令购买<image @click="useGB()" src="../../../static/images/xzwz1.png"></image>
			</view>
			<view class="tebdfz middle">复制：<span>{{kouData}}</span></view>
			<view class="bnyfano middle" :data-clipboard-text="kouData" @click="copy()">一键复制</view>
			<view class="kwdliuc">
				<view class="zjwrhd">
					<view class="tbdjb middle">
						<image class="middle" src="../../../static/images/tjf01.png"></image>
					</view>
					<view class="tbdwzjb">1.一键复制</view>
				</view>
				<view class="zjwrhd">
					<view class="tbdjb middle">
						<image class="middle" src="../../../static/images/tjf02.png"></image>
					</view>
					<view class="tbdwzjb">2.打开手机淘宝</view>
				</view>
				<view class="zjwrhd">
					<view class="tbdjb middle">
						<image class="middle" src="../../../static/images/tjf03.png"></image>
					</view>
					<view class="tbdwzjb">3.领取卷</view>
				</view>
			</view>
			<view class="dxlxlpbn"><span>注：</span>若一键复制失败，请手动长按复制口令</view>
		</view>
		<view class="zhezc" v-show="bounced"></view>
		<!-- 弹框结束 -->
		<view style="width: 100%;height: 42upx;"></view>
		<!-- 记录列表 -->
		<view class="jildiv middle" v-for="(item, key) in jilData" :key="key">
			<view class="xijld middle">
				<image src="../../../static/images/mrtx.png"></image>
				<view class="spmz">{{item.name}}</view>
				<view class="dljxdr">{{item.user_phone}}</view>
			</view>
			<view class="gwljdiv middle">
				<view class="tljwz1">淘宝免单购物卷</view>
				<view class="tljwz2">申请时间：{{item.create_at}}</view>
				<view class="tljwz3">申请状态：<span v-if="item.status == 1">领取成功</span><span v-else>异常，请联系客服</span></view>
				<view class="telban" @click="useTK(item.tkl)">去使用</view>
			</view>
		</view>

		<!-- 空记录显示 -->
		<view class="shujwkk" v-if="jilData==''||jilData==null">
			<image class="lkonakk middle" src="../../../static/images/rgskdf.png"></image>
			<view class="ldjbtwz">暂无记录，快去<span>办卡、邀好友</span>领奖品吧！</view>
		</view>
	</view>
</template>

<script>
	//clipboard插件
	import Clipboard from '../../../common/clipboard/clipboard.min.js';
	import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
				//弹框
				bounced: false,
				//记录数据
				jilData: [],
				//淘口令
				kouData:''
			}
		},
		//页面显示时加载
		onShow() {
			var stateData = uni.getStorageSync('state');
			if (stateData == '') {
				this.pullData();
			} else {
				this.Special('shop/rushrecord');
			}
		},
		methods: {
			//获取数据
			pullData: function() {
				api.apiPost('shop/rushrecord', '', '', 'get', (status, credentials, res) => {
					if (status) {
						//记录数据
						this.jilData = res.data;
					} else {
						if (credentials == 152) {
							uni.setStorageSync('state', '152');
							this.Special('shop/rushrecord');
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
			//开启弹框
			useTK: function(value) {
				this.kouData = value;
				this.bounced = true;
			},
			//关闭弹框
			useGB: function() {
				this.bounced = false;
			},
			//复制口令
			copy: function() {
				//#ifdef APP-PLUS
				//设置系统剪切板内容 ----仅兼容APP/小程序
				uni.setClipboardData({
					data: this.kouData,
					success: function() {
						uni.showToast({
							title: '口令复制成功',
							icon: 'none',
							duration: 2000
						});
					},
					fail: function() {
						uni.showToast({
							title: '口令复制失败',
							icon: 'none',
							duration: 2000
						});
					}
				});
				//#endif

				//#ifdef H5
				//注意要使用let或者const，不能使用var，否则会出现复制次数叠加的问题，即复制不止一次。----仅兼容H5
				let clipboard = new Clipboard('.bnyfano');
				clipboard.on('success', function(e) {
					uni.showToast({
						title: '口令复制成功',
						icon: 'none',
						duration: 2000
					});
				});

				clipboard.on('error', function(e) {
					uni.showToast({
						title: '口令复制失败',
						icon: 'none',
						duration: 2000
					});
				});
				//#endif
			}
		}
	}
</script>

<style>
	/* body属性 */
	page {
		background-color: #F1F4F8;
	}

	/* 弹框 */
	.zhezc {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(33, 37, 41, 1);
		opacity: 0.7;
		z-index: 20;
	}

	.kzzwtk {
		width: 620upx;
		height: 620upx;
		background-color: #FFFFFF;
		position: fixed;
		border-radius: 30upx;
		top: 50%;
		margin-top: -310upx;
		left: 50%;
		margin-left: -310upx;
		z-index: 30;
		overflow: hidden;
	}

	.tjbst {
		width: 100%;
		height: 108upx;
		position: relative;
		line-height: 108upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 30upx;
		background-color: #2682FF;
	}

	.tjbst image {
		width: 22upx;
		height: 22upx;
		display: block;
		position: absolute;
		right: 36upx;
		top: 36upx;
	}

	.tebdfz {
		width: 560upx;
		height: 110upx;
		background: rgba(241, 248, 255, 1);
		border: 1px dashed rgba(105, 158, 255, 1);
		line-height: 110upx;
		text-align: center;
		color: #575757;
		font-size: 24upx;
		margin-top: 30upx;
	}

	.tebdfz span {
		color: #2A75FF;
	}

	.bnyfano {
		width: 410upx;
		height: 76upx;
		background: rgba(38, 130, 255, 1);
		border-radius: 38upx;
		line-height: 76upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 28upx;
		margin-top: 40upx;
	}

	.kwdliuc {
		width: 100%;
		height: 145upx;
		display: flex;
		margin-top: 40upx;
	}

	.zjwrhd {
		flex: 1;
		height: 145upx;
	}

	.tbdjb {
		width: 78upx;
		height: 78upx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(228, 228, 228, 1);
		border-radius: 50%;
	}

	.tbdjb image {
		width: 34upx;
		height: 34upx;
		display: block;
		margin-top: 24upx;
	}

	.tbdwzjb {
		width: 100%;
		height: 26upx;
		line-height: 26upx;
		font-size: 20upx;
		color: #CCCCCC;
		text-align: center;
		margin-top: 16upx;
	}

	.dxlxlpbn {
		width: 100%;
		height: 30upx;
		line-height: 30upx;
		font-size: 20upx;
		color: #B3B9C3;
		text-align: center;
		margin-top: 10upx;
	}

	.dxlxlpbn span {
		color: #2E78FF;
	}

	/* 弹框结束 */
	.jildiv {
		width: 710upx;
		height: 264upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 22upx;
		margin-bottom: 30upx;
	}

	.xijld {
		width: 670upx;
		height: 72upx;
		display: flex;
		border-bottom: 1px #E5E5E5 solid;
	}

	.xijld image {
		width: 32upx;
		height: 32upx;
		border-radius: 20upx;
		display: block;
		padding-top: 20upx;
		padding-right: 20upx;
	}

	.spmz {
		width: 460upx;
		height: 72upx;
		line-height: 72upx;
		font-size: 24upx;
		color: #707379;
	}

	.dljxdr {
		flex: 1;
		height: 72upx;
		line-height: 72upx;
		font-size: 24upx;
		color: #707379;
	}

	.gwljdiv {
		width: 680upx;
		height: 145upx;
		padding-top: 30upx;
		position: relative;
	}

	.tljwz1 {
		color: #010101;
		font-size: 32upx;
		height: 54upx;
		width: 100%;
	}

	.tljwz2 {
		color: #A7AAAF;
		font-size: 26upx;
		height: 47upx;
		width: 100%;
	}

	.tljwz3 {
		color: #A7AAAF;
		font-size: 26upx;
		height: 47upx;
		width: 100%;
	}

	.tljwz3 span {
		color: #1A7BFF;
	}

	.telban {
		width: 170upx;
		height: 60upx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(38, 130, 255, 1);
		border-radius: 60upx;
		position: absolute;
		top: 60upx;
		right: 10upx;
		color: #2682FF;
		font-size: 26upx;
		text-align: center;
		line-height: 60upx;
	}

	.shujwkk {
		width: 100%;
	}

	.lkonakk {
		display: block;
		width: 325upx;
		height: 317upx;
		padding-top: 250upx;
	}

	.ldjbtwz {
		width: 100%;
		height: 66upx;
		line-height: 66upx;
		font-size: 26upx;
		color: #ADB9C9;
		text-align: center;
		margin-top: 30upx;
	}

	.ldjbtwz span {
		color: #2682FF;
	}
</style>

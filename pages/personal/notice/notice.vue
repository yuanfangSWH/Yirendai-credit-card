<template>
	<view>
		<view class="notice-konge"></view>
		<view class="notice-div middle" v-for="(item, key) in noticeData" :key="key">
			<view class="notice-title middle">
				<view class="notice-bt-div1">
					<view class="notice-bq" v-if="item.is_stick == 1">置顶</view>
					<view class="notice-wz">{{ item.m_notice_title }}</view>
				</view>
				<view class="notice-bt-div2">
					<view class="notice-sji">{{ item.created_at }}</view>
					<view class="notice-zkwz" @click="opeN(item.m_notice_id)">
						<text v-if="messageData[key].isShow">收起</text>
						<text v-else>展开</text>
						<image src="../../../static/images/zk2.png" v-if="messageData[key].isShow" />
						<image src="../../../static/images/zk1.png" v-else />
					</view>
				</view>
			</view>
			<view class="notice-nr middle" v-show="messageData[key].isShow">{{ item.m_notice_content }}</view>
		</view>

	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
				//通知数据
				noticeData: [],
				//消息内容
				messageData: [],
				//页数
				page: 1,
				//最大页数
				pageCount: 1
			};
		},
		//监听页面加载
		onLoad() {
			var stateData = uni.getStorageSync('state');
			if (stateData == '') {
				this.pullData();
			} else {
				this.Special('apply/notice');
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
			//获取数据
			pullData: function() {
				api.apiPost('apply/notice?page=' + this.page, '', '', 'get', (status, credentials, res) => {
					if (status) {
						//通知数据
						this.noticeData = res.data.info;
						//最大页数
						this.pageCount = res.page.pageCount;
						for (var i = 0; i < this.noticeData.length; i++) {
							this.messageData.push({
								t_id: this.noticeData[i].m_notice_id,
								isShow: false
							});
						}
					} else {
						if (credentials == 152) {
							uni.setStorageSync('state', '152');
							this.Special('apply/notice');
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
					api.apiPost('apply/notice?page=' + this.page, '', '', 'get', (status, credentials, res) => {
						if (status) {
							this.noticeData = this.noticeData.concat(res.data.info);
							for (var i = 0; i < this.noticeData.length; i++) {
								this.messageData.push({
									t_id: this.noticeData[i].m_notice_id,
									isShow: false
								});
							}
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
			//展开
			opeN: function(id) {
				for (var i = 0; i < this.messageData.length; i++) {
					if (this.messageData[i].t_id == id) {
						if (!this.messageData[i].isShow) {
							this.messageData[i].isShow = true;
						} else {
							this.messageData[i].isShow = false;
						}
					}
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

	.notice-konge {
		width: 100%;
		height: 30upx;
	}

	.notice-div {
		width: 684upx;
		-moz-border-radius: 20upx;
		-webkit-border-radius: 20upx;
		border-radius: 20upx;
		background-color: #ffffff;
		padding-bottom: 30upx;
		margin-bottom: 30upx;
	}

	.notice-title {
		width: 626upx;
		height: 162upx;
	}

	.notice-bt-div1 {
		display: flex;
		width: 100%;
		height: 80upx;
		padding-top: 10upx;
	}

	.notice-bq {
		width: 58upx;
		height: 32upx;
		background: linear-gradient(125deg, rgba(85, 117, 255, 1), rgba(60, 175, 255, 1));
		font-size: 20upx;
		line-height: 32upx;
		text-align: center;
		color: #ffffff;
		margin-top: 40upx;
		margin-left: 10upx;
		margin-right: 30upx;
	}

	.notice-wz {
		font-size: 34upx;
		color: #24282e;
		margin-top: 32upx;
	}

	.notice-bt-div2 {
		display: flex;
		width: 100%;
		height: 40upx;
		padding-top: 30upx;
	}

	.notice-sji {
		width: 540upx;
		height: 40upx;
		font-size: 26upx;
		line-height: 40upx;
		color: #adb6c2;
	}

	.notice-zkwz {
		flex: 1;
		height: 40upx;
		font-size: 26upx;
		line-height: 40upx;
		color: #aeb7c2;
	}

	.notice-zkwz image {
		width: 24upx;
		height: 24upx;
		margin-left: 10upx;
	}

	.notice-nr {
		width: 626upx;
		font-size: 28upx;
		line-height: 40upx;
		color: #677381;
		padding-top: 20upx;
		margin-top: 10upx;
		border-top: 1px #e6e9ed solid;
	}
</style>

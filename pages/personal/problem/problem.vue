<template>
	<view>
		<view class="problem-konge"></view>
		<view class="problem-div" v-for="(item, key) in problemData" :key="key" @click="opeN(item.m_faq_id)">
			<view class="problem-wtl">
				<view class="problem-ke">{{key+1}}</view>
				<view class="problem-bt">{{item.m_faq_title}}</view>
				<view class="problem-tb">
					<image class="middle" src="../../../static/images/zk2.png" v-if="messageData[key].isShow" />
					<image class="middle" src="../../../static/images/zk1.png" v-else />
				</view>
			</view>
			<view class="problem-nr" v-show="messageData[key].isShow">
				<view class="nr"><rich-text :nodes="item.m_faq_content"></rich-text></view>
			</view>
		</view>

	</view>
</template>

<script>
	import api from '../../../common/api/api.js';
	export default {
		data() {
			return {
				//问题问题数据
				problemData: [],
				//消息内容
				messageData: [],
			};
		},
		//监听页面加载
		onLoad() {
			var stateData = uni.getStorageSync('state');
			if (stateData == '') {
				this.pullData();
			} else {
				this.Special('apply/faq');
			}
		},
		methods: {
			//获取数据
			pullData: function() {
				api.apiPost('apply/faq', '', '', 'get', (status, credentials, res) => {
					if (status) {
						//问题数据
						this.problemData = res.data.info;
						for (var i = 0; i < this.problemData.length; i++) {
							this.messageData.push({
								t_id: this.problemData[i].m_faq_id,
								isShow: false
							});
						}
					} else {
						if (credentials == 152) {
							uni.setStorageSync('state', '152');
							this.Special('apply/faq');
						} else {
							uni.showToast({
								title: res.message,
								duration: 2000
							});
						}
					}
				});
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

	.problem-konge {
		width: 100upx;
		height: 20upx;
	}

	.problem-div {
		width: 100%;
		padding-bottom: 1px;
	}

	.problem-wtl {
		width: 100%;
		height: 112upx;
		background-color: #ffffff;
		display: flex;
	}

	.problem-ke {
		width: 42upx;
		height: 40upx;
		background-color: #5497f2;
		margin-top: 38upx;
		margin-left: 33upx;
		margin-right: 38upx;
		font-size: 34upx;
		color: #ffffff;
		line-height: 40upx;
		text-align: center;
	}

	.problem-bt {
		width: 570upx;
		height: 112upx;
		line-height: 112upx;
		font-size: 34upx;
		font-weight: bold;
		color: #000000;
	}

	.problem-tb {
		width: 30upx;
		height: 30upx;
		padding-top: 38upx;
	}

	.problem-tb image {
		width: 30upx;
		height: 30upx;
	}

	.problem-nr {
		width: 100%;
		background-color: #FFFFFF;
	}

	.problem-nr .nr {
		padding-top: 30upx;
		padding-bottom: 60upx;
		padding-left: 90upx;
		padding-right: 90upx;
		font-size: 28upx;
		line-height: 40upx;
		color: #677381;
	}
</style>

<template>
	<view>

		<view class="biaotl">
			<view style="height: 100%;" v-bind:style="{  width: widthData + 'upx' }">
				<view class="biz" v-for="(item, key) in classification" :key="key">
					<view class="nroo" :class="{ xuanzl: conditions == key ? true : false }" @click="xuanz(item.category_id)">{{item.category_name}}</view>
				</view>
			</view>
		</view>
		<!-- 文章列表 -->
		<view class="wenzlieb">
			<view class="nrdiv" v-for="(item, key) in article" :key="key" @click="Nrym(item.article_id)">
				<view class="liebimg">
					<image :src="item.article_cover" />
				</view>
				<view class="liebzy">
					<view class="liebbt">
						<view class="liwlyc"><span style="color: #3a81fd;" v-show="item.article_boutique!=0">[精品]</span>{{item.article_title}}</view>
					</view>
					<view class="xiamk">
						<view class="dti1">{{item.category_name}}</view>
						<view class="dti2">{{item.created_at}}</view>
						<view class="dti3">
							<image src="../../static/images/chaktb.png" />
						</view>
						<view class="dti4">{{item.article_readingl}}</view>
					</view>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	import api from '../../common/api/api.js';
	export default {
		data() {
			return {
				//分类
				classification: [],
				//选中的分类
				conditions: 0,
				//文章
				article: [],
				//分页
				page: 1,
				//最大页数
				pageCount: 1,
				//分类宽度
				widthData: 0
			}
		},
		//页面显示时加载
		onShow() {
			this.page = 1;
			uni.showLoading({
				title: '加载中'
			});
			var stateData = uni.getStorageSync('state');
			if (stateData == '') {
				this.classification = [{
					"category_name": "全部",
					"category_id": "0"
				}];
				this.pullData();
			} else {
				this.Special('article/category');
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
			//选择分类
			xuanz: function(id) {
				uni.showLoading({
					title: '加载中'
				});
				this.conditions = id;
				//初始化
				this.page = 1;
				this.pullData2();
			},
			//获取分类数据
			pullData: function() {
				api.apiPost('article/category', '', '', 'get', (status, credentials, res) => {
					if (status) {
						this.classification = this.classification.concat(res.data);
						//分类宽度计算
						this.widthData = 150 * this.classification.length;
						this.pullData2();
					} else {
						if (credentials == 152) {
							uni.setStorageSync('state', '152');
							this.Special('article/category');
						} else {
							setTimeout(function() {
								//隐藏加载框
								uni.hideLoading();
							}, 300);
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							});
						}
					}
				});
			},
			//获取文章数据
			pullData2: function() {
				api.apiPost('article/articlelist?categoryid=' + this.conditions + "&page=" + this.page, '', '', 'get', (status,
					credentials, res) => {
					if (status) {
						this.article = res.data.article;
						//最大页数
						this.pageCount = res.page.pageCount;
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
			//分页
			loadingData: function() {
				uni.showLoading({
					title: '加载中'
				});
				this.page++;
				if (this.page > this.pageCount) {
					uni.showToast({
						title: '没有更多记录了',
						icon: 'none',
						duration: 2000
					});
				} else {
					api.apiPost('article/articlelist?categoryid=' + this.conditions + "&page=" + this.page, '', '', 'get', (status,
						credentials, res) => {
						if (status) {
							this.article = this.article.concat(res.data.article);
							//最大页数
							this.pageCount = res.page.pageCount;
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
									title: res.message,
									icon: 'none',
									duration: 2000
								});
							}
						}
					});
				}
			},
			//文章内容页
			Nrym: function(id) {
				uni.navigateTo({
					url: '/pages/article/content/content?id=' + id
				});
			},
		}
	}
</script>

<style>
	/* 分类 */
	.biaotl {
		width: 100%;
		height: 80upx;
		position: fixed;
		top: 0;
		border-bottom: 1px #E5E5E5 solid;
		overflow-y: scroll;
		background-color: #FFFFFF;
		z-index: 20;
	}

	.biaotl::-webkit-scrollbar {
		display: none;
	}

	.biz {
		width: 150upx;
		height: 77upx;
		float: left;
	}

	.nroo {
		width: 80%;
		margin-left: auto;
		margin-right: auto;
		color: #6F6F6F;
		font-size: 24upx;
		line-height: 77upx;
		text-align: center;
	}

	.xuanzl {
		color: #3A81FD;
		font-weight: bold;
		border-bottom: 10upx #3A81FD solid;
	}

	/* 列表 */
	.wenzlieb {
		width: 100%;
		padding-top: 100upx;
	}

	.nrdiv {
		width: 680upx;
		height: 200upx;
		border-bottom: 1px #F3F3F6 solid;
		margin-bottom: 30upx;
		display: flex;
		margin-left: auto;
		margin-right: auto;
	}

	.liebimg {
		width: 280upx;
		height: 180upx;
	}

	.liebimg image {
		width: 100%;
		height: 100%;
		border-radius: 14upx;
	}

	.liebzy {
		flex: 1;
		height: 100%;
		margin-left: 20upx;
	}

	.liebbt {
		width: 100%;
		height: 120upx;
		line-height: 36upx;
		color: #252525;
		font-size: 30upx;
		padding-top: 10upx;
	}

	.liwlyc {
		width: 100%;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	.xiamk {
		width: 100%;
		height: 50upx;
		display: flex;
	}

	.dti1 {
		padding-left: 12upx;
		padding-right: 12upx;
		height: 50upx;
		background-color: #F07436;
		color: #FFFFFF;
		text-align: center;
		line-height: 50upx;
		font-size: 16upx;
		border-radius: 10upx;
	}

	.dti2 {
		padding-left: 20upx;
		padding-right: 20upx;
		height: 50upx;
		color: #252525;
		text-align: center;
		line-height: 50upx;
		font-size: 24upx;
	}

	.dti3 {
		width: 50upx;
		height: 50upx;
		margin-right: 10upx;
	}

	.dti3 image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.dti4 {
		flex: 1;
		height: 50upx;
		color: #dbdbdb;
		line-height: 50upx;
		font-size: 24upx;
	}
</style>

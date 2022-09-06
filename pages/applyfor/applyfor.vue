<template>
	<view><web-view :webview-styles="webviewStyles" :src="requestUrl" v-if="According"></web-view></view>
</template>

<script>
import api from '../../common/api/api.js';
export default {
	data() {
		return {
			//访问接口
			methodsData:'',
			//地址链接
			requestUrl: '',
			//是否销毁或渲染容器
			According: false,
			//webview 的样式
			webviewStyles: {
				progress: {
					color: '#FF3333'
				}
			}
		};
	},
	//监听页面加载
	onLoad(option) {
		this.methodsData = option.methods;
		//获取到id
		this.requestUrl = option.url;
		this.pullData();
	},
	methods: {
		//拉取数据
		pullData: function() {
			api.apiPost(this.methodsData+'?url='+this.requestUrl, '', '', 'get', (status, credentials, res) => {
				if (status) {
					//获取到id
					this.requestUrl = res.data.url;
					//渲染容器
					this.According = true;
				}else{
					uni.showToast({
						title: '未知错误，请尝试退出应用重试',
						icon: 'none',
						duration: 2000
					});
				}
			});
		}
	}
};
</script>

<style></style>

<template>
    <div class="pg-component-loading">
        <div class="padding16">
            <div class="pb16 pt16">基本使用</div>
            <f-loading :loading="true"></f-loading>

            <div class="pb16 pt16">覆盖div内容</div>
            <f-loading :loading="true" mask-back-color="rgba(255,255,255,0.68)">
                <div>
                    <h1>这里是大标题</h1>
                </div>
            </f-loading>
            <div class="pb16 pt16">延迟加载(2s后开始加载)</div>
            <f-loading :loading="true" :delay="2000" mask-back-color="rgba(255,255,255,0.68)">
                <div>
                    <h1>这里是大标题</h1>
                </div>
            </f-loading>
            <div class="pb16 pt16">延迟取消加载(2s后开始加载, 1s后取消加载)</div>
            <f-loading :loading="loading4" :delay="2000">
                <div>
                    <h1>这里是大标题</h1>
                </div>
            </f-loading>
            <div class="pb16 pt16">全屏加载</div>
            <f-button inline size="small" @click="showLoading">切换加载状态</f-button>
            <f-loading :loading="loading5" full>
                <span slot="title">2s后关闭</span>
            </f-loading>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading4: true,
            loading5: false
        };
    },
    mounted() {
        setTimeout(() => {
            this.loading4 = false;
        }, 1000);
    },
    methods: {
        showLoading() {
            this.loading5 = true;
            setTimeout(() => {
                this.loading5 = false;
            }, 2000);
        }
    }
};
</script>

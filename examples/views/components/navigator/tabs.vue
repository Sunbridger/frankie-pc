<template>
    <div class="pg-component-tab">
        <div class="content-block">
            <div class="fs14">基础用法</div>
            <f-tabs :tabs="tabs"></f-tabs>
            <div class="fs14 mt40">标签栏滚动</div>
            <f-tabs :tabs="tabs1"></f-tabs>
            <div class="fs14 mt40">外部控制</div>
            <f-tabs :tabs="tabs2" :defaultActive.sync="defaultActive"></f-tabs>
            <f-button class="mt15" @click="defaultActive = 2">tab:2</f-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tabs: ['大搜车', '踢脚'],
            tabs1: ['大搜车', '弹个车', '举个手', '踢脚', '大搜车', '弹个车', '举个手', '踢脚'],
            tabs2: ['大搜车', '弹个车', '举个手', '踢脚', '大搜车', '弹个车', '举个手', '踢脚'],
            tabs3: [{ name: '大搜车' }, { name: '大搜车' }, { name: '大搜车' }, { name: '大搜车' }],
            defaultActive: 0
        };
    },
    mounted() {
        setTimeout(() => {
            this.tabs = [...this.tabs, ...['举个手', '踢脚']];
        }, 0);
    }
};
</script>
<style lang="less" scoped>
.content-block {
    width: 100%;
    margin: 0px;
}
</style>

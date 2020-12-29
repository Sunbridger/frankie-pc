<style lang="less">
.co-header {
    height: 44px;
    line-height: 44px;
    text-align: center;
    position: relative;
    background: #edf0f4;
    flex-shrink: 0;
    .back-icon {
        position: absolute;
        top: 14px;
        left: 16px;
        color: #000;
    }
}
</style>

<template>
    <div class="co-header">
        <router-link to="/" v-if="ifBack">
            <i class="el-icon-tickets back-icon"></i>
        </router-link>
        <span>{{title}}</span>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        ifBack: Boolean
    }
};
</script>

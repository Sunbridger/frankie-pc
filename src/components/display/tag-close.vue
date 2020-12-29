<template>
    <div class="f-tag-close" @click="deleteFilter">
        <span class="fs12 mr8"><slot></slot></span><f-icon :size="8" type="close"></f-icon>
    </div>
</template>

<script>
export default {
    name: 'FTagClose',
    props: {
        filterType: String, // 展示的type
        svalue: String // 真正的值
    },
    methods: {
        deleteFilter() {
            this.$emit('delete-filter', this.filterType, this.svalue);
        }
    }
};
</script>

<style lang="less">
.f-tag-close {
    background-color: #fff;
    text-align: center;
    border-radius: 4px;
    padding: 0 8px;
    color:#5E5E66;
    line-height: 28px;
    height: 28px;
    box-sizing: border-box;
    margin: 0 8px 8px 0;
    display: inline-block;
    position: relative;
}
</style>

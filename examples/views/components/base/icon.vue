<template>
    <div class="pg-component-icon">
        <div class="content-block mt20">
            <div class="icon-item" v-for="(type, index) in allIcon" :key="index">
                <f-icon class="icon-item-img ml15" :size="30" :type="type"></f-icon>
                <div class="icon-item-text">{{type}}</div>
            </div>
        </div>
    </div>
</template>
<script>
const icons = require.context('@/assets/icons', false, /\.png$/);

const allIcon = [];
icons.keys().forEach((key) => {
    allIcon.push(key.slice(2, -4));
});

export default {
    data() {
        return {
            allIcon
        };
    }
};
</script>

<style lang="less" scoped>
.pg-component-icon {
    background-color: @color-back-normal;

    .icon-item {
        display: flex;
        align-items: center;
        padding: 16px;
        box-sizing: border-box;

        .icon-item-text {
            font-size: 14px;
            margin-left: 10px;
        }
    }
}
</style>

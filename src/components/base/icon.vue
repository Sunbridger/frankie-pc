<template>
    <img
        :class="{
            'f-icon': true
        }"
        :style="{
            width: size+'px',
            height: size+'px',
        }"
        :src="require('@/assets/icons/'+ type +'.png')"
        alt
    />
</template>

<script>
export default {
    name: 'FIcon',
    props: {
        size: {
            type: [Number, String],
            default: 12
        },
        type: {
            type: String,
            required: true
        },
        // 注意: IE13 开始兼容
        color: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="less" scoped>
.f-icon {
    display: inline-block;
}
</style>

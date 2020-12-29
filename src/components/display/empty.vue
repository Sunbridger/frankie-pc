<template>
    <div class="f-empty">
        <img :class="imageClasses" :style="imageStyle" :src="emptySource" alt />
        <div class="f-empty-text" v-if="title">{{ this.title }}</div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'FEmpty',
    props: {
        title: {
            type: String,
            default: '这里似乎什么也没有'
        },
        emptySource: {
            type: String,
            default: 'https://img.souche.com/f2e/f0f2b686b6f91daa05efc60d0ae8895b.png'
        },
        imageStyle: {
            type: [String, Object],
            default: ''
        },
        imageClass: {
            type: [String, Array],
            default: ''
        }
    },
    computed: {
        imageClasses() {
            if (this.imageClass instanceof Array) {
                return ['f-empty-img', ...this.imageClass];
            } else {
                return ['f-empty-img', this.imageClass];
            }
        }
    }
};
</script>

<style lang="less">
.f-empty {
    text-align: center;
    .f-empty-img {
        width: 128px;
    }
    .f-empty-text {
        font-size: 14px;
        color: #5e5e66;
    }
}
</style>

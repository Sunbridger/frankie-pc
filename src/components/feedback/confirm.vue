<template>
    <f-modal class="f-confirm" :show="show" @close="close" :minHeight="0">
        <div class="f-toast-content">
            <h3 class="f-confirm-body fs16" v-if="content" v-html="content"></h3>
            <div class="f-confirm-body fs16" v-else>
                <slot></slot>
            </div>
            <div class="f-confirm-footer fs16 flex flex-align-center flex-justify-between">
                <div class="cancel" @click="close">{{ cancelBtn }}</div>
                <div class="sure" @click="sure">{{ sureBtn }}</div>
            </div>
        </div>
    </f-modal>
</template>

<script>
import FModal from './modal';

export default {
    name: 'FConfirm',
    props: {
        content: {
            type: String,
            default: ''
        },
        cancelBtn: {
            type: String,
            default: '取消'
        },
        sureBtn: {
            type: String,
            default: '确认'
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    components: {
        FModal
    },
    methods: {
        close() {
            this.$emit('update:show', false);
            this.$emit('on-close', false);
        },
        sure() {
            this.$emit('on-sure');
        }
    }
};
</script>

<style lang="less">
.f-toast-content {
    width: 300px;

    .f-confirm-body {
        padding: 32px 20px 28px;
        text-align: center;
        border-bottom: 1px solid @color-back-line;
    }
    .f-confirm-footer {
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-bottom: 1px solid @color-back-line;

        > div {
            flex: 1;
            height: 100%;
            line-height: 52px;
        }
    }
    .sure {
        color: @color-primary;
        border-left: 1px solid @color-back-line;
    }
}
</style>

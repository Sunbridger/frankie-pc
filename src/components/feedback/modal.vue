<template>
    <div
        class="f-modal relative"
        v-transfer-dom
        :style="{
            display: domShow ? 'block' : 'none'
        }"
    >
        <div
            :class="{
                'f-mask': true,
                'f-mask--hidden': !maskShow
            }"
            @click="close"
        ></div>
        <div
            :class="{
                'f-modal-content': true,
                'f-modal-content--center': placement === 'center',
                'f-modal-content--bottom': placement === 'bottom',
                'f-modal-content--top': placement === 'top',
                'f-modal-content--hidden': !maskShow,
                [contentClass]: contentClass
            }"
            :style="{
                'margin-top': `${marginTop}px`,
                'min-height': `${minHeight}px`
            }"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { enumValidator } from '@/util';
import transferDom from '@/directives';

export default {
    name: 'FModal',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        // modal 框的样式
        contentClass: {
            type: String,
            default: ''
        },
        placement: {
            type: String,
            validator: enumValidator(['center', 'bottom', 'top']),
            default: 'center'
        },
        marginTop: {
            type: [String, Number],
            default: 0
        },
        minHeight: {
            type: [String, Number],
            default: 200
        }
    },
    data() {
        return {
            domShow: false,
            maskShow: false,
            curBodyOverFlowStyle: ''
        };
    },
    watch: {
        show: {
            handler: function (val) {
                if (val) {
                    this.curBodyOverFlowStyle = document.body.style.overflow;
                    document.body.style.overflow = 'hidden';
                    this.domShow = true;

                    setTimeout(() => {
                        this.maskShow = true;
                    }, 20);
                } else {
                    this.maskShow = false;
                    setTimeout(() => {
                        this.domShow = false;
                        document.body.style.overflow = this.curBodyOverFlowStyle || 'visible';
                    }, 200);
                }
            },
            immediate: true
        }
    },
    methods: {
        close() {
            this.$emit('update:show', false);
            this.$emit('close');
        }
    },
    directives: {
        transferDom
    }
};
</script>

<style lang="less" scoped>
.f-modal {
    position: absolute;
    top: 0;

    &.hidden {
        display: none;
    }

    .f-mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: @zindex-modal;
        overflow: auto;
        outline: 0;
        -webkit-overflow-scrolling: touch;
        background-color: @color-back-mask;
        transition: all 0.2s;

        &.f-mask--hidden {
            background-color: rgba(#000, 0);
        }
    }

    .f-modal-content {
        position: fixed;
        background-color: #fff;
        z-index: @zindex-modal;
        min-width: 200px;
        opacity: 1;

        overflow: hidden;
        transition: all 0.2s;

        &--center {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transform-origin: 0 0;
            border-radius: @border-radius-lg;

            &.f-modal-content--hidden {
                transform: scale(0.001);
                opacity: 0;
            }
        }

        &--bottom {
            bottom: 0;
            left: 0;
            width: 100%;
            border-radius: @border-radius-lg @border-radius-lg 0 0;

            &.f-modal-content--hidden {
                transform: translateY(100%);
                opacity: 0;
            }
        }
        &--top {
            top: 0;
            left: 0;
            width: 100%;
            border-radius: 0 0 @border-radius-lg @border-radius-lg;
            &.f-modal-content--hidden {
                transform: translateY(-100%);
                opacity: 0;
            }
        }
    }
}
</style>

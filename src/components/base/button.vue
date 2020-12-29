<template>
    <button
        @click="click"
        :class="{
        'f-button': true,
        [`f-button--${type}`]: type,
        [`f-button--${size}`]: size,
        'f-button--line': mode==='line',
        'f-button--text': mode==='text',
        'f-button--frame': mode === 'frame',
        'f-button--inline': inline,
        'f-button--disabled': disabled
    }"
        :disabled="disabled"
    >
        <slot></slot>
    </button>
</template>

<script>
import { enumValidator } from '@/util';

export default {
    name: 'FButton',
    props: {
        type: {
            type: String,
            validator: enumValidator(['default', 'success', 'link', 'primary']),
            default: 'primary'
        },
        size: {
            type: String,
            validator: enumValidator(['normal', 'small', 'xsmall']),
            default: 'normal'
        },
        mode: {
            type: String,
            validator: enumValidator(['default', 'line', 'text', 'frame']),
            default: 'default'
        },
        inline: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        click(val) {
            this.$emit('click', val);
        }
    }
};
</script>

<style lang="less" scoped>
@import '~@/theme/variables';

@normal-button-height: 44px;
@small-button-height: 36px;
@xsmall-button-height: 32px;

.f-button {
    width: 100%;
    outline: 0;
    border: 0;
    font-weight: 650;
    background-color: rgba(#000, 0);
    padding: 0 16px;
    box-sizing: border-box;

    // 背景色, 文字色
    @success-list: @color-success, @color-text-anti;
    @primary-list: @color-primary, @color-text-anti;
    @link-list: @color-link, @color-text-anti;

    .buttonType() {
        success: @success-list;
        primary: @primary-list;
        link: @link-list;
    }

    each(.buttonType(), .(@v, @k) {
        // 非线性
        &--@{k} {
            border: 0;
            background-color: extract(@v, 1);
            color: extract(@v, 2);
            &:active {
                background-color: darken(extract(@v, 1), 5);
                color: extract(@v, 2);
            }
        }
        // 线性
        &--@{k}&--line{
            border: 1px solid lighten(extract(@v, 1), 20);
            background-color: lighten(extract(@v, 1), 40);
            color: extract(@v, 1);
            &:active {
                background-color: lighten(extract(@v, 1), 35);
            }
        }

        // 文字
        &--@{k}&--text {
            border: 0;
            background-color: inherit;
            color: extract(@v, 1);
            &:active {
                color: lighten(extract(@v, 1), 15);
            }
        }

        // 边框模式
        &--@{k}&--frame {
            border: 1px solid extract(@v, 1);
            background-color: rgba(#fff,0);
            color: extract(@v, 1);
            &:active {
                background-color: rgba(#fff,0);
            }
        }
    });

    @default-list: @color-default, @color-text-body;
    &--default {
        border: 0;
        background-color: extract(@default-list, 1);
        color: extract(@default-list, 2);
        &:active {
            background-color: darken(extract(@default-list, 1), 5);
            color: extract(@default-list, 2);
        }
    }
    &--default&--line {
        border: 1px solid lighten(extract(@default-list, 2), 35);
        background-color: lighten(extract(@default-list, 1), 40);
        color: extract(@default-list, 2);
        &:active {
            background-color: lighten(extract(@default-list, 2), 57);
        }
    }
    &--default&--text {
        border: 0;
        background-color: inherit;
        color: extract(@default-list, 2);
        &:active {
            color: lighten(extract(@default-list, 2), 15);
        }
    }
    &--default&--frame {
        border: 1px solid lighten(extract(@default-list, 2), 35);
        background-color: rgba(#fff, 0);
        color: extract(@default-list, 2);
        &:active {
            color: extract(@default-list, 2);
        }
    }

    &--normal {
        height: @normal-button-height;
        border-radius: @normal-button-height / 2;
    }

    &--small {
        height: @small-button-height;
        border-radius: @small-button-height / 2;
    }

    &--xsmall {
        height: @xsmall-button-height;
        border-radius: @small-button-height / 2;
    }

    &--inline {
        width: auto;
    }

    &--disabled {
        overflow: hidden;
        position: relative;
        border: 0;
        &::before {
            content: '';
            display: block;
            position: absolute;
            z-index: 10;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(#fff, 0.55);
        }
    }
}
</style>

<template>
    <div class="f-tag__container">
        <span class="f-tag__content__back">
            <slot></slot>
        </span>
        <div
            ref="fTag"
            :class="{
            'f-tag': true,
            [`f-tag--${type}`]: type,
            [`f-tag--fill`]: filled,
        }"
            :style="{
            color: filled && type !== 'default' ? '#fff' : color,
            borderColor: borderColor|| color ,
            backgroundColor: backgroundColor || (filled ?  color : false),
            padding: noPadding ? 0 : undefined
        }"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { enumValidator } from '@/util';

export default {
    name: 'FTag',
    props: {
        type: {
            type: String,
            validator: enumValidator(['primary', 'default', 'success', 'link']),
            default: 'primary'
        },
        color: {
            type: String
        },
        backgroundColor: {
            type: String
        },
        borderColor: {
            type: String
        },
        filled: {
            type: Boolean,
            default: false
        },
        noPadding: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="less" scoped>
@import '~@/theme/variables';

.f-tag__container {
    display: inline-block;
    position: relative;
    margin-right: 4px;
    font-size: 10px;

    .f-tag__content__back {
        padding: 3px 5px;
        line-height: 1;
        display: inline-block;
        opacity: 0;
    }
}

.f-tag {
    border-radius: @border-radius-sm * 2;
    border: 2px solid #000;

    padding: 4px 8px;
    line-height: 1;
    font-size: 20px;
    transform: scale(0.5);
    transform-origin: 0 0;
    font-weight: 500;

    position: absolute;
    left: 0;
    top: 0;
    white-space: nowrap;

    .tagType() {
        primary: @color-primary, @color-label-stroke;
        success: @color-success, @color-success;
        link: @color-link, @color-link;
    }

    each(.tagType(), .(@v, @k) {
        &--@{k} {
            color: extract(@v, 1);
            border-color: extract(@v, 2);
        }
        &--@{k}&--fill {
            color: #fff;
            background-color: extract(@v, 1);
            border-color: extract(@v, 1);
        }
    });

    &--default {
        color: #5e5e66;
        border-color: #e3e3e6;
        background-color: #f7f8fa;
    }
}
</style>

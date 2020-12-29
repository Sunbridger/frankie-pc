<template>
    <div class="f-input">
        <div class="list-item flex flex-align-center" @click="$emit('click')">
            <div v-if="label" class="f-label fs16 mr16">{{ label }}</div>
            <input v-if="type !== 'textarea'" class="fs16" :value="value" v-bind="$attrs" @input="change" />
            <textarea v-else class="fs16" :value="value" v-bind="$attrs" @input="change" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'FInput',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        label: {
            type: String,
            default: ''
        },
        value: {
            type: [String, Number],
            default: ''
        },
        type: {
            type: String,
            default: '' // textarea
        }
    },
    methods: {
        change(e) {
            this.$emit('change', e.target.value);
        }
    }
};
</script>

<style lang="less">
@import '~@/theme/variables';

.f-input {
    background: #fff;

    .list-item {
        margin: 0 16px;
        padding: 18px 0;
        height: 100%;
        border-bottom: 1px solid @color-back-line;
        box-sizing: border-box;

        .f-label {
            flex: 0 0 80px;
            line-height: 1em;
        }
        input,
        textarea {
            flex: 1;
            outline: none;
            border: 0;
            resize: none;
            padding: 0;

            &::placeholder {
                font-size: 16px;
                color: @color-text-caption;
                height: 100%;
                line-height: 100%;
                transform: translateY(2px);
            }
        }
    }
}
</style>

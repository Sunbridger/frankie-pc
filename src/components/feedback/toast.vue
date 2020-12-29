<template>
    <div class="f-toast" v-show="show" :style="stylePosition">
        <slot>{{text}}</slot>
    </div>
</template>

<script>
export default {
    name: 'FToast',
    props: {
        time: {
            type: [Number, String],
            default: 2000
        },
        value: {
            type: Boolean,
            default: false
        },
        position: {
            type: String,
            default: 'middle'
        },
        text: {
            type: String
        }

    },
    data() {
        return {
            timeout: null,
            show: false
        };
    },
    computed: {
        stylePosition() {
            switch (this.position) {
                case 'middle':
                    return 'top: 50%;left: 50%;transform: translate(-50%, -50%);';

                case 'top':
                    return 'top: 0;left: 50%;transform: translateX(-50%);';

                case 'bottom':
                    return 'bottom: 0;left: 50%;transform: translateX(-50%);';

                default:
                    return 'top: 50%;left: 50%;transform: translate(-50%, -50%);';
            }
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(v) {
                this.show = v;
            }
        },
        show(val) {
            if (val) {
                this.$emit('input', true);
                this.$emit('on-show', val);
                this.timeout && clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.show = false;
                    this.$emit('input', false);
                    this.$emit('on-hide', val);
                }, Number(this.time));
            }
        }
    }
};
</script>

<style lang="less" scoped>

@import '../../theme/variables.less';

.f-toast {
    position: fixed;
    max-height: 72px;
    max-width: 160px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, .9);
    color: #fff;
    text-align: center;
    font-size: @font-size-xl;
    padding: @box-padding-md;
    border-radius: @border-radius-md;
    line-height: 20px;
    margin: 0;
    word-wrap: normal;
    word-wrap: break-word;
    word-break: break-all;
    z-index: @zindex-affix;
}
</style>

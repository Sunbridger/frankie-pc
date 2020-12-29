<template>
    <div class="f-loading">
        <slot></slot>
        <div
            :class="imgClassObject"
            :style="{
                backgroundColor: maskBackColor
            }"
        >
            <img class="f-loading-img" src="https://img.souche.com/f2e/29816c5630ba3322fb0d8afc3bf6128c.gif" alt />
            <slot name="title"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FLoading',
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        delay: {
            type: Number,
            default: 0
        },
        full: {
            type: Boolean,
            default: false
        },
        maskBackColor: {
            type: String,
            default: '#fff'
        }
    },
    data() {
        return {
            loadingShow: false,
            loadingTimeHandler: null
        };
    },
    computed: {
        imgClassObject() {
            return {
                'f-loading-mask': true,
                'f-loading-mask--hidden': !this.loadingShow,
                'f-loading-mask--nocontent': !this.$slots.default,
                'f-loading-mask--full': this.full
            };
        }
    },
    watch: {
        loading: {
            handler(val) {
                if (this.loadingTimeHandler) {
                    clearTimeout(this.loadingTimeHandler);
                    this.loadingTimeHandler = null;
                }

                if (val) {
                    this.loadingTimeHandler = setTimeout(() => {
                        this.loadingShow = true;
                    }, this.delay);
                } else {
                    this.loadingTimeHandler = setTimeout(() => {
                        this.loadingShow = false;
                    }, 200);
                }
            },
            immediate: true
        }
    }
};
</script>

<style lang="less">
.f-loading {
    position: relative;
    display: inline-block;
    width: 100%;

    min-height: 24px;

    &--full {
        .f-loading-mask {
            position: fixed;
            height: 100vh;
            width: 100%;
        }
    }

    .f-loading-mask {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: rgba(#fff, 0.68);

        &--hidden {
            display: none;
        }

        .f-loading-img {
            height: 24px;
            margin-top: 20px;
            transform: translateY(-10px);
        }

        &--nocontent {
            background-color: rgba(#000, 0);
        }

        &--full {
            position: fixed;
        }

        .f-loading-img {
            height: 24px;
        }
    }
}
</style>

<template>
    <div class="f-tabs">
        <div class="f-tags--wrap flex flex-align-center flex-justify-between" :style="tabStyle">
            <div
                class="tag fs14"
                :style="tagStyle"
                :class="{ active: index === active }"
                ref="tag"
                v-for="(value, index) in tabs"
                :key="index"
                @click="choose(index, value)"
            >
                {{ value.name || value }}
            </div>
            <!-- 滑块 -->
            <div class="f-tab--line" ref="line" :style="{ width: lineWidth + 'px', ...lineStyle }"></div>
        </div>
        <!-- <div class="content">
            <slot></slot>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'FTabs',
    data() {
        return {
            lineWidth: 0,
            active: this.defaultActive || 0,
            /*** tag 参数 */
            tagsWidthArr: []
        };
    },
    props: {
        tabs: {
            type: [Array, Object],
            default: () => []
        },
        defaultActive: {
            type: Number,
            default: 0
        },
        tabStyle: {
            type: Object,
            default: () => ({})
        },
        lineStyle: {
            type: Object,
            default: () => ({})
        },
        tagStyle: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        tabsArr() {
            if (!Array.isArray(this.tabs)) {
                return this.tabs.map(item => item.name);
            }
            return this.tabs;
        }
    },
    watch: {
        defaultActive: function(value) {
            this.active = value;
            this.computedLine();
        },
        tabsArr: function() {
            this.$nextTick(this.initTagWidth);
        }
    },
    methods: {
        // 选择tag
        choose(index, value) {
            this.active = index;
            this.computedLine();
            this.$emit('update:defaultActive', index);
            this.$emit('change', index, value, this.$refs.tag[index]);
        },
        // 获取所有 tag 宽度
        initTagWidth() {
            if (this.$refs.tag) {
                this.tagsWidthArr = this.$refs.tag.map(ele => ele.clientWidth);
            }
        },
        // 下划线计算
        computedLine() {
            if (this.tagsWidthArr.length) {
                const tagWidth = this.tagsWidthArr[this.active];
                const move = this.$refs.tag[this.active].offsetLeft;
                this.translateX(tagWidth, move);
            }
        },
        // 样式改变
        translateX(width, move) {
            if (this.$refs.line) {
                this.$refs.line.style.transform = `translateX(${move}px)`;
                this.$refs.line.style.width = `${width}px`;
            }
        },
        // 初始化
        init() {
            this.initTagWidth();
            this.computedLine();
        }
    },
    mounted() {
        // 当浏览器窗口被调整大小时
        window.addEventListener('resize', () => {
            this.init();
        });
        this.init();
    }
};
</script>
<style lang="less" scoped>
@import '~@/theme/variables';

.f-tabs {
    border-bottom: 1px solid @color-back-line;
    height: 52px;
    line-height: 38px !important;
    overflow-y: hidden;
    box-sizing: border-box;
    z-index: 123 !important;
    padding: 0 15px;
}
.f-tags--wrap {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow-x: auto;

    &::-webkit-scrollbar {
        display: none;
    }

    .tag {
        color: @color-text-caption;
        flex: none;
        margin-right: 20px;
        line-height: 50px;
    }

    .tag:nth-last-child(2) {
        margin-right: 0;
    }

    .active {
        font-weight: bold;
        color: #000;
    }
}
.f-tab--line {
    height: 3px;
    background: @color-primary;
    transform: translateX(0);
    transition: transform 0.2s;
    transition: all 0.2s;
    position: absolute;
    left: 0;
    bottom: 0;
    border-radius: 2.25px;
}
</style>

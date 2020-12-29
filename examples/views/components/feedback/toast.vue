<style lang="less" scoped>
    .pg-component-toast {
        .box-demo {
            position: relative;
        }
        .btn-icon {
            margin-bottom: 20px;
        }
    }
</style>

<template>
    <div class="pg-component-toast">
        <div class="content-block">
            <f-button size="small" type="primary" class="btn-icon" @click="show1 = true">open default</f-button>
            <f-button size="small" type="link" class="btn-icon" @click="show2 = true">open top</f-button>
            <f-button size="small" type="success" class="btn-icon" @click="show3 = true">open bottom</f-button>

            <f-button size="small" type="link" class="btn-icon" @click="showByPlugin">插件调用</f-button>

            <f-button size="small" type="primary" class="btn-icon" @click="closeIt">插件关闭提示</f-button>

            <div class="box-demo">
                <f-toast @on-show="showFn" @on-hide="hideFn" v-model="show1" position="middle">default</f-toast>
            </div>
            <div class="box-demo">
                <f-toast v-model="show2" position="top">top</f-toast>
            </div>
            <div class="box-demo">
                <f-toast v-model="show3" position="bottom">bottom</f-toast>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        time: {
            type: [Number, String],
            default: 2000
        }
    },
    data() {
        return {
            show1: false,
            show2: false,
            show3: false,
            text1: 'open',
            text2: 'open',
            text3: 'open',
            timeout: null
        };
    },
    mounted() {

    },
    methods: {
        showFn(v) {
            console.log('show', v);
        },
        hideFn(v) {
            console.log('close', v);
        },
        closeIt() {
            this.$fk.toast.hide();
        },
        showByPlugin() {
            this.$fk.toast.show({
                text: '插件调用的', // 必填
                time: 200000,
                position: 'middle',
                onShow: () => {
                    console.log('您打开了toast');
                },
                onHide: () => {
                    console.log('您关闭了toast');
                }
            });
        }
    },
    watch: {

    }
};
</script>

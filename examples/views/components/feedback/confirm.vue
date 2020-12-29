<template>
    <div class="pg-component-confirm">
        <div class="wrap">
            <f-button @click="show = true">基础用法</f-button>
            <f-button class="mt20" @click="show2 = true">基础用法:slot</f-button>
            <f-button class="mt20" @click="show1 = true">基础用法: .sync</f-button>
            <f-button class="mt20" @click="handle">全局调用:基础用法</f-button>
            <f-button class="mt20" @click="handle1">全局调用: 手动赋值关闭</f-button>
            <f-confirm
                :show="show"
                @on-close="show = false"
                @on-sure="show = false"
                content="请拨打服务热线反馈您的问题</br>服务时间：09:00～18:00"
            ></f-confirm>
            <f-confirm :show="show2" @on-close="show2 = false" @on-sure="show2 = false"
                ><p>请拨打服务热线反馈您的问题，服务时间：09:00～18:00</p></f-confirm
            >
            <f-confirm
                :show.sync="show1"
                @on-sure="show1 = false"
                content="请拨打服务热线反馈您的问题</br>服务时间：09:00～18:00"
            ></f-confirm>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: false,
            show1: false,
            show2: false
        };
    },
    methods: {
        handle() {
            this.$fk.confirm.show({ content: '函数调用' });
        },
        handle1() {
            this.$fk.confirm.show({
                content: '函数调用1',
                cancelBtn: '取消哈',
                sureBtn: '点击哈',
                onCancel(val, hide) {
                    console.log(val);
                    hide();
                },
                onSure() {
                    console.log('干嘛');
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
@import '~@/theme/variables';

.wrap {
    width: 100%;
    margin: 16px;
}
</style>

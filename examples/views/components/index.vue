<style lang="less">
.pg-component-index {
    display: flex;
    flex-direction: column;
    .component-container {
        background: #fff;
        min-height: calc(100vh - 44px);
    }
}
</style>

<template>
    <div class="pg-component-index">
        <co-header :title="title" ifBack></co-header>
        <vue-scrollbar>
            <router-view class="flex component-container"></router-view>
        </vue-scrollbar>
    </div>
</template>

<script>
import CoHeader from 'examples/components/common/header';
import { title } from 'examples/core';

export default {
    components: {
        CoHeader
    },
    computed: {
        title() {
            const componentName = this.$route.path.slice(1);
            return title(componentName);
        }
    }
};
</script>

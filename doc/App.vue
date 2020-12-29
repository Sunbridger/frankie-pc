<style lang="less">
.pg-app {
    width: 100vw;
    height: 100vh;
    .app {
        &-wrapper {
            min-width: @min-page-width;
        }
        &-container {
            height: calc(100vh - @page-header-height);
        }
    }
}
@media screen and (max-width: 500px) {
    .co-templates-side {
        > div:first-child {
            display: none;
        }
    }
}
</style>

<template>
    <vue-scrollbar class="pg-app" :settings="settings" ref="scrollbar">
        <div class="app-wrapper">
            <co-header></co-header>
            <keep-alive>
                <transition name="doc-fade" mode="out-in">
                    <router-view class="app-container" />
                </transition>
            </keep-alive>
        </div>
    </vue-scrollbar>
</template>

<script>
import CoHeader from 'components/common/header';

export default {
    name: 'app',
    data() {
        return {
            settings: {
                suppressScrollY: true
            }
        };
    },
    components: {
        CoHeader
    }
};
</script>

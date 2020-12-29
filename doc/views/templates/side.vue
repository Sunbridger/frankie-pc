<style lang="less">
.co-templates-side {
    display: flex;
    & > div {
        height: 100%;
    }
    .component-col,
    .component-sidebar,
    .component-main {
        height: 100%;
    }
    .component-sidebar {
        border-right: 1px solid #eee;
    }
    .component-main {
        display: flex;
        flex-direction: column;
    }
    .main-view {
        flex: 1;
        padding: 32px;
    }
    .iframe-wrapper {
        padding: 32px;
        box-sizing: border-box;
        iframe {
            width: 330px;
            height: calc(100% - 24px);
        }
    }
    .iframe-window {
        border: 1px solid #eee;
        box-shadow: 0 0 5px #eee;
        border-radius: 4px;
        height: 660px;
        max-height: 100%;
    }
    .iframe-tools {
        background: #edf0f4;
    }
    .iframe-btn {
        .size(12px);
        margin-right: 10px;
        border-radius: 50%;
        &:nth-child(1) {
            background: red;
        }
        &:nth-child(2) {
            background: #ffe109;
        }
        &:nth-child(3) {
            background: #1dbf6e;
        }
    }
}
</style>

<template>
    <div class="co-templates-side">
        <el-row class="flex1">
            <el-col class="component-col" :span="5">
                <vue-scrollbar class="component-sidebar relative" :settings="settings">
                    <co-side-nav
                        :pageName="pageName"
                        :navList="navList"></co-side-nav>
                </vue-scrollbar>
            </el-col>
            <el-col class="component-col" :span="19">
                <vue-scrollbar  class="component-main relative" ref="scrollbar">
                    <transition name="doc-fade" mode="out-in">
                        <router-view
                            class="main-view"
                            @transitionend.native="scrollbarUpdate($refs.scrollbar)"></router-view>
                    </transition>
                    <co-footer></co-footer>
                </vue-scrollbar >
            </el-col>
        </el-row>
        <div class="iframe-wrapper flex flex-justify-center flex-align-center">
            <div class="iframe-window">
                <ul class="iframe-tools padding6 pl12 flex">
                    <li class="iframe-btn"></li>
                    <li class="iframe-btn"></li>
                    <li class="iframe-btn"></li>
                </ul>
                <iframe :src="examplesUrl" frameborder="0"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
import CoFooter from 'components/common/footer';
import CoSideNav from 'components/common/side-nav';
import map from 'doc/map';
import scrollbarMixin from 'doc/core/mixins/scrollbar';

export default {
    mixins: [scrollbarMixin],
    components: {
        CoFooter,
        CoSideNav
    },
    data() {
        return {
            settings: {
                suppressScrollX: true
            }
        };
    },
    computed: {
        pageName() {
            const name = this.$route.path;
            return name.split('/')[1];
        },
        navList() {
            const navConf = map.find(pageConf => pageConf.pageName === this.pageName);
            return navConf.nav;
        },
        componentName() {
            const { name, path } = this.$route;
            const navItemName = name.split('-')[0];
            if (this.pageName === 'components' && navItemName === 'components') {
                return path.split('/')[2];
            }
            return '';
        },
        examplesUrl() {
            const projectBaseUrl = `${window.location.origin}${window.location.pathname}`
                .replace(/\/(index(\.html)?)?$/, '');
            const exampleBaseUrl = `${projectBaseUrl}/examples#/`;
            return this.componentName ? `${exampleBaseUrl}${this.componentName}` : exampleBaseUrl;
        }
    }
};
</script>

<style lang="less">
.co-header {
    height: @page-header-height;
    padding: 0 32px;
    border-bottom: 1px solid #e6e6e6;
    box-shadow: 0 1px 6px #eee;
    .header-logo {
        min-width: @min-sidebar-width;
    }
    .el-menu.el-menu--horizontal {
        border: 0;
    }
    .header-version {
        line-height: calc(@page-header-height - 3px);
        outline: 0;
    }
}
</style>

<template>
    <el-row class="co-header flex bg-white">
        <el-col :span="5" class="header-logo flex flex-align-center">
            <img class="vertical-middle"
                src="~images/common/logo.png" alt="logo" height="32">
            <span class="pl8 ellipsis">frankie</span>
        </el-col>
        <el-col :span="19" class="header-nav flex flex-justify-end flex-align-center">
            <el-menu
                mode="horizontal"
                :default-active="activeIndex"
                router>
                <el-menu-item v-for="page in map"
                    :key="page.pageName"
                    :index="`/${page.pageName}`">{{page.alias}}</el-menu-item>
            </el-menu>
            <el-dropdown @command="goVersion">
                <span class="header-version fs14 ml16 mr24">
                    {{version}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        v-for="version in versions"
                        :key="version"
                        :command="version">{{version}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <a href="https://git.souche-inc.com/finance-f2e-components/frankie" target="_blank">
                <img class="cursor vertical-middle"
                src="~images/common/gitlab-logo.png" width="16" height="16">
            </a>
        </el-col>
    </el-row>
</template>

<script>
import { version } from 'root/package.json';
import map from 'doc/map/index';

export default {
    data() {
        return {
            version,
            map,
            versions: []
        };
    },
    methods: {
        goVersion(tag) {
            window.open(`https://fedoc.souche-inc.com/frankie/${tag}/index.html`, '_blank');
        }
    },
    computed: {
        activeIndex() {
            return this.$route.path.replace(/^(\/[^/]+).*/, (m, p) => p);
        }
    },
    created() {
        this.$api.robben.getVersions({
            groupName: '金融-直销项目',
            projectName: 'frankie'
        }).then((res) => {
            this.versions = res;
        });
    }
};
</script>

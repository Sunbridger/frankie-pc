<style lang="less">
.co-side-nav {
    padding: 32px;
    .lh40 {
        line-height: 40px;
    }
    .lh16 {
        line-height: 16px;
    }
    a:hover {
        color: #3eaf7c;
    }
    .router-link-active {
        color: #3eaf7c;
    }
}
</style>

<template>
    <ul class="co-side-nav">
        <li class="lh40"
            v-for="(nav, index) in navList"
            :key="index">
            <div v-if="nav.modules">
                <div class="fs16 text-bold text-title">{{nav.alias}}</div>
                <div class="pt14"
                    v-for="(group, index) in nav.modules"
                    :key="index">
                    <div class="fs12 lh16 text-hint">{{group.alias}}</div>
                    <ul>
                        <li v-for="(item, index) in group.children"
                            :key="index">
                            <router-link class="fs14 text-body"
                                v-if="item.path"
                                :to="`/${pageName}/${item.name}`">{{item.alias}}</router-link>
                            <div class="fs14 text-body" v-else>{{item.alias}}</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else-if="nav.children">
                <div class="fs16 text-bold text-title">{{nav.alias}}</div>
                <ul>
                    <li v-for="(item, index) in nav.children"
                        :key="index">
                        <router-link class="fs14 text-body"
                            v-if="item.path"
                            :to="`/${pageName}/${item.name}`">{{item.alias}}</router-link>
                        <div class="fs14 text-body" v-else>{{item.alias}}</div>
                    </li>
                </ul>
            </div>
            <div v-else></div>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        pageName: String,
        navList: Array
    }
};
</script>

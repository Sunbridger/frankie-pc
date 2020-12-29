<template>
    <div class="pg-component-video">
        <div style="width: 100%;">
            <f-video :videoData="videoData" class="video"></f-video>
            <h3 class="fs12 text-center m50">播放后向下滑试试...</h3>
            <div v-for="i in new Array(100)" :key="i" style="opacity: 0;">i</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            videoData: {
                clickToken: 'a_Yr40rBbrbw_1585726815704_a08014af3b17a04ac8f9ac3f59f5b4ec',
                countNum: 248,
                duration: '02’42”',
                name: '2019款 帝豪GS 1.4T CVT雅 国VI',
                source: [
                    {
                        definition: '原画质',
                        url: 'http://mp4-input.oss-cn-hangzhou.aliyuncs.com/material/2020/20200401/wKaGQQH0KJ.mp4'
                    },
                    {
                        definition: '高画质',
                        url:
                            'http://res.souche.com/material/videos/Act-ss-mp4-hd/wKaGQQH0KJ/55275b1548df41fd83b9d4d0c7575b47_wKaGQQH0KJ.mp4'
                    }
                ],
                thumb: 'http://img.souche.com/20200401/jpg/c610de768bc78b4e05acc0da25a4a81a.jpg?x-oss-process=image/resize,p_50',
                player: 'http://img.souche.com/20200401/jpg/c610de768bc78b4e05acc0da25a4a81a.jpg?x-oss-process=image/resize,p_50',
                src: 'http://mp4-input.oss-cn-hangzhou.aliyuncs.com/material/2020/20200401/wKaGQQH0KJ.mp4'
            }
        };
    }
};
</script>
<style lang="less" scoped></style>

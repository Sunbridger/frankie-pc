## video

当前只兼容 app 内播放， 视频 video 标签播放半屏固定，如若在 app 内使用，需开启 webview h5 视频内联播放，
若在外部使用比如微信啥的，也提供了支持原生属性修改 video 兼容性

```
比如：
<f-video
    playsinline
    webkit-playsinline
    x5-video-player-type="h5"
    .
    .
    .等等
></f-video>
```

#### props

| 属性      | 类型   | 默认 | 说明                           |
| --------- | ------ | ---- | ------------------------------ |
| videoData | Object | {}   | 视频数据字段                   |
| network   | Number | 0    | 网络状态 0 为 wifi 1 为非 wifi |
| navBar    | Number | 65   | 客户端头部导航高度             |
| top       | Number | 0    | 小窗口距离头部                 |

#### videoData

| 属性   | 类型   | 默认 | 说明     |
| ------ | ------ | ---- | -------- |
| player | String | -    | 封面     |
| src    | String | -    | 视频链接 |

#### events

| 事件名        | 说明         | 返回值    |
| ------------- | ------------ | --------- |
| getDeviceData | 获取网络状态 | -         |
| on-pause      | 视频暂停     | Boolean   |
| fullScreen    | 全屏播放     | Component |

:::demo 播放器
使用说明

```html
<template>
    <div class="pg-component-video">
        <div style="width: 100%;">
            <f-video :videoData="videoData" class="video"></f-video>
            <h3 class="fs12" style="margin-top: 40px;">播放后向下滑试试...</h3>
            <div v-for="i in new Array(50)" :key="i" style="opacity: 0;">i</div>
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
```

:::

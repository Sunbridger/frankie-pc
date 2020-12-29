<template>
    <!-- 当前只兼容app内播放， 视频video标签播放半屏固定 -->
    <div class="f-video" :class="{ isIphoneX: isIphoneXSeries }" ref="videoDiv">
        <video
            :class="{ fixed: showSmallVideo }"
            :style="{ top: (showSmallVideo ? top + 12 : 0) + 'px' }"
            :src="videoData.src | toHttps"
            width="100%"
            ref="videoDom"
            :playsinline="true"
            :webkit-playsinline="true"
            x5-video-player-type="h5"
            v-bind="$attrs"
            @click="fullScreen"
        ></video>
        <!-- 封面图 -->
        <img class="f-player" :src="videoData.player | toHttps" alt="" v-if="!firstPlayed" />
        <!-- 小窗口叉叉 -->
        <div class="f-small-video-close" :style="{ top: top + 12 + 'px' }" v-if="showSmallVideo" @click="smallVideoClose">
            <img src="@/assets/icons/smallVideoClose.png" alt="" />
        </div>
        <!-- 进度条 -->
        <div class="f-progress-bar" :style="{ top: videoClientHeight + 'px' }">
            <div class="f-progress" :style="{ width: progress.width }"></div>
        </div>
        <!-- 总时间以及视频全屏按键 -->
        <div class="f-controls" :style="{ top: videoClientHeight - 30 + 'px' }" v-if="!pause" @click="fullScreen(true)">
            <div class="f-duration">{{ videoDuration }}</div>
            <img class="f-fullscreen" src="@/assets/icons/fullscreen.png" alt="" />
        </div>
        <!-- 播放按钮 -->
        <div class="f-play-hot-area" @click="videoOperate">
            <img class="f-pause" :style="{ opacity: Number(pause) }" src="@/assets/icons/play.png" alt="" />
        </div>
        <!-- 网络状态 -->
        <div class="f-network" v-if="network === 1">
            当前非WIFI播放
        </div>
    </div>
</template>

<script>
import util from '@/util';
import filters from '@/filters';

export default {
    name: 'FVideo',
    props: {
        videoData: {
            type: Object,
            default: () => ({})
        },
        // 网络状态 0 为 wifi 1为非wifi
        network: {
            type: Number,
            default: 0
        },
        // 客户端头部导航高度
        navBar: {
            type: Number,
            default: 65
        },
        // 小窗口距离头部
        top: {
            type: Number,
            default: 90
        }
    },
    data() {
        return {
            firstPlayed: false, // 是否第一次已经播放过
            pause: true, // 暂停
            videoClientHeight: 0, // 视频高度
            duration: 0, // 视频总时长
            currentTime: 0, // 当前播放时间，非绑定
            progress: {
                // 进度条
                width: 0
            },
            slideOut: false, // 视频是否滑出可视区域
            manualClose: false
        };
    },
    filters: {
        toHttps: filters.toHttps
    },
    computed: {
        isIphoneXSeries() {
            return util.isIphoneX || util.isIphoneXRXMax;
        },
        showSmallVideo() {
            return this.slideOut && !this.pause && !this.manualClose;
        },
        videoDuration() {
            if (this.duration) {
                const second = Math.round(this.duration % 60);
                let minute = parseInt(this.duration / 60);
                minute = minute > 10 ? minute : `0${minute}`;
                return `${minute}:${second}`;
            }
            return '00:00';
        }
    },
    watch: {
        pause: function(val, oldVal) {
            if (val !== oldVal) {
                this.$emit('on-pause', val);
            }
        }
    },
    methods: {
        // 视频状态
        videoLoadStatus() {
            if (this.$refs.videoDom) {
                const videoDom = this.$refs.videoDom[0] || this.$refs.videoDom;
                videoDom.onerror = e => {
                    if (e) {
                        console.log('加载失败'); // eslint-disable-line
                    }
                };
            }
        },
        // 视频操作
        videoOperate() {
            if (this.pause) {
                this.videoPlay();
            } else {
                this.videoPause();
            }
        },
        // 视频播放
        videoPlay() {
            if (this.$refs.videoDom) {
                const videoDom = this.$refs.videoDom[0] || this.$refs.videoDom;
                this.setVideoClientHeight(videoDom);
                videoDom.play();
                this.duration = videoDom.duration;
                this.setVideoProgress();
                this.pause = false;
                this.firstPlayed = true;
                // 获取网络状态
                this.$emit('getDeviceData');
            }
        },
        // 视频暂停
        videoPause() {
            if (this.$refs.videoDom) {
                const videoDom = this.$refs.videoDom[0] || this.$refs.videoDom;
                videoDom.pause();
                this.pause = true;
            }
        },
        // 视频进度条
        setVideoProgress() {
            // const progress = this.$refs.progress;
            if (this.$refs.videoDom) {
                const videoDom = this.$refs.videoDom[0] || this.$refs.videoDom;
                videoDom.ontimeupdate = e => {
                    // 监听播放结束
                    if (e.target.ended) {
                        this.smallVideoClose();
                    }
                    this.currentTime = e.target.currentTime;
                    this.duration = e.target.duration;
                    const videoWidth = videoDom.offsetWidth;
                    this.progress.width = `${(this.currentTime / this.duration) * videoWidth}px`;
                };
            }
        },
        // 监听滑动
        monitorSmallVideoPlay() {
            window.addEventListener('scroll', this.smallVideoStatus, true);
        },
        // 小窗口状态
        smallVideoStatus(e) {
            const videoDom = this.$refs.videoDom;
            if (videoDom) {
                const domTop = videoDom.offsetHeight + videoDom.offsetTop - this.navBar + 100;
                const scrollTop = e.target.scrollTop || window.scrollY;
                this.slideOut = scrollTop > domTop;
                if (!this.slideOut) {
                    this.manualClose = false;
                    this.setVideoClientHeight(videoDom);
                }
            }
        },
        // 小窗口关闭
        smallVideoClose() {
            this.pause = true;
            this.videoPause();
            this.manualClose = true;
        },
        // 视频全屏
        fullScreen(direct) {
            const videoDom = this.$refs.videoDom[0] || this.$refs.videoDom;
            if (direct || this.showSmallVideo) {
                // 视频暂停
                this.videoPause();
                this.pause = true;
                this.$emit('fullScreen', videoDom);
            }
        },
        // 设置视频高度
        setVideoClientHeight(videoDom) {
            this.videoClientHeight = videoDom.clientHeight;
        },
        init() {
            this.monitorSmallVideoPlay();
            this.videoLoadStatus();
        }
    },
    mounted() {
        this.$nextTick(this.init);
    }
};
</script>
<style lang="less">
@import '~@/theme/variables';

.f-video {
    width: 100%;
    position: relative;

    video {
        width: 100%;
        height: auto;
        position: absolute;
        // top: 53.9%;
        // transform: translateY(-50%);
        top: 0;
        background-color: #fff;
    }

    .f-player {
        position: absolute;
        width: 100%;
        height: auto;
        top: 0;
    }

    .f-play-hot-area {
        position: relative;
        height: 211px;
        width: 100%;

        .f-pause {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            width: 42.23px;
            height: 42.23px;
        }
    }

    .f-progress-bar {
        position: absolute;
        // bottom: 3px;
        width: 100%;
        height: 3px;
        .f-progress {
            width: 0;
            background: @color-primary;
            height: 100%;
        }
    }

    .f-controls {
        position: absolute;
        right: 14px;
        display: flex;
        font-size: 11px;
        align-items: center;
        color: #fff;
        z-index: 10;

        img {
            width: 24px;
            margin-left: 7px;
        }

        .f-duration {
            font-size: 12px;
        }

        &::after {
            content: '';
            width: 64px;
            height: 64px;
            right: -14px;
            bottom: -7px;
            position: absolute;
        }
    }

    .f-small-video-close {
        position: fixed;
        right: 14px;
        background-color: rgba(0, 0, 0, 0.6);
        text-align: center;
        padding: 3px;
        z-index: 20;
        font-size: 0;

        img {
            width: 10px;
            height: 10px;
        }
    }

    .f-network {
        position: absolute;
        top: 39px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(27, 28, 51, 0.6);
        opacity: 0.9;
        border-radius: 8px;
        font-size: 12px;
        color: #fff;
        text-align: center;
        padding: 5px 12px;
        z-index: 100;
    }

    .fixed {
        position: fixed !important;
        right: 14px;
        box-shadow: 1px 1px 2px 0px black;
        font-size: 0;
        width: 140px;
        z-index: 20;
        transform: none;
    }
}
</style>

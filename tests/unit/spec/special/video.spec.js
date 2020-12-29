import { mount } from '@vue/test-utils';
import Video from 'main/components/base/video.vue';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('video', () => {
    it('渲染播放器组件', () => {
        const wrapper = mount(Video);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});

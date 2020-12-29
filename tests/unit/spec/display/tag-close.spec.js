import { mount } from '@vue/test-utils';
import TagClose from 'main/components/base/tag-close.vue';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('tag-close', () => {
    it('渲染可关闭标签组件', () => {
        const wrapper = mount(TagClose);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});

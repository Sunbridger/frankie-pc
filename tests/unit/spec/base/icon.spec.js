import { mount } from '@vue/test-utils';
import Icon from 'main/components/base/icon.vue';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('icon', () => {
    it('渲染图标组件', () => {
        const wrapper = mount(Icon);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});

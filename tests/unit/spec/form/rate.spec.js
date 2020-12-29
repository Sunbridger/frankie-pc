import { mount } from '@vue/test-utils';
import Rate from 'main/components/base/rate.vue';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('rate', () => {
    it('渲染评分组件', () => {
        const wrapper = mount(Rate);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});

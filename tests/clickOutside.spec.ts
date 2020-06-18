// import clickOutside from '@/directives/clickOutside';
// import { mount, createLocalVue } from '@vue/test-utils';

// const component = {
// eslint-disable-next-line max-len
//   template: '<div><div v-click-outside="handleClick()"></div><div class="outside>{{count}}</div></div>',
//   mounted() {
//     this.click = 0;
//   },
//   methods: {
//     handleClick() { this.click++; },
//   },
// };

// const localVue = createLocalVue();

// localVue.directive('clickOutside', clickOutside);

// const wrapper = mount(component, { localVue });

// describe('clickOutside.ts', () => {
//   it('Will render', async () => {
//     wrapper.find('outside').trigger('click');
//     await wrapper.vm.$nextTick();

//     expect(wrapper.find('.outside').text()).toBe('1');
//   });
// });

import { mount } from '@vue/test-utils';
import '../../public/health_provider/js/config-settings';
import '../../public/health_provider/js/config-flow';
import '../../public/health_provider/i18n/lang-en';
import { mainconfig } from '@/global';
import App from '@/DefaultPage.vue';

describe('Health Provider App on Desktop', () => {
  it('renders home page on load', () => {
    const wrapper = mount(App, {
      mocks: {
        $t: msg => msg,
        $n: msg => msg,
        $d: msg => msg,
      },
    });
    expect(wrapper.find('h1').text()).toContain('message.hero_text');
  });

  it('renders account page when authenticated', () => {
    mainconfig.isAuthenticated = true;
    mainconfig.userId = 0;
    const wrapper = mount(App, {
      mocks: {
        $t: msg => msg,
        $n: msg => msg,
        $d: msg => msg,
      },
    });
    expect(wrapper.find('h1').text()).toContain('message.accountoverview');
  });
});

describe('Health Provider App on Mobile', () => {
  it('renders home page on load', () => {
    mainconfig.isMobilePhone = true;
    mainconfig.isAuthenticated = false;
    mainconfig.userId = -1;
    const wrapper = mount(App, {
      mocks: {
        $t: msg => msg,
        $n: msg => msg,
        $d: msg => msg,
      },
    });
    expect(wrapper.find('h1').text()).toContain(
      'message.phone_home_page_title',
    );
  });
});

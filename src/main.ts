import { Focus, ToastService, Tooltip, WangsVue } from '@fewangsit/wangsvue';
import preset from '@fewangsit/wangsvue-presets/wangsvue';
import createVueMicroApp from '@microtsm/vue';

import App from '@/App.vue';

import '@/assets/css/main.css';
import '@fewangsit/wangsvue/style.css';
import '@fewangsit/wangsvue-presets/wangsvue/style.css';
import router from './router';

export const { mount, unmount } = createVueMicroApp(App, {
  el: '#app', // Only used for standalone development
  setupInstance(app) {
    app.use(WangsVue, {
      preset,
    });

    app.use(ToastService);
    app.use(router);

    app.directive('Tooltip', Tooltip);
    app.directive('focus', Focus);
  },
});

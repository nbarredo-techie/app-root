import { registerApplication, start } from 'single-spa';
import { constructRoutes, constructApplications } from 'single-spa-layout';
import { constructLayoutEngine } from 'single-spa-layout';

import layoutDefinition from './root-layout.html?raw';

console.log('root-config loaded');
const routes = constructRoutes(layoutDefinition);
console.log('routes constructed', routes);
const applications = constructApplications({
  routes,
  loadApp: ({ name }) => {
    console.log('Attempting to load app:', name);
    return System.import(name).then(mod => {
      console.log('Loaded module for', name, mod);
      // If the module has a default export, return that, otherwise return the module itself
      return mod?.default ?? mod;
    });
  },
});
console.log('applications constructed', applications);
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(app => {
  console.log('Registering application:', app);
  registerApplication(app);
});

layoutEngine.activate();
console.log('Layout engine activated');
start();
console.log('single-spa started');

 
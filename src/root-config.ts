import { registerApplication, start } from 'single-spa';
import { constructRoutes, constructApplications } from 'single-spa-layout';
import { constructLayoutEngine } from 'single-spa-layout';

import layoutDefinition from './root-layout.html?raw';
// Import the shared theme
System.import('shared_ui/theme').then(() => {
  console.log('Shared UI theme loaded');
});
const routes = constructRoutes(layoutDefinition);
const applications = constructApplications({
  routes,
  loadApp: ({ name }) => System.import(name),
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);

layoutEngine.activate();
start();

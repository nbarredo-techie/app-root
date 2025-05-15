import { registerApplication, start } from 'single-spa';
import { constructRoutes, constructApplications } from 'single-spa-layout';
import { constructLayoutEngine } from 'single-spa-layout';
import { getMountedApps } from 'single-spa';

import layoutDefinition from './root-layout.html?raw';
 
console.log("root-config loaded");
const routes = constructRoutes(layoutDefinition);
const applications = constructApplications({
  routes,
  loadApp: ({ name }) => System.import(/* @vite-ignore */ name),
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
console.log("applications registered", applications);

layoutEngine.activate();
start();

setTimeout(() => {
  console.log("Mounted apps:", getMountedApps());
}, 2000);

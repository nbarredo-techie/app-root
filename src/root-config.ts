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

// Programmatically interact with import-map-overrides if needed
System.import('import-map-overrides').then((imo) => {
  if (imo && imo.setOverrideMap && typeof System.getImportMap === 'function') {
    console.log('Synchronizing import-map-overrides UI with current SystemJS import map.');
    imo.setOverrideMap(System.getImportMap().imports);
  } else {
    console.warn('import-map-overrides API or System.getImportMap not available as expected.');
  }
  
  // The element <import-map-overrides-full> is now in index.html
  // const el = document.createElement('import-map-overrides-full');
  // el.setAttribute('trigger-position', 'bottom-right');
  // document.body.appendChild(el);
  console.log('Import-map-overrides UI should be present from index.html.');
  console.log('Current SystemJS Import map:', System.getImportMap ? System.getImportMap() : 'System.getImportMap not available');
  console.log('Registered apps:', (window as any).singleSpa.getAppNames());
});

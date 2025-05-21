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
    console.log('Attempting to load app with specifier:', name);
    let resolvedUrl;
    try {
      resolvedUrl = System.resolve(name); // Resolve the specifier to a URL
    } catch (e) {
      console.error(`Could not resolve import map for specifier: ${name}`, e);
      return Promise.reject(e); // Fail if resolution doesn't work
    }
    console.log(`Resolved URL for ${name}: ${resolvedUrl}`);

    // Check if the RESOLVED URL is from a local Vite dev server
    if (resolvedUrl && resolvedUrl.startsWith('http://localhost:')) {
      console.log('Loading app via native import (dev):', resolvedUrl);

      // Add diagnostic logging for the MFE response
      return fetch(resolvedUrl)
        .then(res => {
          console.log(`MFE Response for ${name} (${resolvedUrl}):`);
          console.log(`  Status: ${res.status}`);
          console.log('  Headers:');
          res.headers.forEach((value, key) => console.log(`    ${key}: ${value}`));
          if (!res.ok) {
            return res.text().then(text => {
              console.error(`  Error fetching MFE: ${res.statusText}`, text);
              throw new Error(`Failed to fetch MFE ${name}: ${res.statusText}`);
            });
          }
          return res.text();
        })
        .then(text => {
          console.log(`  First 500 chars of MFE text for ${name}:`, text.substring(0, 500));
          // Now attempt the import
          return import(/* @vite-ignore */ resolvedUrl).then(mod => { // Use the resolved URL for native dynamic import
            console.log('Loaded module for', name, 'from', resolvedUrl, mod);
            return mod?.default ?? mod;
          });
        });
    } else {
      console.log('Loading app via System.import (prod):', name); // Use the original specifier for System.import
      return System.import(name).then(mod => {
        console.log('Loaded module for', name, 'from resolved URL', resolvedUrl, mod);
        // If the module has a default export, return that, otherwise return the module itself
        return mod?.default ?? mod;
      });
    }
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

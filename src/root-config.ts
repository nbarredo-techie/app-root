import { registerApplication, start } from 'single-spa';
import { constructRoutes, constructApplications } from 'single-spa-layout';
import { constructLayoutEngine } from 'single-spa-layout';

import layoutDefinition from './root-layout.html?raw';

console.log('root-config loaded');
const routes = constructRoutes(layoutDefinition);
console.log('routes constructed', routes);
const applications = constructApplications({
  routes,
  loadApp: async ({ name }) => { // Changed to async function
    console.log('Attempting to load app with specifier via native import:', name);
    // We rely on the browser's import map to resolve the 'name' specifier or use it if it's a full URL.
    try {
      // All MFE loading will now use native dynamic import.
      // Ensure all MFEs (dev and prod) are ESM and their URLs in the import map point to ESM bundles.
      const mod = await import(name); // Webpack should handle any necessary processing for dynamic imports
      console.log('Loaded module for', name, mod);
      return mod?.default ?? mod; // Return default export if it exists, otherwise the module itself
    } catch (error) {
      console.error(`Error loading MFE ${name} via native import:`, error);
      throw error; // Re-throw the error to allow single-spa to handle it
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

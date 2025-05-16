
System.import('single-spa').then((spa) => {
    window.singleSpa = spa; 
    import('./root-config.ts');
  });
  
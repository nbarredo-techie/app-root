// This declaration tells TypeScript that importing an .html file
// will result in a module whose default export is a string.
// This aligns with how rollup-plugin-string processes these imports.
declare module '*.html' {
  const content: string;
  export default content;
}

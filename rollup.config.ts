import typescript from '@rollup/plugin-typescript';  // Compiles TypeScript files
import postcss from 'rollup-plugin-postcss';         // Allows importing and bundling CSS (and preprocessors like SCSS)
import serve from 'rollup-plugin-serve';             // Starts a local dev server
import livereload from 'rollup-plugin-livereload';   // Enables live-reloading in the browser on changes
import url from '@rollup/plugin-url';                // Handles importing image and other binary files
import terser from '@rollup/plugin-terser';          // Handles minification to make the bundle smaller

const isDev = process.env.NODE_ENV === 'DEV';

export default {
  input: 'src/server.ts',
  output: {
    file: 'dist/server.js',             // Output file location and name
    format: 'esm',                     // Output format: ES module
    sourcemap: true                    // Generate sourcemaps for easier debugging
  },
  plugins: [
    postcss(),                         // Process and bundle imported CSS files
    terser(),                          // Use terser for minification to make the bundle smaller
    url({
      limit: 0,                        // Always copy files instead of embedding them as base64 (since limit is 0)
      include: ['**/*.png'],           // Include these file types
      destDir: 'dist/assets'           // Destination folder for copied assets
    }),
    typescript({
      tsconfig: './tsconfig.json'      // Use this tsconfig file to configure TypeScript compilation
    }),
    ...(isDev ? [                      // Development-only plugins (enabled when in dev mode)
      serve({
        open: true,                    // Automatically open the browser when the server starts
        contentBase: ['dist', 'src'],  // Folders to serve static files from
        port: 3000 // Port to run the dev server on
      }),
      livereload('dist')               // Watch the 'dist' directory and reload browser on changes
    ] : [])
  ]
};
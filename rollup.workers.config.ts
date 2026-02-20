import typescript from '@rollup/plugin-typescript';  // Compiles TypeScript files
import terser from '@rollup/plugin-terser';          // Handles minification to make the bundle smaller
import { globSync } from "glob";

const workers = globSync('./src/jobs/workers/**/*.ts');
workers.push("./src/jobs/index.ts");

export default {
  input: workers,
  output: {
    dir: "dist",
    format: "esm", // Output format: ES module
    sourcemap: true,
    preserveModules: true
  },
  plugins: [
    terser(), // Use terser for minification to make the bundle smaller
    typescript({
      tsconfig: "./tsconfig.workers.json", // Use this tsconfig file to configure TypeScript compilation
    }),
  ],
};
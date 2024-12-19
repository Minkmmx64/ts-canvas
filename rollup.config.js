
/**@type {import("rollup").RollupOptions} */
export default {
  input: "./src/index.ts",
  output: {
    dir: "dist",
    entryFileNames: "bundle.js",
    format: "esm",
    sourcemap: true,
  }
}
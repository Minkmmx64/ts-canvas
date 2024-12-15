
/**@type {import("rollup").RollupOptions} */
export default {
  input: "./src/index.ts",
  output: {
    file: "./dist/bundle.js",
    format: "esm",
    sourcemap: true,
  }
}
import babel from '@rollup/plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default [{
  input: 'src/index.js',
  output: [{
    file: 'dist/index.js',
    format: 'cjs',
  }, {
    file: 'browser/index.js',
    format: 'umd',
    name: 'ku4es_ui_testing',
  }],
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    builtins(),
    cleanup(),
    commonjs(),
    json(),
    terser(),
    resolve({
      mainFields: ['main', 'module'],
      preferBuiltins: true,
      browser: true
    }),
  ]
},
  {
    input: 'src/index.mjs',
    output: [{
      file: 'dist/index.mjs',
      format: 'esm'
    }],
    plugins: [
      cleanup(),
      terser(),
      resolve()
    ]
  }];

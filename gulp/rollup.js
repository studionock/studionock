import { rollup as roll } from 'rollup';
import babel from 'rollup-plugin-babel';
import gutil from 'gulp-util';

function task({ src, dest, name }) {
  const inputOptions = {
    input: src,
    plugins: [
      babel({
        babelrc: false,
        presets: [['env', { modules: false }]],
        plugins: ['external-helpers'],
      }),
    ],
  };

  const outputOptions = {
    file: dest,
    format: 'umd',
    name,
    sourcemap: process.env.NODE_ENV !== 'production',
  };

  return async function rollup() {
    try {
      const bundle = await roll(inputOptions);
      await bundle.write(outputOptions);
    } catch (err) {
      const error = new gutil.PluginError('rollup', err);
      throw error;
    }
  };
}

export { task as default };

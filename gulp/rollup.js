import { rollup as roll } from 'rollup';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import gutil from 'gulp-util';

const isProd = process.env.NODE_ENV !== 'production';

function task({ src, dest, name }) {
  const plugins = [
    babel({
      babelrc: false,
      presets: [['env', { modules: false }]],
      plugins: ['external-helpers'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV === 'production' ? 'production' : 'development',
      ),
    }),
    !isProd && uglify(),
  ].filter(p => p !== null);

  const inputOptions = {
    input: src,
    plugins,
  };

  const outputOptions = {
    file: dest,
    format: 'umd',
    name,
    sourcemap: isProd,
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

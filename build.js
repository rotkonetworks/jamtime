import { build } from 'esbuild';

await build({
  entryPoints: ['index.js'],
  bundle: true,
  minify: true,
  platform: 'browser',
  format: 'iife',
  globalName: 'JAMTime',
  outfile: 'dist/jamtime.min.js'
});

await build({
  entryPoints: ['index.js'],
  bundle: true,
  platform: 'neutral',
  format: 'esm',
  outfile: 'dist/jamtime.esm.js'
});

console.log('Built successfully');

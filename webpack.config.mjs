import { dirname, resolve } from 'node:path';
import ESLintPlugin from 'eslint-webpack-plugin';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
  mode: 'production',
  entry: resolve(__dirname, 'src', 'index.ts'),
  output: { clean: true, filename: 'index.js' },
  module: { rules: [{ test: /\.ts$/i, loader: 'ts-loader' }] },
  resolve: { extensions: ['.ts', '.js'] },
  target: 'node',
  plugins: [new ESLintPlugin({ extensions: ['ts'], fix: false })],
};

export default config;

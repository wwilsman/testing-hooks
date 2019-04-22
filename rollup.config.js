import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

const common = {
  plugins: [
    resolve(),
    babel({ comments: false })
  ]
};

const configFor = (file, config = {}) => ({
  input: `src/${file}`,
  output: { format: 'es', file },
  ...common,
  ...config
});

export default [
  configFor('index.js'),
  configFor('react-dom.js', {
    external: ['react-dom']
  }),
  configFor('vue.js', {
    external: ['vue']
  })
];

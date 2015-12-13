exports.default = ['scripts'];

exports.lambda = {
  packageJson: 'src/lambda/package.json',
  src: ['src/lambda/**/*', '!src/lambda/package.json'],

  babelOptions: {
    presets: ["es2015"],
    plugins: ["transform-inline-environment-variables"],
    only: ['index.js'],
  },

  lambdaParams: {
    FunctionName: 'LambdaExample',
    Role: process.env.AWS_LAMBDA_EXECUTOR_ROLE_ARN,
  },

  lambdaOpts: {
    profile: 'default',
    region: process.env.AWS_REGION,
  },
};

exports.scripts = {
  src: { entries: './src/js', debug: true, },
  dest: 'build/js',
};

exports.serve = {
  browserSync: {
    files: [
      'build/**',
      'public/**',
    ],
    server: {
      baseDir: ['public', 'build'],
      index: 'index.html',
    },
  },
  deps: ['scripts:watch'],
};

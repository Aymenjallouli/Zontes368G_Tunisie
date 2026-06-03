module.exports = {
  apps: [
    {
      name: 'zontes-api',
      cwd: './server',
      script: 'node',
      args: 'dist/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
      restart_delay: 3000,
      max_restarts: 10,
    },
  ],
};

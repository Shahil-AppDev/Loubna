module.exports = {
  apps: [
    {
      name: 'juriste-droit-du-travail-prod',
      script: 'node_modules/.bin/next',
      args: 'start -p 5901',
      cwd: '/var/www/projects/juriste-droit-du-travail/current',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: '5901',
        HOSTNAME: '127.0.0.1',
      },
      error_file:
        '/var/www/projects/juriste-droit-du-travail/shared/logs/pm2-error.log',
      out_file:
        '/var/www/projects/juriste-droit-du-travail/shared/logs/pm2-out.log',
      merge_logs: true,
      time: true,
    },
  ],
};

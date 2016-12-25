module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "blog",
      script    : "app/app.js",
      env_production : {
        NODE_ENV: "production"
      },
      exec_mode: "cluster",
      instances: 4
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "zhuowenli",
      host : "45.33.46.78",
      ref  : "origin/master",
      repo : "git@github.com:zhuowenli/zhuowenli.github.io.git",
      path : "/home/zhuowenli/github/zhuowenli.github.io",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.config.js --env production"
    }
  }
}

module.exports = {
    apps:[
        {
            name:'H5-app-frontend',
            script:"egg-server.js"
        }
    ],
    deploy: {
        production:{
            user:'root',
            host:'120.77.155.183',
            ref:'origin/master',
            repo:'https://github.com/lin2zimin/H5-app-frontend.git',
            path:'/frontend-code',
            'post-deploy':'git reset --hard && git checkout master && git pull && npm i --production=false && npm run build:release && pm2 startOrReload ecosystem.config.js',
            env:{
                NODE_ENV:'production'
            }
        }
    }
}
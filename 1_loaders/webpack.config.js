const {resolve}=require('path')

module.exports={
    mode:'production',
    module:{
        rules:[
            {
                test:/\.js$/,
                // use:[
                //     {
                //         loader:'loader3',
                //         options:{
                //             name:'jzhu',
                //             age:18
                //         }
                //     },
                //     'loader2',
                //     'loader1'
                // ]
                loader:'babelLOader',
                options:{
                    presets:[
                        '@babel/preset-env'
                    ]
                }
                
            }
        ]
    },
    resolveLoader:{
        modules:[
            'node_modules',
            resolve(__dirname,'loaders')
        ]
    }
}
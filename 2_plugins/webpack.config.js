const CopyWebpackPlugin=require('./plugins/CopyWebpackPlugin')

module.exports={
    plugins:[
        new CopyWebpackPlugin({
            from:'public',
            to:'dist',
            ignore:['**/*.html']
        })
    ]
}
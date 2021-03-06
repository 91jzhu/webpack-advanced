class Plugin1 {
    apply(complier) {
        complier.hooks.emit.tapAsync('Plugin1', (compilation,cb) => {
            setTimeout(()=>{
                console.log('emit tap 111')
                cb()
            },1000)
        })
        complier.hooks.emit.tapAsync('Plugin1', (compilation,cb) => {
            setTimeout(()=>{
                console.log('emit tap 111')
                cb()
            },1000)
        })
        complier.hooks.afterEmit.tap('Plugin1', (compilation) => {
            console.log('afterEmit tap 222')
        })
        complier.hooks.done.tap('Plugin1', (stats) => {
            console.log('done tap 333')
        })
    }
}

module.exports=Plugin1
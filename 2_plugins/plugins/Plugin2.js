const fs = require('fs');
const { promisify } = require('util')
const { resolve } = require('path');
const webpack = require('webpack')
const { RawSource } = webpack.sources
const readFile = promisify(fs.readFile)

class Plugin2 {
    apply(compiler) {
        // 初始化 compilation 钩子
        compiler.hooks.thisCompilation.tap('Plugin2', (compilation) => {
            // debugger
            // console.log(compilation);
            // compilation 添加资源
            compilation.hooks.additionalAssets.tapAsync('Plugin2', async (cb) => {
                debugger
                console.log(compilation);
                // 在输出资源中添加一个文件
                const content = 'hello aaaaa'
                compilation.assets['a.txt'] = {
                    // 文件大小
                    size() {
                        return content.length
                    },
                    // 文件内容
                    source() {
                        return content
                    }
                }

                const data = await readFile(resolve(__dirname, '../src/b.txt'))
                // compilation.assets['b.txt'] = new RawSource(data)
                // 上下等价
                compilation.emitAsset('b.txt', new RawSource(data))
                cb()
            })
        })
    }
}

module.exports = Plugin2
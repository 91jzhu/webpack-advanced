const { validate } = require('schema-utils')
const schema = require('./schema.json')
const path = require('path')
const globby = require('globby')
const fs = require('fs')
const { promisify } = require('util')
const webpack = require('webpack')

class CopyWebpackPlugin {
    constructor(options = {}) {
        validate(schema, options, {
            name: 'CopyWebpackPlugin'
        })
        this.options = options
    }
    apply(compiler) {
        // 初始化 compilation
        compiler.hooks.thisCompilation.tap('CopyWebpackPlugin', (compilation) => {
            compilation.hooks.additionalAssets.tapAsync('CopyWebpackPlugin', async (cb) => {
                const { from, to = '.', ignore } = this.options

                // 根目录，运行指令的目录
                const context = compiler.options.context

                let paths = await globby([from], { ignore })

                const readFile = promisify(fs.readFile)
                // 读取对应目录的文件为 files
                paths = paths.map(p => {
                    return path.resolve(context, p)
                })

                const files = await Promise.all(paths.map(async (p) => {
                    let data = await readFile(p)
                    let filename = path.basename(p)
                    return { filename, data }
                }))

                // 生成webpack格式的资源
                const assets = files.map(file => {
                    const source = new webpack.sources.RawSource(file.data)
                    return { filename: file.filename, source }
                })

                // 添加到 compilation 中，输出出去
                assets.forEach(asset => {
                    compilation.emitAsset(asset.filename, asset.source)
                })

                cb()
            })
        })
    }
}

module.exports = CopyWebpackPlugin

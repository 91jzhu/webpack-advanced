const { validate } = require('schema-utils')
const schema = require('./schema.json')
const { join, isAbsolute } = require('path')
const globby = require('globby')

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
                const absoluteFrom = isAbsolute(from) ? from : join(context, from);
                const paths = await globby(['*/*'], { ignore })
                console.log(paths)
            })
        })
    }
}

module.exports = CopyWebpackPlugin

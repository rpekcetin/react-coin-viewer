import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import image from '@rollup/plugin-image'
import json from '@rollup/plugin-json'
import nodePolyfills from 'rollup-plugin-node-polyfills'
const packageJson = require('./package.json')

export default [
    {
        input: 'src/index.ts',
        //entry: 'index.tsx',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true
            }
        ],
        plugins: [
            commonjs({
                namedExports: {
                    'node_modules/react/index.js': ['useState', 'useRef', 'useEffect'],
                },
            }),
            resolve({
                browser: true,
                preferBuiltins: false
            }),
            nodePolyfills(),
            typescript({ tsconfig: './tsconfig.json' }),
            postcss(),
            image(),
            json()
        ],
        external: ["react", "react-dom", "@fontsource/quicksand"],
    },
    {
        input: 'dist/esm/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [dts.default()],
        external: [/\.css$/]
    }
]
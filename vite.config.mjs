import { defineConfig, loadEnv } from 'vite';
import vue2 from '@vitejs/plugin-vue2';
import Components from 'unplugin-vue-components/vite';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';


import { fileURLToPath, URL } from 'node:url';

export default defineConfig((config) => {
    // https://main.vitejs.dev/config/
    const env = loadEnv(config, process.cwd(), '');
    const tagVersion = "";
    //version .evn
    const version = env.VITE_APP_VERSION?.split(" ")[0].split(".").join("_") + tagVersion || "app";
    const baseUrl = config.mode == "development" ? "" : env.VITE_APP_PATH;
    return {
        base: `/${baseUrl}`,
        chunkSizeWarningLimit: 700,
        plugins: [
            vue2(
            ),

            Components({
                resolvers: [VuetifyResolver()],
            })
        ],
        build: {
            reportCompressedSize: true,
            cssCodeSplit: true,
            outDir: 'dist',

            // Opciones para archivos
            rollupOptions: {
                output: {
                    // archivo assets 
                    assetFileNames: (assetInfo) => {
                        const name = assetInfo.name;
                        const fileNameSection = name.split("");
                        const medium = Math.trunc(fileNameSection.length / 2);
                        const sectionFirts = medium % 2 == 0 ? fileNameSection.slice(0, medium).reverse().join("") : fileNameSection.slice(medium).reverse().join("");
                        if (name.endsWith(".css")) {
                            return `css/${sectionFirts}_[hash]${version}[extname]`; // Carpeta y formato para archivos  css
                        }
                        else {

                            return `assets/a${sectionFirts}_[hash]${version}[extname]`; // Carpeta y formato para archivos extension

                        }
                    },
                    //Archivo js type assets
                    chunkFileNames: (chunkInfo) => {
                        const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
                        let name = "";
                        if (facadeModuleId[facadeModuleId.length - 2]) {
                            const arrayName = facadeModuleId[facadeModuleId.length - 2];
                            const fileNameSection = arrayName.split("");
                            const medium = Math.trunc(fileNameSection.length / 2);
                            const sectionFirts = medium % 2 == 0 ? fileNameSection.slice(0, medium).reverse().join("") : fileNameSection.slice(medium).reverse().join("");
                            const finalName = `[hash]${sectionFirts}`;
                            name = finalName;
                        } else {

                            const arrayName = chunkInfo.name.split("");
                            const medium = Math.trunc(arrayName.length / 2);
                            const sectionFirts = medium % 2 == 0 ? arrayName.slice(0, medium).reverse().join("") : arrayName.slice(medium).reverse().join("");

                            name = `s[hash]${sectionFirts}`;
                        }

                        return `js/chunk_${name}.[hash]${version}.js`;
                    },
                    entryFileNames: () => {

                        //Archivo js principal 
                        return `js/chunkMain__[name]-[hash]${version}.js`;
                    },
                },

            },

        },
        resolve: {
            alias: {
                //configuracion de @ anotacion
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
            extensions: [
                '.js',
                '.json',
                '.jsx',
                '.mjs',
                '.ts',
                '.tsx',
                '.vue',
            ],
        },
    }



})
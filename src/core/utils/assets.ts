const ASSET_PATH = {
    css: './css',
    js: './scripts',
    image: '/images',
    ico: '/images/icons'
} as const;

export const asset = {
    css: (name: string) => `${ASSET_PATH.css}/${name}.css`,
    js: (name: string) => `${ASSET_PATH.js}/${name}.js`,
    img: (name: string) => `${ASSET_PATH.image}/${name}`,
    ico: (name: string) => `${ASSET_PATH.ico}/${name}.svg`
}
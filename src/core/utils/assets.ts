const ASSET_PATH = {
    css: '/css',
    js: '/js',
    image: '/images',
    ico: '/images/icons',
    logo: '/images/logo'
} as const;

export const asset = {
    css: (name: string) => `${ASSET_PATH.css}/${name}.css`,
    js: (name: string) => `${ASSET_PATH.js}/${name}.js`,
    img: (name: string) => `${ASSET_PATH.image}/${name}`,
    ico: (name: string) => `${ASSET_PATH.ico}/${name}.svg`,
    logo: (name: string) => `${ASSET_PATH.logo}/${name}.png`
}
import * as esbuild from 'esbuild';
import { readdirSync, statSync, existsSync, mkdirSync } from 'fs';
import { join, extname } from 'path';

const isWatch = process.argv.includes('--watch');
const isProd = !isWatch;

// --- UTILS ---
function getEntryPoints(dir: string): string[] {
    if (!existsSync(dir)) return [];
    let results: string[] = [];
    const list = readdirSync(dir);
    for (const file of list) {
        const path = join(dir, file);
        const stat = statSync(path);
        if (stat && stat.isDirectory()) {
            results = results.concat(getEntryPoints(path));
        } else if (extname(path) === '.ts') {
            results.push(path);
        }
    }
    return results;
}

function getThemeEntryPoints(dir: string): Record<string, string> {
    if (!existsSync(dir)) return {};
    const themes = readdirSync(dir);
    const entries: Record<string, string> = {};
    for (const theme of themes) {
        const mainCss = join(dir, theme, 'main.css');
        if (existsSync(mainCss)) {
            entries[theme] = mainCss;
        }
    }
    return entries;
}

// --- CONFIGURATIONS ---

// 1. Configuration pour le JAVASCRIPT
const jsContext = await esbuild.context({
    entryPoints: getEntryPoints('./src/client'),
    bundle: true,
    outdir: './public/scripts',
    format: 'esm',
    target: 'esnext',
    minify: isProd,
    sourcemap: isWatch,
});

// 2. Configuration pour le CSS (Thèmes)
const cssContext = await esbuild.context({
    entryPoints: getThemeEntryPoints('./src/core/themes'),
    bundle: true,
    outdir: './public/styles',
    minify: isProd,
    sourcemap: isWatch,
    loader: { '.woff2': 'file' },
    assetNames: 'fonts/[name]',
});

// --- EXECUTION ---

if (isWatch) {
    await Promise.all([
        jsContext.watch(),
        cssContext.watch()
    ]);
    console.log('👀 [esbuild] Surveillance active : JS (scripts/) et CSS (styles/)');
} else {
    await Promise.all([
        jsContext.rebuild(),
        cssContext.rebuild()
    ]);
    await Promise.all([
        jsContext.dispose(),
        cssContext.dispose()
    ]);
    console.log('✅ [esbuild] Build terminé.');
}
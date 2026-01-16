import * as esbuild from 'esbuild';
import { readdirSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname } from 'node:path';

const clientSrcDir = './src/client';
const outDir = './public/scripts';

function getEntryPoints(dir: string): string[] {
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

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const entryPoints = getEntryPoints(clientSrcDir);

const isWatch = process.argv.includes('--watch');

const ctx = await esbuild.context({
    entryPoints,
    bundle: true,
    outdir: outDir,
    format: 'esm',
    target: 'esnext',
    minify: !isWatch,
    sourcemap: isWatch,
});

if (isWatch) {
    await ctx.watch();
    console.log('👀 [esbuild] Surveillance récursive active sur src/client/');
} else {
    await ctx.rebuild();
    await ctx.dispose();
}
import {createRequire} from 'node:module';
import {writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
const modules=process.env.NALESSO_MODULES;
const projectRequire=modules?createRequire(path.join(modules,'../package.json')):createRequire(import.meta.url);
const {build}=modules?createRequire(projectRequire.resolve('vite'))('esbuild'):await import('esbuild');
const shared={absWorkingDir:process.cwd(),entryPoints:['src/main.tsx'],bundle:true,jsx:'automatic',jsxImportSource:'demo-jsx',alias:{'@':path.resolve('src'),'demo-jsx/jsx-runtime':path.resolve('src/jsx-runtime.ts')},nodePaths:process.env.NALESSO_MODULES?[process.env.NALESSO_MODULES]:[],define:{'process.env.NODE_ENV':'"production"'},logLevel:'warning'};
await build({...shared,minify:true,format:'esm',outfile:'assets/app.js',metafile:true}).then(async r=>writeFile('build-inputs.json',JSON.stringify(Object.keys(r.metafile.inputs))));
const routes=['','prodotti','prodotti/pokemon','prodotti/one-piece','preordini','preordini/pokemon','preordini/one-piece','gestione','richiesta'];
for(const route of routes){await mkdir(route||'.',{recursive:true});await writeFile(path.join(route,'index.html'),`<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Edicola Oscar Nalesso | Demo Pokémon & One Piece</title><meta name="description" content="Demo interattiva dell’Edicola Oscar Nalesso a Padova. Prodotti, preordini e pannello di gestione."><link rel="icon" href="/demo/edicola-oscar-nalesso/favicon.svg"><link rel="stylesheet" href="/demo/edicola-oscar-nalesso/assets/site.css"><link rel="stylesheet" href="/demo/edicola-oscar-nalesso/assets/demo.css"></head><body><div id="root"></div><noscript>Abilita JavaScript per visitare il catalogo e provare il pannello di gestione.</noscript><script type="module" src="/demo/edicola-oscar-nalesso/assets/app.js"></script></body></html>`);}
console.log('Demo built: 9 routes, native links, browser-local data only.');

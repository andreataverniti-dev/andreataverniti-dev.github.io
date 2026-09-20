import {createRoot} from 'react-dom/client';
import {useState} from 'react';
import Shop from './app/shop';
import CategoryHub from './components/shop/category-hub';
import CategoryProducts from './app/preordini/[category]/products';
import Admin from './app/gestione/panel';
import RequestPage from './app/richiesta/page';
import {resetDemo} from './demo-api';
import {BASE} from './jsx-runtime';
import {AlertDialog,AlertDialogContent,AlertDialogHeader,AlertDialogTitle,AlertDialogDescription,AlertDialogFooter,AlertDialogCancel,AlertDialogAction} from './components/ui/alert-dialog';
export function App({path=location.pathname}:{path?:string}){
 const route=path.slice(BASE.length).replace(/\/$/,'')||'/',[reset,setReset]=useState(false);
 const [,section,category]=route.split('/');let page;
 if(route==='/')page=<Shop/>;
 else if(route==='/gestione')page=<Admin/>;
 else if(route==='/richiesta')page=<RequestPage/>;
 else if(['prodotti','preordini'].includes(section)&&!category)page=<CategoryHub kind={section==='prodotti'?'sale':'preorder'}/>;
 else if(['prodotti','preordini'].includes(section)&&['pokemon','one-piece'].includes(category))page=<CategoryProducts category={category as any} kind={section==='prodotti'?'sale':'preorder'}/>;
 else page=<main className="simple-page"><h1>Pagina non trovata.</h1><a href="/">Torna all’edicola</a></main>;
 return <><aside className="showroom-bar"><span><strong>DEMO INTERATTIVA</strong> · Nessun ordine reale. Modifiche solo in questo browser.</span><nav><a href="/">Vedi il sito</a><a href="/gestione">Prova il pannello admin</a><button onClick={()=>setReset(true)}>Ripristina demo</button></nav></aside>{page}<AlertDialog open={reset} onOpenChange={setReset}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Ripristinare gli esempi?</AlertDialogTitle><AlertDialogDescription>Le modifiche ai prodotti e le richieste di prova di questo browser verranno cancellate. Torneranno i quattro articoli iniziali.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Annulla</AlertDialogCancel><AlertDialogAction onClick={()=>{resetDemo();location.reload()}}>Ripristina demo</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></>;
}
if(typeof document!=='undefined')createRoot(document.getElementById('root')!).render(<App/>);

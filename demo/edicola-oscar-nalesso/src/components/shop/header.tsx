'use client';
import {useState} from 'react';
import {Layers3,MapPin,Menu,X,ArrowUpRight} from 'lucide-react';
export default function ShopHeader({section}:{section?:'sale'|'preorder'}){
 const [menu,setMenu]=useState(false);
 return <><div className="announcement"><span>IL COLLEZIONISMO, SOTTO CASA.</span><span><MapPin size={13}/> PADOVA</span></div><header className="header"><a href="/" className="brand" aria-label="Edicola Oscar Nalesso, home"><span className="brand-icon"><Layers3/></span><span>OSCAR NALESSO<small>EDICOLA & COLLEZIONISMO</small></span></a><nav aria-label="Navigazione principale"><a href="/prodotti" aria-current={section==='sale'?'page':undefined}>Prodotti disponibili</a><a href="/preordini" aria-current={section==='preorder'?'page':undefined}>Preordini</a><a href="/#edicola">L’edicola</a></nav><a className="header-cta" href="/prodotti">Scopri il catalogo <ArrowUpRight size={17}/></a><button className="menu-button" onClick={()=>setMenu(!menu)} aria-label={menu?'Chiudi menu':'Apri menu'} aria-expanded={menu}>{menu?<X/>:<Menu/>}</button></header>{menu&&<nav className="mobile-menu" aria-label="Navigazione mobile"><a href="/prodotti">Prodotti disponibili</a><a href="/preordini">Preordini</a><a href="/#edicola" onClick={()=>setMenu(false)}>L’edicola</a></nav>}</>;
}

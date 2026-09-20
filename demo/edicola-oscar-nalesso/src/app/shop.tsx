'use client';
import {useState} from 'react';
import PrivacyDialog from '@/components/shop/privacy-dialog';
import {ArrowUpRight,ArrowRight, MapPin, Package, Bookmark, Check, Plus, Minus, Menu, X, Layers3, Store, Clock3, ShieldCheck} from 'lucide-react';





import ShopHeader from '@/components/shop/header';
import NewArrivals from '@/components/shop/new-arrivals';


export default function Shop(){
 const [privacy,setPrivacy]=useState(false);
 return <>
 <ShopHeader/>
 <main>
 <section className="hero"><div className="hero-copy"><div className="eyebrow"><span/> PICCOLE CARTE. GRANDI PASSIONI.</div><h1>La prossima<br/>grande <em>scoperta.</em></h1><p>Pokémon, One Piece e quella voglia di aprire<br className="desktop-break"/> ancora una busta. La tua collezione parte da qui.</p><div className="hero-actions"><a className="button lime" href="/prodotti">Scopri i prodotti disponibili <ArrowUpRight size={19}/></a><a className="text-link" href="/preordini">Scopri i preordini <ArrowRight size={17}/></a></div><div className="hero-foot"><span>POKÉMON TCG</span><span className="cross">×</span><span>ONE PIECE CARD GAME</span></div></div>
 <div className="hero-art"><span className="hero-grid-label">COLLECT SOMETHING GREAT.</span><div className="hero-orbit"/><img className="hero-card card-back" src="/images/hero-luffy-manga.webp" alt="Monkey D. Luffy EB04-061 · Pirate Crew Manga"/><img className="hero-card card-front" src="/images/hero-charizard.webp" alt="Mega Charizard X ex SIR 125/094 · Fiamme Spettrali"/><div className="collect-stamp"><span>LA TUA</span><b>prossima<br/>ossessione.</b><ArrowUpRight size={22}/></div><span className="hero-bottom-label">UN UNIVERSO IN OGNI BUSTA.</span></div></section>
 <div className="benefits"><span><Store/> Ritiro in edicola a Padova</span><span><Bookmark/> Richieste di preordine online</span><span><ShieldCheck/> Conferma prima dell’acquisto</span></div>
 <NewArrivals/>
 <section className="preorder section" id="preordini"><div className="preorder-copy"><p className="eyebrow">PER CHI GUARDA GIÀ AL PROSSIMO SET</p><h2>Gioca d’anticipo.<br/><span>Richiedi il tuo preordine.</span></h2><p>Hai già adocchiato la prossima espansione?<br/>Scegli il tuo universo e scopri i preordini aperti.</p><a className="button dark" href="/preordini">Scopri i prodotti in preordine <ArrowUpRight size={19}/></a><small>Nessun pagamento online. Ogni richiesta è soggetta a conferma.</small></div><div className="steps"><div><span>01</span><div><h3>Scegli la tua prossima apertura</h3><p>Scegli Pokémon o One Piece e scopri i prodotti in preordine.</p></div></div><div><span>02</span><div><h3>Lascia i tuoi contatti</h3><p>Invia una richiesta con quantità e preferenze.</p></div></div><div><span>03</span><div><h3>Attendi la conferma dell’edicola</h3><p>Prezzo, disponibilità e ritiro vengono concordati prima dell’acquisto.</p></div></div></div></section>
 <section className="local section" id="edicola"><div><p className="eyebrow muted">ONLINE LA PASSIONE. IN EDICOLA L’INCONTRO.</p><h2>Le carte cambiano.<br/>Il tuo punto di ritrovo resta.</h2><p>Edicola Oscar Nalesso, Padova.<br/>Uno spazio per la tua prossima scoperta, dal mondo Pokémon alla Rotta Maggiore.</p></div><div className="store-note"><MapPin size={30}/><h3>Ci vediamo a Padova.</h3><p>Ritiro in edicola da concordare alla conferma della richiesta.</p><div className="location-pending">Indirizzo, orari e recapiti in aggiornamento.</div></div></section>
 </main>
 <footer><a className="brand" href="/"><span className="brand-icon"><Layers3/></span><span>OSCAR NALESSO<small>EDICOLA & COLLEZIONISMO</small></span></a><p>La passione si colleziona.</p><div><button onClick={()=>setPrivacy(true)}>Come usiamo i tuoi dati</button><a href="/gestione">Area edicola <ArrowUpRight size={14}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Edicola Oscar Nalesso · Padova</span><span>Pokémon e One Piece appartengono ai rispettivi titolari. Sito indipendente.</span></div></footer>
 <PrivacyDialog open={privacy} onOpenChange={setPrivacy}/>
 </>;
}

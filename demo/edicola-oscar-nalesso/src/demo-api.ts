import {canRequestProduct,quantityLimit} from './lib/preorder-products';
const KEY='oscar-nalesso-showroom-v1';
const examples=[
 ['01','preorder','pokemon','Prismatic Evolutions','Elite Trainer Box','pokemon-etb.png',5990,null],
 ['02','preorder','one-piece','Emperors in the New World','OP-09 · Booster Box','onepiece-box.png',11990,null],
 ['03','sale','pokemon','Surging Sparks','Booster Display','pokemon-booster.png',15990,6],
 ['04','sale','one-piece','Starter Deck EX Gears','ST-21 · Starter Deck','onepiece-deck.webp',2990,8]
];
export function seed(){return {products:examples.map(([id,kind,category,name,type,image,priceCents,stock])=>({id:'08c51e8d-45c6-4f8e-93be-3e58a18a6a'+id,kind,category,name,type,image:'/images/'+image,priceCents,stock,brand:category==='pokemon'?'Pokémon':'One Piece',demo:true,language:'Inglese (EN)',description:'Articolo dimostrativo. Prezzo e disponibilità di esempio.',releaseDate:'',deadline:'',maxQuantity:4,published:true,createdAt:'2026-09-20T00:00:00.000Z',updatedAt:'2026-09-20T00:00:00.000Z'})),orders:[] as any[]};}
function read(){const raw=localStorage.getItem(KEY);return raw?JSON.parse(raw):seed();}
function save(data:ReturnType<typeof seed>){localStorage.setItem(KEY,JSON.stringify(data));}
export function resetDemo(){localStorage.removeItem(KEY);}
const json=(data:unknown,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json'}});
const clearContacts=(order:any)=>Object.assign(order,{status:'cancelled',name:'',email:'',phone:'',notes:''});
export async function demoFetch(input:string,init:RequestInit={}):Promise<Response>{
 try{
 const u=new URL(input,'https://demo.local'),method=init.method||'GET';
 if(u.pathname==='/api/admin/product-images'&&method==='POST'){
  const file=init.body as File;if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>4*1024*1024)return json({error:'Scegli un JPG, PNG o WebP fino a 4 MB.'},400);
  const image=await new Promise<string>((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result as string);r.onerror=()=>reject(Error('Foto non leggibile'));r.readAsDataURL(file)});return json({image});
 }
 const data=read(),body=typeof init.body==='string'?JSON.parse(init.body):{};
 const admin=u.pathname==='/api/admin/products';
 if(admin||u.pathname==='/api/products'){
  if(method==='GET')return json({products:data.products.filter((p:any)=>(admin||p.published)&&(!u.searchParams.get('kind')||p.kind===u.searchParams.get('kind'))&&(!u.searchParams.get('category')||u.searchParams.get('category')==='all'||p.category===u.searchParams.get('category'))).sort((a:any,b:any)=>b.createdAt.localeCompare(a.createdAt))});
  if(!admin)return json({error:'Operazione non disponibile.'},405);
  const old=data.products.find((p:any)=>p.id===body.id);
  if(method==='DELETE'){data.products=data.products.filter((p:any)=>p.id!==body.id);save(data);return json({ok:true});}
  if(!['POST','PATCH'].includes(method))return json({error:'Operazione non disponibile.'},405);
  if(method==='PATCH'&&!old)return json({error:'Prodotto non trovato.'},404);
  if(!['sale','preorder'].includes(body.kind)||!['pokemon','one-piece'].includes(body.category)||!body.name?.trim()||!body.type?.trim())return json({error:'Completa i dettagli del prodotto.'},400);
  if(!/^(\/images\/|https:\/\/|data:image\/(png|jpeg|webp);base64,)/.test(body.image))return json({error:'Carica una foto oppure usa un indirizzo HTTPS.'},400);
  if(!Number.isInteger(body.maxQuantity)||body.maxQuantity<1||body.maxQuantity>12||body.priceCents!==null&&(!Number.isInteger(body.priceCents)||body.priceCents<1)||body.stock!==null&&(!Number.isInteger(body.stock)||body.stock<0))return json({error:'Controlla prezzo, quantità e disponibilità.'},400);
  const {price,...rest}=body,product={...rest,brand:body.category==='pokemon'?'Pokémon':'One Piece',demo:true,createdAt:old?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};
  data.products=[product,...data.products.filter((p:any)=>p.id!==body.id)];save(data);return json({product});
 }
 if(['/api/preorders','/api/pickup-requests'].includes(u.pathname)&&method==='POST'){
  const existing=data.orders.find((o:any)=>o.id===body.requestId);if(existing)return json({reference:existing.reference,token:existing.token});
  const product=data.products.find((p:any)=>p.id===body.productId),kind=u.pathname==='/api/preorders'?'preorder':'sale';
  if(!product||product.kind!==kind||!canRequestProduct(product as any))return json({error:'Prodotto non disponibile in questo catalogo.'},409);
  if(body.productVersion!==product.updatedAt)return json({error:'Il prodotto è cambiato. Ricarica il catalogo.'},409);
  if(!Number.isInteger(body.quantity)||body.quantity<1||body.quantity>quantityLimit(product as any)||!body.consent||!body.name?.trim()||!body.email?.includes('@'))return json({error:'Controlla quantità e dati di esempio.'},400);
  const order={id:body.requestId,token:crypto.randomUUID(),reference:'DEMO-'+crypto.randomUUID().slice(0,8).toUpperCase(),product_id:product.id,product:structuredClone(product),quantity:body.quantity,name:body.name,email:body.email,phone:body.phone||'',notes:body.notes||'',status:'pending',created_at:new Date().toISOString()};data.orders.unshift(order);save(data);return json({reference:order.reference,token:order.token});
 }
 if(u.pathname==='/api/admin/preorders'){
  if(method==='GET')return json({orders:data.orders});
  const order=data.orders.find((o:any)=>o.id===body.id);if(!order)return json({error:'Richiesta non trovata.'},404);
  const next:Record<string,string[]>={pending:['confirmed','cancelled'],confirmed:['ready','cancelled'],ready:['completed','cancelled'],completed:[],cancelled:[]};
  if(method!=='PATCH'||!next[order.status]?.includes(body.status))return json({error:'Cambio di stato non disponibile.'},400);
  if(body.status==='cancelled')clearContacts(order);else order.status=body.status;save(data);return json({orders:data.orders});
 }
 if(u.pathname==='/api/request'){
  const order=data.orders.find((o:any)=>o.token===u.searchParams.get('token'));if(!order)return json({error:'Questa richiesta demo non è presente in questo browser.'},404);
  if(method==='DELETE'){if(['completed','cancelled'].includes(order.status))return json({error:'La richiesta è già conclusa.'},409);clearContacts(order);save(data);}return json(order);
 }
 return json({error:'Funzione non disponibile nella demo.'},404);
 }catch{return json({error:'Impossibile salvare la demo in questo browser. Abilita lo spazio di archiviazione oppure ripristina gli esempi.'},500);}
}

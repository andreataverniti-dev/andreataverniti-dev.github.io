export type ListingKind='preorder'|'sale';
export type Category='pokemon'|'one-piece';
export type PreorderProduct={id:string;kind:ListingKind;demo:boolean;stock:number|null;category:Category;brand:'Pokémon'|'One Piece';name:string;type:string;description:string;image:string;language:string;priceCents:number|null;releaseDate:string;deadline:string;maxQuantity:number;published:boolean;updatedAt:string};
export const categories={pokemon:{name:'Pokémon',subtitle:'Trading Card Game',image:'/images/pokemon-background.jpg',line:'La prossima scoperta ti aspetta.'},'one-piece':{name:'ONE PIECE',subtitle:'Card Game',image:'/images/onepiece-background.png',line:'Preparati alla prossima avventura.'}};
export function isCategory(value:string):value is Category{return value==='pokemon'||value==='one-piece';}
export function productFromRow(row:Record<string,unknown>):PreorderProduct{return {id:String(row.id),kind:row.listing_kind==='sale'?'sale':'preorder',demo:!!row.demo,stock:row.stock==null?null:Number(row.stock),category:row.category as Category,brand:row.category==='pokemon'?'Pokémon':'One Piece',name:String(row.name),type:String(row.type),description:String(row.description),image:String(row.image),language:String(row.language),priceCents:row.price_cents==null?null:Number(row.price_cents),releaseDate:String(row.release_date||''),deadline:String(row.deadline||''),maxQuantity:Number(row.max_quantity),published:!!row.published,updatedAt:String(row.updated_at)};}
export const formatPrice=(cents:number|null)=>cents==null?'Prezzo da confermare':new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format(cents/100);
export const formatDate=(date:string)=>date?new Intl.DateTimeFormat('it-IT',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(date+'T12:00:00Z')):'Da annunciare';
export function todayInItaly(){return new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Rome',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
export function isPreorderOpen(product:Pick<PreorderProduct,'published'|'deadline'>){return product.published&&(!product.deadline||product.deadline>=todayInItaly());}

export function canRequestProduct(p:PreorderProduct){return p.kind==='sale'?p.published&&(p.stock===null||p.stock>0):isPreorderOpen(p)}
export function quantityLimit(p:PreorderProduct){return p.kind==='sale'&&p.stock!==null?Math.min(p.maxQuantity,p.stock):p.maxQuantity}

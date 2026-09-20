import * as runtime from 'react/jsx-runtime';
export const Fragment=runtime.Fragment;
export const BASE='/demo/edicola-oscar-nalesso';
export function localUrl(value:any){
 if(typeof value!=='string'||!value.startsWith('/')||value.startsWith('//')||value.startsWith(BASE+'/'))return value;
 const u=new URL(value,'https://demo.local');let path=u.pathname;
 if(!path.split('/').pop()?.includes('.')&&!path.endsWith('/'))path+='/';
 return BASE+path+u.search+u.hash;
}
function propsFor(type:any,props:any){if(typeof type!=='string'||!props)return props;return {...props,...(props.href?{href:localUrl(props.href)}:{}),...(props.src?{src:localUrl(props.src)}:{})};}
export const jsx=(type:any,props:any,key?:any)=>runtime.jsx(type,propsFor(type,props),key);
export const jsxs=(type:any,props:any,key?:any)=>runtime.jsxs(type,propsFor(type,props),key);

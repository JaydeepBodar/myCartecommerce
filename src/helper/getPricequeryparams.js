export const getPricequeryparams=(queryparams,key,value)=>{
    const hasvalue=queryparams.has(key)
    if(value && hasvalue){
        queryparams.set(key,value)
    }else if(value){
        queryparams.append(key,value)
    }else if(hasvalue){
        queryparams.delete(key,value)
    }
    return queryparams ; 
}
export const parseCallbackUrl = (url) => {
    const res = url.replace(/%3A/g, ":").replace(/%2F/g, "/");
    return res;
  };
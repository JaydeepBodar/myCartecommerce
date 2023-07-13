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
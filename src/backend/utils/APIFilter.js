class APIFilter{
    constructor(query,queryStr){
        this.query=query,
        this.queryStr=queryStr
    }
    search(){
        const keyword=this.queryStr.data?{ 
            name:{
                $regex:this.queryStr.data,
                $options:'i'
            }
        }:{}
        console.log("word",keyword)       
        this.query=this.query.find({...keyword}) 
				return this	
    }
}
export default APIFilter;
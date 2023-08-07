class APIFilter {
  constructor(query, queryStr) {
    (this.query = query), (this.queryStr = queryStr);
  }
  search() {
    const keyword = this.queryStr.data
      ? {
          title: {
            $regex: this.queryStr.data,
            $options: "i",
          },
        }
      : {};
    // console.log("word", keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    const remove = ["data", "page"];
    remove.forEach((newdata) => delete queryCopy[newdata]);
    // console.log("queryCopy", queryCopy);
    // for price filter it's take it from chat gpt
    let output = {};
    let props = "";
    for (let key in queryCopy) {
      if (!key.match(/\b(gt|gte|lt|lte)/)) {
        output[key] = queryCopy[key];
      } else {
        props = key.split("[")[0];
        console.log("props", props);
        let operator = key.match(/\[(.*)\]/)[1]; 
        if (!output[props]) {
          output[props] = {};
        }
        output[props][`$${operator}`] = queryCopy[key];
      }
    }
    // console.log("output", output);
    this.query = this.query.find(output);
    return this;
  }
  pagination(resperPage) {
    const currentpage = Number(this.queryStr.page) || 1;
    const skip = resperPage * (currentpage - 1);
    this.query = this.query.limit(resperPage).skip(skip);
    return this;
  }
}
export default APIFilter;

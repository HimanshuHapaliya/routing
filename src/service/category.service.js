import request from "./request";

const ENDPOINT="/api/category";

const getAll=async()=>{
    const url=`${ENDPOINT}/all`;
    request.get(url).then((res)=> {return res})
}

const categoryService={
    getAll
}
export default categoryService
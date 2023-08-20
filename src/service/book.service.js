import request from "./request";
const ENDPOINT='/api/book';

const search=async (query)=>{
    const url=`${ENDPOINT}/search?keyword=${query}`;
    return request.get(url).then((res)=>{
        return res})
}

const getAll=async (params)=>{
    const url=`${ENDPOINT}`
    return request.get(url,{params}).then((res)=>{
        return res;
    })
}

const bookService={
    search,
    getAll
};
export default bookService;
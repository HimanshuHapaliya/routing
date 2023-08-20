import { useEffect, useState } from "react"
import categoryService from "../../service/category.service";
import { useMemo } from "react";
import bookService from "../../service/book.service";
import { Grid, Pagination } from '@mui/material';


const BookListing = () => {

    const [sortBy, setSortBy] = useState();
    const [categories, setCategories] = useState();
    const [bookResponse, setBookResponse] = useState({
        pageIndex: 0,
        pageSize: 10,
        totalPages: 1,
        items: [],
        totalItems: 0
    });
    const [filters, setFilters] = useState({
        pageIndex: 1,
        pageSize: 2,
        keyword: ""
    })

    const getAllCategories = async () => {
        await categoryService.getAll().then((res) => {
            if (res)
                setCategories(res);
        });
    }

    const getAllBooks = async (filters) => {
        await bookService.getAll(filters).then((res) => {
            if (res)
                setBookResponse(res);
        })
    }

    const books = useMemo(() => {
        const bookList = [...bookResponse.items];
        if (bookList) {
            bookList.forEach((element) => {
                if (categories)
                    element.category = categories.find((a) => a.id === element.categoryId
                    )?.name;
            })
        }
        return bookList;
    }, [categories, bookResponse]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (filters.keyword === "")
                delete filters.keyword;
            getAllBooks({ ...filters })
        }, 500);
        return () => { clearTimeout(timer); }
    }, [filters]);

    useEffect(() => {
        getAllCategories();
    }, []);

    const sortBooks = (e) => {
        setSortBy(e.target.value);
        const bookList = [...bookResponse.items];
        bookList.sort((a, b) => {
            if (a.name > b.name) {
                return e.target.value === "a-z" ? 1 : -1;
            }
            else if (a.name < b.name) {
                return e.target.value === "a-z" ? -1 : 1;
            }
            return 0;
        })
        setBookResponse({ ...bookResponse, items: bookList });
    }
    return (
        <div>
            <div>
                <h2>Book Listing</h2>
            </div>
            <div>
                <Grid container>
                    <Grid item xs={6}>
                        Total
                        <span> - {bookResponse.totalItems} items</span>
                    </Grid>
                    <Grid xs={6}>
                        <input type="text" placeholder="Search.." onChange={(e) => {
                            setFilters(
                                {
                                    ...filters,
                                    keyword: e.target.value,
                                    pageIndex: 1
                                }
                            )
                        }} /><br />
                        <label>Sort by:</label>
                        <select value={sortBy} onChange={sortBooks}>
                            <option value="a-z">a - z</option>
                            <option value="z-a">z - a</option>
                        </select>
                    </Grid>
                    <Grid sm={12}>

                        {
                            books.map((book, index) => {
                                return (
                                    <Grid item sm={4} key={index} style={{border:"1px solid black"}}>
                                        <div>
                                            <img src={book.base64image} alt="dummyImage" />
                                        </div>
                                        <div >
                                            <h4>{book.name}</h4>
                                            <span>{book.category}</span>
                                            <p>{book.description}</p>
                                            <p><span>MRP &#8377; {book.price}</span></p>
                                            <button>
                                                <span>Add to Cart</span>
                                            </button>
                                        </div>

                                    </Grid>
                                )
                            })
                        }

                    </Grid>
                    <div>
                        <Pagination count={bookResponse.totalPages}
                            page={filters.pageIndex}
                            onChange={(e, newPage) => {
                                setFilters({ ...filters, pageIndex: newPage })
                            }} />
                    </div>
                </Grid>
            </div>
        </div>
    )
}
export default BookListing;
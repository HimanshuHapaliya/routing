import { NavLink } from 'react-router-dom';
import { NavigationItems } from '../../utils/shared';
import { useMemo, useState } from 'react';
import bookService from '../../service/book.service';
import { useAuthContext } from '../../context/auth';
function Header(props) {
    const [query, setQuery] = useState('');
    const [bookList, setBookList] = useState([]);
    function onSearchHandler() {
        setBookList(bookService.search(query));
    }
    const authContext=useAuthContext();
    
    const Items=useMemo(()=>{
        const itemList= (NavigationItems.filter((item)=>{
            return !item.access.length || item.access.includes(authContext.user.roleId);
        }))
        return itemList;
    },[authContext.user]);
    console.log();
    return (
        <div>
            This is header
            <div>
                <NavLink to="/" >Home</NavLink>
            </div>
            <div>
                <NavLink to="/about" >About</NavLink>
            </div>

            <>
            {!authContext.user.id &&
            <div>
                <NavLink to="/login" >Login</NavLink>  |   <NavLink to="/register">Register</NavLink>
            </div>
            }
            </>
            <>
                {Items.map((navItem, index) => {
                    return (
                        <div key={index}>
                            <NavLink to={navItem.route}>{navItem.name}</NavLink>
                        </div>)
                })}
                {
                    !!authContext.user.id && <button onClick={authContext.logOut}>Log Out</button>
                }
            </>
            <div>
                <input type='text' placeholder='What are you looking for..'
                    onChange={(e) => {
                        setQuery(e.target.value)
                    }} />
                <button onClick={onSearchHandler}>Search</button>
                {
                    bookList.length > 0 && bookList.map((list, index) => {
                        return (
                            <div key={index}>
                                <span>{list.name}-{list.price}</span>
                                <p>{list.description}</p>
                            </div>
                        )
                    })
                    
                }
            </div>
        </div>
    );

};

export default Header;
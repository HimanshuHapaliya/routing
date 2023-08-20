import BookListing  from '../pages/BookListing/index';
import { useAuthContext } from '../context/auth';
import Login from '../pages/Login';
import Register from '../pages/Register';
import {Routes,Route, Navigate} from 'react-router-dom';

  

  const Redirect=(props)=>{
      return(props.isLoggedIn?<props.component/>:<Navigate to='/login'/>)
  }

function LoginPage() {
    const authContext=useAuthContext();
    return (<>
    <Routes>
      <Route  path={'/login'} element={<Login/>} />
      <Route  path={'/register'} element={<Register/>} />
      <Route path={'/'} element={<Redirect isLoggedIn={!!authContext.user.id} component={BookListing}/>}/>
    </Routes>   
    </>);

}
export default LoginPage;
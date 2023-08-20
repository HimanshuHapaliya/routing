import * as Yup from 'yup';
import { Formik } from 'formik';
import ValidationMessage from '../../components/ValidationMessage';
import authService from '../../service/auth.service';
import { useAuthContext } from '../../context/auth';
import {  useNavigate } from 'react-router-dom';


function Login(){
    const navigate=useNavigate();
    const loginSchema=Yup.object().shape({
        email:Yup.string().required('Email is required').email(),
        password:Yup.string().min(4,"Password length must be grater than 3.").required('Password is required')
    })

    const authContext=useAuthContext();

    const loginData=async(data)=>{
        console.log(JSON.stringify(data));
        // try{
        //     const response=await fetch("https://book-e-sell-node-api.vercel.app/api/user/login",{
        //         method:'POST',
        //         body:JSON.stringify(data),
        //         headers:{
        //             'Content-Type':'application/json'
        //         }
        //     })
        //     const output=await response.json();
        //     console.log(output);
        // }
        // catch(error){
        //     console.log(error);
        // }
        authService.login(data).then((res)=>{
            console.log("Login Successfully");
            authContext.setUser(res);
            navigate('/')
            console.log(res);
        })
    }

    return(
        <>
        <h2>Login or Create Account</h2>
        <fieldset style={{ width: '200px' }}>
                <legend>Login</legend>
                        <Formik initialValues={{email:"",
                        password:""}} validationSchema={loginSchema} onSubmit={loginData}>
                            {
                                ({values,errors,touched,handleChange,handleSubmit})=>{
                                    return(
                                        <form onSubmit={handleSubmit}>
                                            <input name='email' placeholder='Email' onChange={handleChange} value={values.email}/>
                                            <br/>
                                            <ValidationMessage touch={touched.email} message={errors.email}/>
                                            <br/>
                                            <input name='password' type="password" placeholder='Password' onChange={handleChange} value={values.password}/>
                                            <br/>
                                            <ValidationMessage touch={touched.password} message={errors.password}/>
                                            <br/>
                                            <button type="submit">Login</button>
                                        </form>
                                    )
                                }
                            }
                        </Formik>
            </fieldset>
        </>
    )
}

export default Login;
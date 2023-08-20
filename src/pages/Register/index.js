import * as Yup from 'yup';
import { Formik } from 'formik';
import ValidationMessage from '../../components/ValidationMessage';
import authService from '../../service/auth.service';
import {useNavigate} from 'react-router-dom';

function Register(){

    const navigate=useNavigate();
    const fecthData = async (data) => {
        delete data.cpassword;
        console.log(data);
        // try {
        //     const res = await fetch("https://book-e-sell-node-api.vercel.app/api/user", {
        //         method: 'POST',
        //         body: JSON.stringify(data),
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //     const output = await res.json();
        //     console.log(output);
        // }
        // catch (error) {
        //     console.log(error);
        // }
        authService.create(data).then((res)=>{
            navigate("/login");
        })
    }

    
    const roleList = [
        { id: 2, name: "Seller" },
        { id: 3, name: "Buyer" },
    ];

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        roleId: Yup.number().required('Role is required'),
        email: Yup.string().required("Email is required").email("Enter valid Email ID"),
        password: Yup.string().min(4, "Password is too short - should be 4 chars minimum").required("Password is required"),
        cpassword: Yup.string().oneOf([Yup.ref("password")], 'Password and Confirm Password must be match.').required('Confirm Password is required')
    });

    return(
        <>

        <div>
            <fieldset style={{ width: '200px' }}>
                <legend><caption>Register</caption></legend>
                <Formik initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    roleId: "",
                    password: "",
                    cpassword: ""
                }} validationSchema={validationSchema} onSubmit={fecthData} >
                    {
                        ({ values, errors, touched, handleChange, handleSubmit }) => {
                            return (
                                <form onSubmit={handleSubmit}>
                                    <input name='firstName' placeholder='First Name' onChange={handleChange} />
                                    <input name='lastName' placeholder='Last Name' onChange={handleChange} />
                                    <br />
                                    <ValidationMessage touch={touched.firstName} message={errors.firstName} /><ValidationMessage touch={touched.lastName} message={errors.lastName} /><br />
                                    <input name="email" placeholder='Email' onChange={handleChange} />
                                    <br /><ValidationMessage touch={touched.email} message={errors.email} /><br />
                                    <select name="roleId" value={values.roleId} onChange={handleChange}>
                                        <option selected>None</option>
                                        {roleList.length > 0 &&
                                            roleList.map((role) => (
                                                <option
                                                    value={role.id}
                                                    key={"name" + role.id}
                                                >
                                                    {role.name}
                                                </option>
                                            ))}
                                    </select>
                                    <br /><ValidationMessage touch={touched.roleId} message={errors.roleId} /><br />
                                    <input name="password" placeholder='password' type='password' onChange={handleChange} />
                                    <br />
                                    <ValidationMessage touch={touched.password} message={errors.password} />
                                    <br />
                                    <input name='cpassword' placeholder='Confirm Password' type='password' onChange={handleChange} />
                                    <br />
                                    <ValidationMessage touch={touched.cpassword} message={errors.cpassword} />
                                    <button type="submit">Register</button>
                                </form>
                            )
                        }
                    }
                </Formik>
            </fieldset>
        </div>
        </>
    )
}
export default Register;
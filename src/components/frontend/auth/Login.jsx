import {React,useState} from "react";
import { Link ,useHistory} from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";

export default function Login(){
    
    const history = useHistory();

    const [loginInput, setLogin] = useState({
        email: "",
        password: "",
        errors_list: "",
    });

    const handleInput = (e) => {
        let key = e.target.name;
        let val = e.target.value;

        setLogin({ ...loginInput, [key]: val });
    };

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password,
        };

                 axios.post("/api/login", data).then((res) => {
                if (res.data.status === 200) {
                    localStorage.setItem("auth_token", res.data.token);
                    localStorage.setItem("auth_name", res.data.username);
                    toast.success(res.data.message);
                    history.push("/");
                } else if (res.data.status === 401) {
                    toast.error(res.data.message);
                } else {
                    setLogin({ ...loginInput, errors_list: res.data.validator_errors });
                }
            });
    
    };
    return(
        <section className="h-screen">
        <div className="container px-6 py-12 h-full">
            <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="w-full" alt="Phone image" />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                <form onSubmit={loginSubmit}>

                <div className="mb-6">
                    <input  type="text" 
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Email address" 
                            name="email"
                            value={loginInput.email}
                            onChange={(e) => handleInput(e)}
                    />
                    <span className="py-5 px-6 mb-4 text-base text-yellow-700 mb-3" role="alert">
                        {loginInput.errors_list.email}
                    </span>
                </div>

                <div className="mb-6">
                    <input  type="password"
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Password" 
                            name="password"
                            value={loginInput.password}
                            onChange={(e) => handleInput(e)}
                    />
                    <span className="py-5 px-6 mb-4 text-base text-yellow-700 mb-3" role="alert">
                        {loginInput.errors_list.password}
                    </span>
    
                </div>

                <div className="flex justify-between items-center mb-6">
                    <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" id="exampleCheck3" defaultChecked />
                    <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2">Remember me</label>
                    </div>
                    <a href="#!" className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out">Forgot password?</a>
                </div>
                <button type="submit" className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full" data-mdb-ripple="true" data-mdb-ripple-color="light">
                    Sign in
                </button>
                <div className="flex justify-between items-center mb-6 mt-6">
                    <Link to="/register"
                        className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                    >Create an account</Link>
                </div>
                </form>
            </div>
            </div>
        </div>
        </section>
    );
}
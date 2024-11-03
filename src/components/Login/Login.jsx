import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as storelogin } from '../../store/authSlice';
import { Button, Input } from '../index';
import authService from '../../appwrite/auth';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');

    const login = async (data) => {
        console.log(data);
        setError(""); // Reset error message
        try {
            console.log(data.email,data.password)
            const session = await authService.login(data.email,data.password);
            console.log(session)
            if (session) {
                const userData = await authService.getcurrentUser();
                if (userData) dispatch(storelogin(userData));
                navigate('/');
            }
        } catch (error) {
            // Set the error message to the error state
            console.log(error)
            setError(error.message || "An error occurred during login.");
        }
    };

    return (
        <div className='w-full bg-yellow-300 flex justify-center items-center flex-col h-lvh'>
            {/* <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        logo
                    </span>
                </div>
            </div> */}

            <h1>Sign in to your account</h1>
            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign Up
                </Link>
            </p>

            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

            <form onSubmit={handleSubmit(login)} className="mt-8">
                <div className="space-y-5">
                    <Input
                        label="Email"
                        placeholder="enter your email account"
                        type="email"
                        {...register("email", {
                            required: true,
                        })}
                    />
                </div>
                <div className="space-y-5">
                    <Input
                        label="password"
                        placeholder="enter password"
                        type="password"
                        {...register("password", {
                            required: true
                        })}
                    />
                </div>
                <Button type="submit">Sign in</Button>
            </form>
        </div>
    );
};

export default Login;

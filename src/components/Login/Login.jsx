import React, { useState } from 'react';
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
        setError(""); // Reset error message
        try {
            const session = await authService.login(data.email, data.password);
            if (session) {
                const userData = await authService.getcurrentUser();
                if (userData) dispatch(storelogin(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message || "An error occurred during login.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 font-mono">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center text-black">Sign in to your account</h1>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Don't have an account?&nbsp;
                    <Link to="/signup" className="text-black hover:underline">
                        Sign Up
                    </Link>
                </p>

                {error && <p className='text-red-500 mt-4 text-center'>{error}</p>}

                <form onSubmit={handleSubmit(login)} className="mt-6">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
                            <Input
                                id="email"
                                placeholder="Enter your email account"
                                type="email"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                                {...register("email", { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
                            <Input
                                id="password"
                                placeholder="Enter password"
                                type="password"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-black"
                                {...register("password", { required: true })}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full mt-6  text-white font-semibold py-2 rounded">
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;

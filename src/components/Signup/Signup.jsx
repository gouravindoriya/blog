import React, { useState } from 'react';
import authService from '../../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../store/authSlice';
import { Button, Input } from '../index';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data.email, data.password, data.name);
            if (userData) {
                const currentUser = await authService.getcurrentUser();
                if (currentUser) dispatch(login(currentUser));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 font-mono">
            <div className="mx-auto w-full max-w-md bg-white rounded-lg shadow-lg p-10">
                <h2 className="text-center text-2xl font-bold text-black">Sign up to create an account</h2>
                <p className="mt-2 text-center text-base text-gray-600">
                    Already have an account?&nbsp;
                    <Link to="/login" className="text-black hover:underline">
                        Sign In
                    </Link>
                </p>
                

                <form onSubmit={handleSubmit(create)} className="mt-6">
                    <div className='space-y-6'>
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">Full Name</label>
                            <Input
                                id="name"
                                placeholder="Enter your full name"
                                {...register("name", { required: true })}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
                            <Input
                                id="email"
                                placeholder="Enter your email"
                                {...register("email", { required: true })}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
                            <Input
                                id="password"
                                placeholder="Enter your password"
                                type="password"
                                {...register("password", { required: true })}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                        <Button type="submit" className="w-full mt-6  font-semibold py-2 rounded">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;

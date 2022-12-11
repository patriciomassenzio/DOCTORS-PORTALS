import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../utilities/firebase.init';
import useToken from '../../hooks/useToken';
import toast from 'react-hot-toast';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true, emailVerificationOptions: { url: 'http://localhost:3000/' } });
    const [signInWithGoogle, gUser, gLoading] = useSignInWithGoogle(auth);
    const [updateProfile] = useUpdateProfile(auth);
    const navigate = useNavigate();
    const [token] = useToken(user || gUser);

    const onSubmit = async (data) => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
    };

    if (token) {
        navigate('/', { replace: true });
    }
    if (error) {
        toast.error('Email already exists.');
    }

    return (
        <div className='lg:w-2/6 px-4 lg:px-0 mx-auto min-h-screen flex items-center'>
            <div className="card shadow-lg border">
                <div className="card-body">
                    <h2 className="card-title justify-center">Sign Up</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="name">Name</label>
                        <input type='text' className='input input-bordered w-full'
                            {...register("name", { required: "Name is required" })}
                            aria-invalid={errors.name ? "true" : "false"}
                        />
                        {errors.name && <p role="alert" className='text-error'>{errors.name?.message}</p>}
                        <label htmlFor="email">Email</label>
                        <input type='email' className='input input-bordered w-full'
                            {...register("email", { required: "Email is required" })}
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email && <p role="alert" className='text-error'>{errors.email?.message}</p>}
                        <label htmlFor="password">Password</label>
                        <input type='password' className='input input-bordered w-full'
                            {...register("password", { required: true, minLength: { value: 6, message: 'Password should at least 6 characters.' } })}
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        {errors.password && <p role="alert" className='text-error'>{errors.password?.message}</p>}

                        {loading || gLoading
                            ? <button className="btn loading w-full mt-4 mb-2 uppercase" disabled>SignUp</button>
                            : <input type="submit" value='SignUp' className='btn btn-neutral w-full mt-4 mb-2' />}

                        <label htmlFor="">Already registered? <Link to='/login' className='text-primary'>Login now</Link> </label>
                    </form>
                    <div className="divider">OR</div>
                    <button className="btn btn-outline w-full"
                        onClick={() => signInWithGoogle()}>Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
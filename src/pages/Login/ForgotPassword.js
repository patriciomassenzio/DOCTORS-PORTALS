import React from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import auth from '../../utilities/firebase.init';

const ForgotPassword = () => {
    const [sendPasswordResetEmail, loading] = useSendPasswordResetEmail(auth);
    const nv = useNavigate();

    const handleForgotPassword = async e => {
        e.preventDefault();
        const email = e.target.email.value;
        const success = await sendPasswordResetEmail(email, { url: 'http://localhost:3000/login' });
        if (success) {
            toast.success("Check email to reset your password.");
            nv('/', { replace: true });
        } else {
            toast.error("Enter email address correctly.");
        }
    }


    return (
        <div className='lg:w-1/3 px-4 lg:px-0 mx-auto min-h-screen flex items-start justify-center pt-20'>
            <div className="card shadow-lg w-full border">
                <div className="card-body">
                    <h2 className="card-title justify-center">Forgot Password</h2>

                    <form onSubmit={handleForgotPassword}>
                        <input type='email' name='email' className='input input-bordered w-full my-6'
                            placeholder='Enter email address' required />
                        {loading
                            ? <button className='btn loading w-full' disabled>Sending Email</button>
                            : <input type="submit" value='Forgot Password' className='btn btn-neutral w-full' />}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
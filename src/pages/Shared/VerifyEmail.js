import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import auth from '../../utilities/firebase.init';
import Loading from './Loading';
import PrimaryButton from './PrimaryButton';

const VerifyEmail = () => {
    const [user, loading] = useAuthState(auth);
    const [sendEmailVerification, sending] = useSendEmailVerification(auth);
    if (loading) { return <Loading /> }
    return (
        <div className='min-h-screen flex justify-center mt-14'>
            <div className='flex flex-col'>
                <h2 className='text-xl font-semibold text-green-800'>Email hasn't been verified!</h2>
                <p className='text-md font-normal'>Please verify before using Doctors Portal.</p>
                <p className='text-md font-normal my-4'>Email address registered: <code>{user.email}</code> </p>

                {sending ? <Loading /> :
                    <PrimaryButton><button onClick={async () => {
                        const success = await sendEmailVerification();
                        success && toast.success('Email has been sent. Check email inbox/spam.');
                    }}>Resend Verification Email</button></PrimaryButton>}

            </div>
        </div>
    );
};

export default VerifyEmail;
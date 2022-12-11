import React from 'react';
import { useUpdatePassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import auth from '../../utilities/firebase.init';
import PageTitle from '../Shared/PageTitle';

const UpdatePassword = () => {
    const { register, formState: { errors }, handleSubmit, getValues } = useForm();
    const [updatePassword, updating, error] = useUpdatePassword(auth);
    const navigate = useNavigate();

    const onSubmit = async ({ oldpass, newpass, confirmpass }) => {
        if (oldpass !== newpass && newpass === confirmpass) {
            const success = await updatePassword(newpass);
            if (success) {
                toast.success('Password updated successfully.')
                navigate('/dashboard', { replace: true })
            } else { toast.error('Something error happend. Try after sometime.') }
        } else {
            alert('New password should be different from the old one.')
        }
    };
    if (error) { toast.error('Something error happend. Try after sometime.') }

    return (
        <div>
            <PageTitle title='Change Password' />
            <h2 className='text-xl mb-5 text-primary'>Change Password</h2>

            <form onSubmit={handleSubmit(onSubmit)} className='lg:w-1/2'>
                <label htmlFor="oldpass">Old Password</label>
                <input type='password' className='input input-bordered w-full mb-2'
                    {...register("oldpass", { required: true })}
                    aria-invalid={errors.oldpass ? "true" : "false"}
                />
                {errors.oldpass?.type === 'required' && <p role="alert" className='text-error'>Password is required</p>}

                <label htmlFor="newpass">New Password</label>
                <input type='password' className='input input-bordered w-full mb-2'
                    {...register("newpass", { required: true })}
                    aria-invalid={errors.newpass ? "true" : "false"}
                />
                {errors.newpass?.type === 'required' && <p role="alert" className='text-error'>Password is required</p>}
                <label htmlFor="confirmpass">Confirm New Password</label>
                <input type='password' className='input input-bordered w-full mb-2'
                    {...register("confirmpass", { required: true })}
                    aria-invalid={errors.confirmpass ? "true" : "false"}
                />
                {errors.confirmpass?.type === 'required' && <p role="alert" className='text-error'>Password is required</p>}
                {getValues('newpass') !== getValues('confirmpass') && <p role="alert" className='text-error'>Password doesn't match.</p>}



                {updating
                    ? <button className="btn loading w-full mt-4 uppercase" disabled>Update</button>
                    : <input type="submit" value='Update' className='btn btn-neutral w-full mt-4' />}
            </form>
        </div>
    );
};

export default UpdatePassword;
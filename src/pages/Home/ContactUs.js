import React from 'react';
import { useForm } from 'react-hook-form';
import SectionHeading from '../Shared/SectionHeading';

const ContactUs = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        reset();
    };

    return (
        <section className='contact-us my-10 py-16 text-center'>
            <SectionHeading title={'Contact Us'} subTitle={'Stay connected with us'} textColor={'text-white'} />
            <div className="mt-8 lg:w-2/4 px-4 mx-auto">
                <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
                    <input type='text' className='input input-bordered w-full'
                        placeholder='Enter full name'
                        {...register("name", { required: "Name is required" })}
                        aria-invalid={errors.name ? "true" : "false"}
                    />
                    {errors.name && <p role="alert" className='text-error'>{errors.name?.message}</p>}
                    <input type='email' className='input input-bordered w-full'
                        placeholder='Enter email address'
                        {...register("email", { required: "Email is required" })}
                        aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && <p role="alert" className='text-error'>{errors.email?.message}</p>}
                    <textarea className='textarea textarea-bordered w-full'
                        placeholder='Enter your message'
                        {...register("message", { required: "Message is required" })}
                        aria-invalid={errors.message ? "true" : "false"}
                    />
                    {errors.message && <p role="alert" className='text-error'>{errors.message?.message}</p>}
                    <input className='btn btn-primary text-white mt-4 w-2/6 normal-case mx-auto' type="submit" value="SEND" />
                </form>
            </div>
        </section>
    );
};

export default ContactUs;
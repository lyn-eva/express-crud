import { useForm } from 'react-hook-form';

export default function LogIn() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch('http://localhost:5000/user/login', { method: 'POST', body: JSON.stringify(data) });
  };

  return (
    <main className='grid grow place-items-center'>
      <div className='rounded-md bg-gray-700 py-8 px-10 text-white'>
        <h1 className='mb-4 text-center text-xl font-medium'>Log in to your account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mt-4'>
            <label>Email</label>
            <input
              className='mt-2 block py-[2px] pl-2 text-black'
              placeholder='enter a email'
              {...register('email', {
                required: { value: true, message: 'email is requiered' },
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
                  message: 'please enter a valid email',
                },
              })}
            />
            {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
          </div>
          <div className='mt-4'>
            <label>Password</label>
            <input
              className='mt-2 block py-[2px] pl-2 text-black'
              placeholder='enter a password'
              {...register('pwd', {
                required: { value: true, message: 'password is requiered' },
                maxLength: { value: 10, message: 'must not longer than 10 characters' },
              })}
            />
            {errors.pwd && <span className='text-red-500'>{errors.pwd.message}</span>}
          </div>
          <button type='submit' className='mt-6 w-full bg-orange-600 py-1 text-center'>
            Log In
          </button>
        </form>
      </div>
    </main>
  );
}

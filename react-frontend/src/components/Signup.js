import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();

  const { mutateAsync, error } = useMutation((data) => createAcc(data));
  const redirect = useNavigate();

  const onSubmit = async (data) => {
    await mutateAsync(data);
    redirect('/');
  };

  return (
    <main className='grid grow place-items-center'>
      <div className='rounded-md bg-gray-700 py-8 px-10 text-white'>
        <h1 className='mb-4 text-center text-xl font-medium'>Create a new account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Username</label>
            <input
              className='mt-2 mb-1 block py-[2px] pl-2 text-black'
              placeholder='enter a username'
              {...register('username', {
                required: { value: true, message: 'username is required' },
                maxLength: { value: 15, message: 'must not exceed 15 characters' },
              })}
            />
            {errors.username && <span className='text-red-500'>{errors.username.message}</span>}
          </div>
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
              {...register('password', {
                required: { value: true, message: 'password is requiered' },
                maxLength: { value: 10, message: 'must not longer than 10 characters' },
              })}
            />
            {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
          </div>
          {error && <span className='mt-2 block text-red-500'>{error.message}</span>}
          <button type='submit' className='mt-6 w-full bg-orange-600 py-1 text-center'>
            Create account
          </button>
        </form>
      </div>
    </main>
  );
}

const createAcc = async (body) => {
  const res = await fetch('http://localhost:5000/user/signup', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error);
  }
  return res.msg;
};

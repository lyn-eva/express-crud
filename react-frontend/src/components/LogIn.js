import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../App';

export default function LogIn() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();
  const redirect = useNavigate();

  const { mutateAsync, error } = useMutation((body) => loginUser(body), {
    onSuccess: () => queryClient.invalidateQueries('user'),
  });

  const onSubmit = async (data) => {
    await mutateAsync(data);
    redirect('/');
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
              {...register('password', {
                required: { value: true, message: 'password is requiered' },
                maxLength: { value: 10, message: 'must not longer than 10 characters' },
              })}
            />
            {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
          </div>
          {error && <span className='mt-2 block text-red-500'>{error.message}</span>}
          <button type='submit' className='mt-6 w-full bg-orange-600 py-1 text-center'>
            Log In
          </button>
        </form>
      </div>
    </main>
  );
}

const loginUser = async (data) => {
  const response = await fetch('http://localhost:5000/user/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'Application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    const res = await response.json();
    throw new Error(res.error);
  }
  return response.json();
};

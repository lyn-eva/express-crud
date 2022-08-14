import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { queryClient } from '../App';

function Nav() {
  const { data: user, isLoading } = useQuery('user', userQuery);

  const { mutate } = useMutation(() => userQuery({ method: 'POST', path: '/logout' }), {
    onSuccess: () => queryClient.invalidateQueries('user'),
  });

  return (
    <header className='flex justify-between py-5 text-lg'>
      <Link to='/' className='text-xl font-semibold'>
        Noto
      </Link>
      <nav className='flex gap-7'>
        {isLoading ? null : (
          <>
            {user.loggedIn ? (
              <button onClick={() => mutate()}>Log out</button>
            ) : (
              <Link to='login'>Log In</Link>
            )}
            <Link to='signup'>Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Nav;

const userQuery = async ({ method = 'GET', path = '' }) => {
  const user = await fetch('http://localhost:5000/user' + path, { method, credentials: 'include' });
  if (!user.ok) {
    const result = await user.json();
    throw new Error(result.error);
  }
  return user.json();
};

import { Link } from 'react-router-dom';

function Nav() {
  return (
    <header className='flex justify-between py-5 text-lg'>
      <Link to='/' className='text-xl font-semibold'>Noto</Link>
      <nav className='flex gap-7'>
        <Link to='login'>Log In</Link>
        <Link to='signup'>Sign Up</Link>
      </nav>
    </header>
  );
}

export default Nav;

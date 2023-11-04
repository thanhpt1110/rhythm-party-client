import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const handleSubmit = (e) => {
  // e.preventDefault();
  // // Perform sign-in logic here
  // console.log(`Email: ${email}, Password: ${password}`);
  // // Reset form fields
  // setEmail('');
  // setPassword('');
  // };
  return (
    <section className=' bg-gray-200 min-h-screen flex items-center justify-center '>
      <div className='bg-gray-100 p-5 flex rounded-2xl shadow-lg md:w-1/3'>
        <div className='md:w-full px-5'>
          <h2 className='text-3xl font-bold text-[#002D74] text-center'>Login</h2>
          <p className='text-sm mt-6 text-[#002D74]'>
            If you have an account, please login
          </p>
          <form className='mt-6' action='#'>
            <div>
              <label className='block text-gray-700'>Email:</label>
              <input type='email' name='' id='email' placeholder='Enter your Email' className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none hover:border-blue-500' autoFocus autoComplete='' required/>
            </div>

            <div className='mt-4'>
              <label className='block text-gray-700'>Password:</label>
              <input type='password' name='' id='pass' placeholder='Enter Password' minLength='6' className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                                  focus:bg-white focus:outline-none hover:border-blue-500' required/>
            </div>

            <div className='text-right mt-2'>
              <a href='#password-reset' className='text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700'>
                Forgot Password?
              </a>
            </div>

            <button type='submit' className='w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6'>
              Log In
            </button>
          </form>

          <div className='mt-7 grid grid-cols-3 items-center text-gray-500'>
            <hr className='border-gray-500'/>
            <p className='text-center text-sm'>OR</p>
            <hr className='border-gray-500'/>
          </div>

          <button className='bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 '>
            <img src='https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK' alt='googleimg' className='h-6 w-6'/>
            <span className='ml-4'>Login with Google</span>
          </button>

          <div className='text-sm flex gap-4 items-center mt-6'>
            <p>If you don't have an account ?</p>
            <div className='text-right '>
              <Link to='/signup' className='text-sm font-bold hover:underline text-gray-700 hover:text-blue-700 focus:text-blue-700'>
                Create new account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;

import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/authContext';
import { useForm } from '../../hooks/useForm';
import { types } from '../../types/types';
import { Link } from 'react-router-dom';

export const LoginScreen = () => {

  const [ formValues, handleInputChange, reset ] = useForm({
    name: 'Saulo',
    email: '',
    password: ''
  });
  const { name, email, password } = formValues;

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);


  const handleSubmit = (e) => {
      e.preventDefault();

      dispatch({
        type : types.login,
        payload: {
          name: name,
          email : email,
          password: password
        }
      });

      const lastPath = localStorage.getItem('lastPath') || '/';

      navigate( lastPath, {
        replace: true
      });

      reset();
    }

  return (
    <>
        <h3 className='auth__title'>Login</h3>

        <form onSubmit={ handleSubmit }>

          <input 
            autoComplete='off'
            className='auth__input'
            name='email'
            onChange={handleInputChange}
            placeholder='Email'
            type='email'
            value={email}
          />

          <input 
            className='auth__input'
            name='password'
            onChange={handleInputChange}
            placeholder='Password'
            type='password'
            value={password}
          />

          <button
            type='submit'
            className='btn btn-primary btn_block'
          >
            Login
          </button>

        </form>

 
        <div className='auth__social_network'>
          <p>Login with social networks</p>

          <div 
              className="google-btn"
          >
              <div className="google-icon-wrapper">
                  <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
              </div>
              <p className="btn-text">
                  <b>Sign in with google</b>
              </p>
          </div>
        </div>

        <Link 
            to="/auth/register"
            className='link'
          >
            Create new account
        </Link>
    </>
  )
}
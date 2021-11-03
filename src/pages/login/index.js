import { useState, } from "react";
import { Link, useHistory} from 'react-router-dom';
import GIF from '../../components/imgs/novologo.gif';
import './style.css';

export function Login() {
  const history = useHistory()

  const [form, setForm] = useState({ 'email': '', 'password': '' });
  const handlFormChange = (e) => {
    if (e.target.getAttribute('name') === 'femail') {
      setForm({ 'email': e.target.value, 'password': form.password });
    }
    else if (e.target.getAttribute('name') === 'fpassword') {
      setForm({ 'email': form.email, 'password': e.target.value });
    }
  }

  function SingIn() {
    return fetch('https://lab-api-bq.herokuapp.com/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,

      }),

    })
      .then((res) => res.json())
      .then((json) => {
        const token = json
        localStorage.setItem('BOORGIR', json.token);
        if (token.role === 'kitchen') {
          history.push('/cozinha')
        }

        else {history.push('/salão')}

        return token
      })
      .catch((error) => {
        console.log({
          "code": "",
          "message": ""
        }
        )
      })
  }

  return (
    <main>
      <div className='container'>
        <div className='row'>
          <div className='co1 align-items-center flex-co1' style={{ 'backgroundColor': 'black' }}>
            <img className='img-class' src={GIF} alt='gif' />
          </div>
          <div className='co1 align-items-center'>
            <div className='form-wrapper align-items-center'>
              <div className='form sign-in'>
                <p className='p-login'> Best Burger in town</p>
                <div className='input-group'>
                  <i class="far fa-envelope"></i>
                  <input type='email'
                    name="femail"
                    autoComplete='OFF'
                    value={form.email}
                    onChange={(e) => handlFormChange(e)}
                    placeholder='Digite seu e-mail'>
                  </input>
                </div>
                <div className='input-group'>
                  <i class="fas fa-lock"></i>
                  <input type='password'
                    name="fpassword"
                    value={form.password}
                    onChange={(e) => handlFormChange(e)}
                    placeholder='Digite sua senha'>
                  </input>
                </div>
                <button onClick={SingIn}>
                  Entrar
                </button>
                <p>
                  <span>
                    Não tem conta?
                  </span>
                  <b>
                    <Link className='link-class' to="/cadastrar">Cadastre-se aqui</Link>
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

}
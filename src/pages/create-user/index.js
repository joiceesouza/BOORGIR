import { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import GIF from '../../components/imgs/novologo.gif';
import Input from '../../components/inputs';
import Button from '../../components/button/button';
import Modal from '../../components/modal'

export default function CreateUser() {

  const history = useHistory()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modal, setModal] = useState(false)
  const [role, setRole] = useState('');
  const [form, setForm] = useState(
    {
      'name': '',
      'email': '',
      'password': ''
    });


  const handleFormChange = (e) => {
    if (e.target.getAttribute('name') === 'name') {
      setForm({ 'name': e.target.value, 'email': form.email, 'password': form.password });
    }
    else if (e.target.getAttribute('name') === 'email') {
      setForm({ 'name': form.name, 'email': e.target.value, 'password': form.password });
    }
    else if (e.target.getAttribute('name') === 'password') {
      setForm({ 'name': form.name, 'email': form.email, 'password': e.target.value });
    }
  }


  function handleFormSubmit() {
    return fetch('https://lab-api-bq.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        role: role,
        restaurant: "BOORGIR"

      }),

    })
      .then((res) => res.json())
      .then((json) => {
        const token = json
        if (form.name !== '' || form.email !== '' || form.password !== ''){
          setIsModalVisible(true)
        }
        return token

      })
      .catch(() => {
        setModal(true)
      })
  }

  const validation = () => {
    let errors = {};
  
    if (!form.name) {
      errors.name = 'É necessário digitar seu nome!'
    }
    if (!form.email) {
      errors.email = 'É necessario digitar seu e-mail!'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = 'Digite um e-mail válido!'
    }
    if (!form.password) {
      errors.password = 'É necessario digitar sua senha!'
    } else if (form.password.length < 6) {
      errors.password = 'Digite uma senha com 6 caracteres ou mais!'
    }
  
    return (
      errors
    )
  }

  return (
    <main>
      <div className='container'>
        <div className='row'>
          <div className='co1 align-items-center flex-co1'>
            <img className='img-class' src={GIF} alt='gif' />
          </div>
          <div className='co1 align-items-center'>
            <div className='form-wrapper align-items-center'>
              <div className='form sign-in'>
                <div className='input-group'>
                  <i className="far fa-user"></i>
                  <input type='text'
                    name="name"
                    autoComplete='OFF'
                    value={form.name}
                    onChange={(e) => handleFormChange(e)}
                    placeholder='Digite seu nome'>
                  </input>
                  <p>{validation}</p>
                </div>
                <div className='input-group'>
                  <i className="far fa-envelope"></i>
                  <Input
                    inputType='email'
                    inputName="email"
                    inputValue={form.email}
                    inputChange={(e) => handleFormChange(e)}
                    inputPlaceholder='Digite seu e-mail'>
                  </Input>
                </div>
                <div className='input-group'>
                  <i className="fas fa-lock"></i>
                  <Input
                    inputType='password'
                    inputName="password"
                    inputValue={form.password}
                    inputChange={(e) => handleFormChange(e)}
                    inputPlaceholder='Digite sua senha'
                  >
                  </Input>
                </div>
                <div className='input-group'>
                  <select className='style-option' onChange={(e) => setRole(e.target.value)}>
                    <option className='style-option'>  Escolha sua função </option>
                    <option className='style-option' value='garçom'>  Garçom/Garçonete  </option>
                    <option className='style-option' value='cozinheiro'>  Cozinheiro  </option>
                  </select>
                </div>
                <Button
                  buttonType='button'
                  buttonOnclick={handleFormSubmit}
                  buttonText="Cadastrar"
                  buttonClass='button-class'
                >
                </Button>
                <p>
                  <span>
                    Já tem uma conta?
                  </span>
                  <b>
                    <Link className='link-class' to="/">Clique aqui</Link>
                  </b>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      {isModalVisible ? (<Modal onClose={() => setIsModalVisible(false)}>
        <h2 className='h2-modal'>Cadastro realizado com sucesso!</h2>
        <button className='rota-kitchen' onClick={() => history.push('/')}>Entrar</button>
      </Modal>) : null}

      {modal ? (<Modal onClose={() => setModal(false)}>
        <h2 className='h2-modal'> Preencha corretamente todos os campos</h2>
      </Modal>) : null}
    </main>
  );
}

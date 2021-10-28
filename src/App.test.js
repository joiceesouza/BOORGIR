import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../src/components/button/button';
import Input from '../src/components/inputs/index';

// button 
test('Deve retornar a tela login', done => {
  function handleSubmit() {
    done();
  }
  const { getByText } = render(
    <Button buttonOnclick={handleSubmit} buttonText='Entrar'></Button>);
  const btnClick = getByText('Entrar');
  fireEvent.click(btnClick);
});

test('Deve retornar o cadastro', () => {
  const handleSubmit = jest.fn()
  render(
    <Button buttonOnclick={handleSubmit} buttonText='Cadastre-se'></Button>);
  expect(handleSubmit).toHaveBeenCalledTimes(0);
  fireEvent.click(screen.getByText('Cadastre-se'));
  expect(handleSubmit).toHaveBeenCalledTimes(1)
});

// input
test('Deve selecionar um atendente', done => {
  function handleChange(e) {
    expect(e.target.value).toEqual('atendente');
    done();
  }
  const { getByPlaceholderText } = render(
    <Input inputChange={handleChange} inputPlaceholder="atendente" />);
  const iptAttendant = getByPlaceholderText('atendente');
  fireEvent.change(iptAttendant, { target: { value: "atendente" } });
});

test('Deve selecionar um cozinheiro', done => {
  function handleChange(e) {
    expect(e.target.value).toEqual('cozinheiro');
    done();
  }
  const { getByPlaceholderText } = render(
    <Input inputChange={handleChange} inputPlaceholder="cozinheiro" />);
  const iptCook = getByPlaceholderText('cozinheiro');
  fireEvent.change(iptCook, { target: { value: "cozinheiro" } });
});


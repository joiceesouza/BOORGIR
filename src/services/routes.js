import { Login } from '../pages/login';
import Hall from '../pages/hall';
import CreateUser from '../pages/create-user';
import Kitchen from '../pages/kitchen';
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoutes from './private-routes';
import Finishe from '../pages/kitchen/finishe';
import Delivered from '../pages/kitchen/delivered';

function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Login} />
      <Route path='/cadastrar' component={CreateUser} />
      <PrivateRoutes path='/salão' component={Hall} />
      <PrivateRoutes path='/cozinha' component={Kitchen} />
      <PrivateRoutes path='/pedidos-prontos' component={Finishe} />
      <PrivateRoutes path='/pedidos-entregues' component={Delivered} />
    </BrowserRouter>

  )
}
export default App;
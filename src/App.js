
import {Routes,Route} from "react-router-dom"
import Header from "./Components/navigation/Header";
import Authentication from "./Components/auth/authetication.component";
import Home from "./Routes/home/home.component";
import Shop from "./shop/shop.component";
import CheckOut from "./Components/checkout/checkout.component";



function App() {
  return (
    <Routes>
    <Route path='/' element={<Header/>}>
    <Route index element={<Home/>}/>
    <Route path='shop/*' element={<Shop/>}/>
    <Route path="auth" element={<Authentication/>}/>
    <Route path='checkout' element={<CheckOut/>}/>

    </Route>
    </Routes>
  );
}

export default App;

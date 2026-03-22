import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route,
  RouterProvider 
} from "react-router"
import Home from "./pages/Home"
import Login from "./auth/Login"
import Layout from "./layout/layout"
import Cart from "./pages/Cart"
import SignUp from "./auth/SignUp"
import ProductDetails from "./pages/Product"
import About from "./pages/About"

const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/about" element = {<About/>} />
        {/* Dynamic route with product ID parameter */}
        <Route path="/product/:id" element={<ProductDetails/>} />
      </Route>

      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
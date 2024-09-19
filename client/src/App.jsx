import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import FooterCom from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminRoute from "./components/OnlyAdminRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";
import Posts from "./pages/Posts";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Header/>
      <Routes>
        <Route  path="/" element={<Home/>} />
        <Route  path="/about" element={<About/>} />
        <Route  path="/sign-in" element={<Signin/>} />
        <Route  path="/sign-up" element={<SignUp/>} />
        <Route  path="/search" element={<Search/>} />
        <Route  element={<PrivateRoute/>}>
          <Route  path="/dashboard" element={<Dashboard/>} />
        </Route>

        <Route  element={<OnlyAdminRoute/>}>
          <Route  path="/create-post" element={<CreatePost/>} />
          <Route  path="/update-post/:postId" element={<UpdatePost/>} />
        </Route>
        <Route  path="/posts" element={<Posts/>} />
        <Route  path="/posts/:postSlug" element={<PostPage/>} />
      </Routes>
      <FooterCom/>
    </BrowserRouter>
  )
}

export default App

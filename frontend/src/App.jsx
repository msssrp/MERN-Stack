import {Route , Routes , BrowserRouter as Router} from 'react-router-dom'
import './App.css'
import 'react-quill/dist/quill.snow.css';
import { UserContextProvider } from './context/UserContext'
import Layout from './components/Layout'
import IndexPage from './pages/IndexPage'
import CreatePage from './pages/CreatePage'
import PostPage from './pages/PostPage'
import EditPage from './pages/EditPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
function App() {
    return(
      <UserContextProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<IndexPage/>}/>
              <Route path='login' element={<LoginPage/>}/>
              <Route path='register' element={<RegisterPage/>}/>
              <Route path='create' element={<CreatePage/>}/>
              <Route path='edit/:id' element={<EditPage/>}/>
              <Route path='post/:id' element={<PostPage/>}/>
            </Route>
          </Routes>
        </Router>
      </UserContextProvider>
    )
 
}

export default App

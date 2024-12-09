import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
import { ROUTES } from '../../Routes';
import { Image } from 'react-bootstrap';
import '../../assets/fontNavBar.css';
import {Link} from 'react-router-dom';
import * as dataSlice from '../../slices/dataSlice'
import { useAppDispatch } from '../../slices/dataSlice';

const navbarStyle = {
  backgroundColor: '#212121',
};

function NavbarComponent() {
  const user = dataSlice.useUserInfo()
  const dispatch = useAppDispatch()

  const exitHandler = () => {
    dispatch(dataSlice.logOutAction())
  }


  return (
    <Navbar style={navbarStyle} expand="lg" variant="dark">
      <Container>
        <Link to={ROUTES.HOME} className="navbar-brand navbar-text-white">
          <Image src="/RIP_Frontend/logo.png" width={30} />
          DnD Maps
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="me-auto">
            <Link to={ROUTES.CHARACTERS} className="nav-link navbar-text-white" style={{color: "#ECE4D9"}}>
              Персонажи
            </Link>

            <Link to={ROUTES.MAPS} className="nav-link navbar-text-white" hidden={user === null} style={{color: "#ECE4D9"}}>
              Карты
            </Link>

          </div>
          <div>
            <Link to={ROUTES.AUTH} hidden={user !== null} className="nav-link navbar-text-white" style={{color: "#ECE4D9"}}>
            Войти
            </Link>
            
            <Link to={ROUTES.REGISTER} hidden={user !== null} className="nav-link navbar-text-white" style={{color: "#ECE4D9"}}>
            Регистрация
            </Link>

            <Link to={ROUTES.HOME} onClick={exitHandler} hidden={user === null} className="nav-link navbar-text-white" style={{color: "#ECE4D9"}}>
            Выйти
            </Link>

            <Link to={ROUTES.PROFILEPAGE}>{user?.email}</Link>

          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
 
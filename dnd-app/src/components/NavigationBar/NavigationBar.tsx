import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
import { ROUTES } from '../../Routes';
import { Image } from 'react-bootstrap';
import '../../assets/fontNavBar.css';
import {Link} from 'react-router-dom';


const navbarStyle = {
  backgroundColor: '#212121',
};

function NavbarComponent() {
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
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;

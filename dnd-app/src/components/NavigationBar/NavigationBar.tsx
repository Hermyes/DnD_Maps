import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ROUTES } from '../../Routes';
import { Image } from 'react-bootstrap';
import '../../assets/fontNavBar.css';

const navbarStyle = {
  backgroundColor: '#212121',
};

function NavbarComponent() {
  return (
    <Navbar style={navbarStyle} expand="lg" variant='dark'>
      <Container>
        <Navbar.Brand href={ROUTES.HOME} className="navbar-text-white">
            <Image src='http://localhost:9000/dungeonsanddragonsphotos/logo.svg' width={30}/>
            DnD Maps
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={ROUTES.CHARACTERS} className="navbar-text-white">Персонажи</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
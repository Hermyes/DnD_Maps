import { FC } from "react";
// import { Link } from "react-router-dom";
// import { ROUTES } from "../../Routes";
import { Col, Container, Row } from "react-bootstrap";
import "./Home.css"
import NavbarComponent from "../../components/NavigationBar/NavigationBar";


export const Home: FC = () => {
  return (
    <div className="background" style={{height: '100vh'}}>
        <NavbarComponent />
        <Container className="container">
        <Row className="RowClass">
            <Col md={10}>
            <h1 className="titleName">DnD Maps</h1>
            <p className="underTitle">
                Добро пожаловать в DnD Maps! Этот сервис создан для того, чтобы помочь вам создавать 
                ваши карты с персонажами по вселенной DnD. Погрузитесь в мир DnD вместе с нами!
            </p>
            </Col>
        </Row>
        </Container>
    </div>
  );
};
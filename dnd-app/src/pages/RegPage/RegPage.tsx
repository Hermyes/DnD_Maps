import { FC } from "react";
import NavbarComponent from "../../components/NavigationBar/NavigationBar";
import { useState } from 'react';
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes";

import { Button, Form } from 'react-bootstrap';



import './RegPage.css'

const RegPage: FC = () => {
    const [validated, setValidated] = useState(false);
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState(""); // Для хранения пароля
    const [confirmPassword, setConfirmPassword] = useState(""); // Для хранения подтверждения пароля
    const [passwordMatch, setPasswordMatch] = useState(true); // Для отслеживания совпадения паролей
    const [emailValid, setEmailValid] = useState(true)
    const [emailUnique, setEmailUnique] = useState(true)

    const navigate = useNavigate()
  
    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const form = event.currentTarget;

        if (Email === "") {
            setEmailValid(false);
        } else {
            setEmailValid(true);
        }

        if (password !== confirmPassword) {
            setPasswordMatch(false);
        } else {
            setPasswordMatch(true);
        }

        if (form.checkValidity() === false || !passwordMatch) {
            setValidated(true);
            return;
        }
        api.api.apiUserCreate({
            email: Email,
            password: password,
            is_staff: false,
            is_superuser: false
        }).then(() => {
            navigate(ROUTES.HOME)
        })
        .catch(() => {
            setValidated(true)
            setEmailUnique(false)
            return
        }).finally(() => {setValidated(true)})
    };
  
    return (
        <div>
            <div className="AuthPageBackground">
            <NavbarComponent />
                <div className="d-flex flex-column align-items-center gap-3 RegCardWrapper">
                    <div className="AuthTitle">
                        <img src="/RIP_Frontend/logo.png" width={60} alt="DnD Maps Logo" />
                        <span>
                        DnD Maps
                        </span>
                    </div>
                    <Form className="RegCard" noValidate validated={validated} onSubmit={handleSubmit}>
                    <div className="RegCardTitle">
                            Регистрация
                        </div>
                        <Form.Group controlId="validationCustom01">
                            <Form.Control
                                required
                                type="text"
                                placeholder="Email"
                                value={Email}
                                onChange={(el) => {
                                    setEmail(el.target.value)
                                    setEmailUnique(true)
                                    setEmailValid(true)
                                }}
                                isInvalid={!emailValid || !emailUnique}
                                className="RegCardInput"
                            />
                            <Form.Control.Feedback type="invalid">{emailValid === false ? "Обязательное поле!" : ""}</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">{emailUnique === false ? "Почта уже существует!" : ""}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationCustom02">
                            <Form.Control
                                required
                                type="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={(el) => setPassword(el.target.value)}
                                className="RegCardInput"
                            />
                            <Form.Control.Feedback type="invalid">Обязательное поле!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationCustom03">
                            <Form.Control
                                required
                                type="password"
                                placeholder="Повторите пароль"
                                value={confirmPassword}
                                onChange={(el) => setConfirmPassword(el.target.value)}
                                isInvalid={!passwordMatch}
                                className="RegCardInput"
                            />
                            <Form.Control.Feedback type="invalid">Пароли не совпадают!</Form.Control.Feedback>
                        </Form.Group>

                            <Button type="submit" className="cardButton">Зарегистрироваться</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
  }
  
  export default RegPage;
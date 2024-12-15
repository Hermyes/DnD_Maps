import "./AuthPage.css";
import { FC, useState } from "react";

import { ROUTES } from "../../Routes";

import { Button, Form } from "react-bootstrap";
import NavbarComponent from "../../components/NavigationBar/NavigationBar";
import { useNavigate } from "react-router-dom";
import { loginCreateThunk } from "../../slices/dataSlice";
import { useAppDispatch } from '../../slices/dataSlice';


const AuthPage: FC = () => {
    const [userName, setUserName] = useState('')
    const [pass, setPass] = useState('')
    const [passValid, setPassValid] = useState(true)
    const [validated, setValidated] = useState(false)
    const [logErr, setLogErr] = useState(false)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onSubmitHandler = async (event: any) => {
        const formm = event.currentTarget
        event.preventDefault()

        if(pass === "")
            setPassValid(false)
        else
            setPassValid(true)

        if(formm.checkValidity() === false || logErr === true){
            setValidated(true)
            return
        }

        dispatch(loginCreateThunk({email: userName, password: pass})).then((unwrapResult)=> {
            if(unwrapResult.payload)
                navigate(ROUTES.HOME)
            else
                setLogErr(true)
        }).finally(() => setValidated(true))
    }

    return (
        <div>
            <div className="AuthPageBackground">
            <NavbarComponent />
                <div className="d-flex flex-column align-items-center gap-3 AuthCardWrapper">
                <div className="AuthTitle">
                    <img src="http://localhost:9000/dungeonsanddragonsphotos/logo.png" width={60} alt="DnD Maps Logo" />
                    <span>
                    DnD Maps
                    </span>
                </div>
                <Form className="AuthCard" noValidate validated={validated} onSubmit={onSubmitHandler}>
                        <div className="AuthCardTitle">
                            Вход
                        </div>
                        <Form.Group>
                        <Form.Control 
                                required
                                type="text"
                                placeholder="Почта"
                                onChange={(el) => setUserName(el.target.value)}
                                className="AuthCardInput"
                            />
                            <Form.Control.Feedback type='invalid'>Обязательное поле!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control 
                                required
                                type="password"
                                placeholder="Пароль"
                                onChange={(el) => {
                                    setPass(el.target.value)
                                    setLogErr(false)
                                }}
                                isInvalid={!passValid || logErr}
                                className="AuthCardInput"
                            />
                            <Form.Control.Feedback type='invalid'>{pass === "" ? "Обязательное поле!" : ""}</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>{logErr === true ? "Неверный логин или пароль!" : ""}</Form.Control.Feedback>
                        </Form.Group>
                            <Button type="submit" className="cardButton">Войти</Button>
                    </Form>
                </div>

            </div>
        </div>
    )
}

export default AuthPage


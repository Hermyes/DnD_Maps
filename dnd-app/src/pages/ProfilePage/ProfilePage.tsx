import { FC } from "react";
import NavbarComponent from "../../components/NavigationBar/NavigationBar";
import { useState } from 'react';
import { api } from "../../api";
// import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from 'react-bootstrap';
import './ProfilePage.css'
import { useDispatch } from "react-redux";
import { setUserInfoAction, useUserInfo } from "../../slices/dataSlice"; 


const ProfilePage: FC = () => {
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const [validated, setValidated] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [sendInfo, setSendInfo] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailValid, setEmailValid] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [logErr, setLogErr] = useState(false)

    const user = useUserInfo()

    const handleUpdate = async (event: any) => {
        event.preventDefault();

        const form = event.currentTarget;


        if (email === "") {
            setEmailValid(false);
        } else {
            setEmailValid(true);
        }

        if (password !== confirmPassword) {
            setPasswordMatch(false);
            return
        } else {
            setPasswordMatch(true);
        }

        if (form.checkValidity() === false || !passwordMatch) {
            setValidated(true);
            return;
        }

        console.log(user)
        if (user && user.id) {
            await api.api.apiUserUpdate(user.id, {
                password: password,
                email: email,
            }).then((response) => {
                dispatch(setUserInfoAction(response.data))
                setSendInfo(true)
            }).catch(() => {
                setLogErr(true)
            }).finally(() => setValidated(true))
        } else {
            setLogErr(true);
        }
    }

    return(
        <div className="background">
            <NavbarComponent />
            <Form className="d-flex flex-column align-items-center gap-3 mt-5" noValidate validated={validated} onSubmit={handleUpdate}>
                <Col md="3">
                    <Form.Group as={Row} md="4" controlId="validationCustom03" className="mb-3">
                        {/* <Form.Label>Почта</Form.Label> */}
                        <Form.Control
                            required
                            type="text"
                            placeholder="Почта"
                            value={email}
                            onChange={(el) => setEmail(el.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">{emailValid === false ? "Обязательное поле!" : ""}</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{logErr === true ? "Логин занят!" : ""}</Form.Control.Feedback>

                    </Form.Group>
                    <Form.Group as={Row} md="4" controlId="validationCustom04" className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Новый пароль"
                            value={password}
                            onChange={(el) => setPassword(el.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Row} md="4" controlId="validationCustom05" className="mb-3">
                        {/* <Form.Label>Подтвердите пароль</Form.Label> */}
                        <Form.Control
                            type="password"
                            placeholder="Повторите пароль"
                            value={confirmPassword}
                            onChange={(el) => {
                                setConfirmPassword(el.target.value)
                                setPasswordMatch(true)
                            }}
                            isInvalid={!passwordMatch}
                        />
                        <Form.Control.Feedback type="invalid">Пароли не совпадают!</Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-flex flex-column align-items-center text-center mt-3">
                        <Button type="submit" className="profileBtn">Сохранить</Button>
                        <Form.Control.Feedback type="valid" hidden={!sendInfo}>Изменения сохранены!</Form.Control.Feedback>
                    </div>
                </Col>
            </Form>
        </div>
    )
    }

export default ProfilePage

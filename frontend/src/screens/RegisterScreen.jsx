import React,{ useState,useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials} from '../slices/authSlice'

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validated, setValidated] = useState(false);
    const [passMatch, setPassMatch] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo} = useSelector((state) => state.auth)
    const [register , {isLoading}] = useRegisterMutation();

    useEffect(() => {
      if(userInfo) {
        navigate('/')
      }
    }, [navigate,userInfo])

    const submitHandler = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
        setValidated(true);
        e.preventDefault();
        if(name == null && email == null && password == null){
            return true;
        }
        if(password !== confirmPassword){
            toast.error('Passwords do not match.')
            setPassMatch(true)
        }else{
            try {
                setPassMatch(true)
                const res = await register({name, email,password}).unwrap();
                dispatch(setCredentials({ ...res}))
                navigate('/')
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }
    return (
    <FormContainer>
            <Form noValidate validated={validated} onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='name'>
                    <Form.Label> Name </Form.Label>
                        <Form.Control
                            type='text'
                            required
                            placeholder='Enter Name'
                            value={name}
                            onChange={ (e) => setName(e.target.value)}                    
                        >
                        </Form.Control>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label> Email Address </Form.Label>
                        <Form.Control
                            type='email'
                            required
                            placeholder='Enter Email'
                            value={email}
                            onChange={ (e) => setEmail(e.target.value)}                    
                        >
                        </Form.Control>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>  
                </Form.Group>
                <Form.Group className='my-2' controlId='password'>
                    <Form.Label> Password </Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            required={passMatch}
                            onChange={ (e) => setPassword(e.target.value)}                    
                        >
                        </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label> Confirm Password </Form.Label>
                        <Form.Control
                            type='password'
                            required={passMatch}
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={ (e) => setConfirmPassword(e.target.value)}                    
                        >
                        </Form.Control>
                </Form.Group>
                {isLoading ? (
                <>
                <Loader/>
                <Button type='submit' variant='primary' disabled className='mt-3'>Loading...</Button>
                </>) : (
                <>
                <Button type='submit' variant='primary' className='mt-3'>Sign Up</Button>
                </>
                )}
                <Row className='py-3'>
                    <Col>
                        Already have an account ? <Link to='/login'> Login </Link>
                    </Col>
                </Row>
            </Form>
    </FormContainer>
    )
}

export default RegisterScreen


import React, {useContext, useState} from 'react'
import {UserContext} from '../../App';
import {useLocation, useNavigate} from 'react-router';
import {createuseremailAndPassword, handlesignout, handlesingin, initializeloginframework, signinWithemailandpassword} from './LoginManager';

function Login() {
    const [newuser, setnewuser] = useState(false)
    const [user, setUser] = useState(
        {isSignedIn: false, name: '', email: '', password: '', photo: ''}
    )
    const history = useNavigate()
    const location = useLocation()
    let {from} = location.state || {
        from: {
            pathname: "/"
        }
    };
    const googleSignIn = () => {
        handlesingin().then(res => {
            setLoggedInUser(res)
            setUser(res)
            history(from)
        })
    }
    const signout = () => {
        handlesignout().then(res => {
            setUser(res)
            setLoggedInUser(res)
        })
    }

    initializeloginframework()

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const handlechange = (e) => {
        let isFromvalid = true
        if (e.target.name === 'email') {
            isFromvalid = /\S+@\S+\.\S+/.test(e.target.value)

        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6
            const paswordNumber = /\d{1}/.test(e.target.value)
            isFromvalid = isPasswordValid && paswordNumber

        }
        if (isFromvalid) {
            const newUserInfo = {
                ...user
            }
            newUserInfo[e.target.name] = e.target.value
            setUser(newUserInfo)
        }

    }
    const handlesubmit = (e) => {
        if (newuser && user.email && user.password) {
            createuseremailAndPassword(user.name, user.email, user.password).then(res => {
                setUser(res)
                setLoggedInUser(res)
                history(from)
            })

        }
        if (!newuser && user.email && user.password) {

            signinWithemailandpassword(user.email, user.password).then(res => {
                setUser(res)
                setLoggedInUser(res)
                history(from)
            })

        }
        e.preventDefault();

    }
    return (
        <div
            className="App"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "90vh"
            }}>

            <div
                style={{
                    height: "500px",
                    width: "400px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid  black"
                }}>

                <form className='form w-100' onSubmit={handlesubmit}>

                    {
                        newuser && <input
                                className='form-control w-75 m-auto'
                                onBlur={handlechange}
                                type="text"
                                name="name"
                                placeholder="enter your name"/>
                    }
                    <br/>
                    <input
                        className='form-control w-75 m-auto'
                        onBlur={handlechange}
                        type="email"
                        name="email"
                        placeholder="enter your email"/>
                    <br/>
                    <input
                        className='form-control w-75 m-auto'
                        onBlur={handlechange}
                        type="password"
                        name="password"
                        placeholder="enter your password"/>
                    <br/>
                    <input className='btn btn-primary' type="submit" value="Sign In"/>
                </form>
                <p className='mt-3'>Create a account?<span
                    style={{
                color: "green",
                cursor: "pointer",
                marginLeft: "10px",
                fontWeight: "bold",
                fontSize: "14px"
            }}
                    onClick={() => setnewuser(!newuser)}>Sign up</span>
                </p>
                {
                    user.isSignedIn
                        ? (<button onClick={signout}>Log out</button>)
                        : (

                            <button className='btn btn-secondary mt-5' onClick={googleSignIn}>sing in with google
                            </button>
                        )
                }

                {
                  loggedInUser.isLoggedIn && <p>Loggin successfully</p>
                }

            </div>

        </div>
    );
}

export default Login;

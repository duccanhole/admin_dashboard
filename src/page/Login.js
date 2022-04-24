import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { authURL } from "../api/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const style = {
        'maxWidth': "500px",
        'boxShadow': 'rgba(74, 64, 142, 0.8) 0px 3px 8px',
    };
    // account default
    /**
     * {
     *   username: duc@mail.com,
     *   password: 123456
     * }
     */
    const handleSubmit = async function (e) {
        e.preventDefault();
        setLoading(true);
        const body = {
            email: email,
            password: password
        };
        try {
            const res = await axios.post(`${authURL}/login`, body);
            if (res.data.success) {
                console.log(res.data);
                sessionStorage.setItem('token', res.data.token);
                axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
                toast.success('Login success');
                navigate('/');
                window.location.reload();
            }
        }
        catch (e) {
            console.log(e);
            if (e.status === 400) {
                toast.error('Incorrect email or password');
            }
            else toast.error('Failed to login, please try again.');
        }
        setLoading(false);
    }
    return (
        <div className="background pt-5" style={{ height: '100vh' }}>
            <Form className="p-3 rounded mx-auto bg-box text-light" style={style} onSubmit={handleSubmit}>
                <h3 className="text-center">Please login to continue</h3>
                <Form.Label>User name</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="text-center">
                    <Button className="mt-2 mx-auto" type="submit" disabled={loading}>
                        {loading ? <Spinner animation="border"></Spinner> : <>LOGIN</>}
                    </Button>
                </div>
            </Form>
            
        </div>
    );
} 
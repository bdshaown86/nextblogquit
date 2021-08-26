import { useState } from "react";
import Link from 'next/link';
import { auth } from "../firebase";
import { useRouter } from 'next/router'

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async(e) => {
     e.preventDefault();
     try {
        const result = await auth.signInWithEmailAndPassword(email,password);
       
         M.toast({html: `Welcome ${result.user.displayName}`,classes: "green"});
         router.push('/');
     } catch (err) {
        M.toast({html: err.message,classes: "red"});  
     }
    }
    return (
        <div className="container center">
            <h3>Please Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input type="email" placeholder="email.." value={email}
                     onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="password" placeholder="password.." value={password}
                     onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn  #ff8f00 amber darken-3">Login</button>
                <Link href="/signup"><a><h5>Dont have an account?</h5></a></Link>
            </form>
            
        </div>
    )
}

export default Login

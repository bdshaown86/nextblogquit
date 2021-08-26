import { useState } from "react";
import Link from 'next/link';
import { auth } from "../firebase";

const Signup = () => {
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const handleSubmit =async (e) => {
     e.preventDefault();
     try {
        const result = await auth.createUserWithEmailAndPassword(email,password);
        await result.user.updateProfile({
         displayName: name
       })
         M.toast({html: `Welcome ${result.user.displayName}`,classes: "green"});   
     } catch (err) {
        M.toast({html: err.message,classes: "red"});  
     }
    
    }
    return (
        <div className="container center">
            <h3>Please Signup</h3>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input type="text" placeholder="name.." value={name}
                     onChange={(e) => setName(e.target.value)}
                    />
                    <input type="email" placeholder="email.." value={email}
                     onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="password" placeholder="password.." value={password}
                     onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn  #ff8f00 amber darken-3">Signup</button>
                <Link href="/login"><a><h5>Already have an account?</h5></a></Link>
            </form>
            
        </div>
    )
}

export default Signup

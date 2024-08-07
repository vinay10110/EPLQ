import  { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Password } from 'primereact/password';
import {Button} from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import {Navigate,Link} from 'react-router-dom';
import 'primeflex/primeflex.css'; 

const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email,setEmail]=useState('');
    const [type,setType]=useState('');
    const [redirect,setRedirect]=useState(false);
    const types = ['User','Admin'];
const handleSubmit=async()=>{
    const response=await fetch(`${import.meta.env.VITE_API_URL}/users/register`,{
        method:'POST',
        body:JSON.stringify({name,email,password,type}),
        headers:{
            'content-type':'application/json',
        }
    })
    if(response.ok){
       setRedirect(true);
    }
}
if(redirect){
    return <Navigate to='/login' />
}
    return (
        <div className="flex justify-content-center align-items-center min-h-screen" style={{backgroundImage: 'linear-gradient(to top, #dfe9f3 0%, white 100%)'}}>
            <Card className="p-fluid" style={{ 
                
                width: '30rem',
                backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                backdropFilter: 'blur(10px)', 
                borderRadius: '10px',
                padding: '20px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
                maxWidth: '400px', 
                margin: 'auto', 
                position: 'absolute', 
                top: '50%', 
                left: '50%',
                transform: 'translate(-50%, -50%)' 
            }} 
              title={
                <div className='flex justify-content-center'>
                          <h3>Register</h3>
                </div>
              }
            >
                <div className="field" style={{marginBottom:'25px'}}>
                    <FloatLabel>
                        <InputText id="username" value={name} onChange={(e) => setName(e.target.value)} required style={{borderRadius:'10px'}}/>
                        <label htmlFor="username">Username</label>
                    </FloatLabel>
                </div>
                <div className="field" style={{marginBottom:'25px'}}>
                    <FloatLabel>
                        <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)}  type='email' required style={{borderRadius:'10px'}}/>
                        <label htmlFor="email">Email</label>
                    </FloatLabel>
                </div>
                <div className="field" style={{marginBottom:'25px'}}>
                    <FloatLabel>
                        <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} required toggleMask style={{borderRadius:'10px'}}/>
                        <label htmlFor="password">Password</label>
                    </FloatLabel>
                </div>
               
                <div className='field flex justify-content-center'>
                <Dropdown value={type} onChange={(e) => setType(e.value)} options={types} optionLabel="name" 
                placeholder="Select type" className="w-full md:w-14rem" required style={{borderRadius:'10px'}}/>
                </div>
                <div className='flex justify-content-center'>
                <Button label='submit' onClick={handleSubmit} style={{borderRadius:'10px',width:'100px',backgroundColor:'inherit',color:'black'}}/>
                </div>
                
                <div className='flex justify-content-center'>
                <p>Already a member?<Link to='/login' style={{textDecorationColor:'none',color:'inherit'}}>Login Here</Link></p>
                </div>
                
            </Card>
        </div>
    );
};

export default Register;

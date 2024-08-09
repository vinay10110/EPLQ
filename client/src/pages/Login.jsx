import  { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown,Toast,Button,ProgressSpinner,Card,FloatLabel,Password } from 'primereact';
import {Navigate,Link} from 'react-router-dom';
import 'primeflex/primeflex.css'; 

const Login = () => {
    const toast=useRef(null)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type,setType]=useState('');
    const [redirect,setRedirect]=useState(false);
    const [loading,setLoading]=useState(false);
    const types = ['User','Admin'];
const handleSubmit=async()=>{
    setLoading(true);
    const response= await fetch(`${import.meta.env.VITE_API_URL}/users/login`,{
        method:'POST',
        body:JSON.stringify({email,password,type}),
        headers:{
            'content-type':'application/json',

        }
    })
    const data=await response.json();
    if(response.ok){
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Login successful', life: 1000 });
        localStorage.setItem('token',data.token);
        setRedirect(true);
    }
    setLoading(false);
}
if(redirect){
    return <Navigate to='/dashboard' />
}
    return (
        <>
        {
            loading?(<><ProgressSpinner /> </>):(<>
             <div className="flex justify-content-center align-items-center min-h-screen" style={{backgroundImage: 'linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)'}}>
           <Toast ref={toast} />
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
                          <h3>Login</h3>
                </div>
              } >
                <div className="field" style={{marginBottom:'25px'}}>
                    <FloatLabel>
                        <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} type='email' style={{borderRadius:'10px'}}/>
                        <label htmlFor="email">Email</label>
                    </FloatLabel>
                </div>
                <div className="field" style={{marginBottom:'25px'}}>
                    <FloatLabel>
                        <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} toggleMask style={{borderRadius:'10px'}}/>
                        <label htmlFor="password">Password</label>
                    </FloatLabel>
                </div>
                <div className='field flex justify-content-center'>
                <Dropdown value={type} onChange={(e) => setType(e.value)} options={types} optionLabel="name" 
                placeholder="Select type" className="w-full md:w-14rem" style={{borderRadius:'10px'}}/>
                </div>
                <div className='flex justify-content-center'>
                <Button label='submit' onClick={handleSubmit} style={{borderRadius:'10px',width:'100px',backgroundColor:'inherit',color:'black'}}/>
                </div>
                
                <div className='flex justify-content-center'>
                <p>Not a member? <Link to='/register' style={{textDecorationColor:'none',color:'inherit'}}>Register Here</Link></p>
                </div>
                
            </Card>
         </div>
            </>)
        }
        </>
       
    );
};

export default Login;

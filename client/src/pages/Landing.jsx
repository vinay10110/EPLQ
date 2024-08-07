import {Button,Image} from 'primereact'
import 'primeflex/primeflex.css'
import img from '../assets/annie-spratt-Uk3t05ndSng-unsplash.jpg'
import { useNavigate } from 'react-router-dom'
const Landing = () => {
  const navigate=useNavigate();
  return (
    <div >
      <div className="grid grid-nogutter surface-section text-800">
    <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
        <section>
            <span className="block text-6xl font-bold mb-1">Unlock location insights effortlessly with our powerful query tool.</span>
            <div className="text-6xl text-primary font-bold mb-3">Your data, your way, delivered efficiently.</div>
            <p className="mt-0 mb-4 text-700 line-height-3"></p>

            <Button label="Get started" type="button" className="mr-3 p-button-raised" onClick={()=>navigate('/login')}></Button>
            
        </section>
    </div>
    <div className="col-12 md:col-6 overflow-hidden">
        <Image src={img} alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} width="764px" />
    </div>
</div>
    </div>
  )
}

export default Landing

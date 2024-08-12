import { Link, Head } from '@inertiajs/react';
import React, {useEffect, useState} from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function Booking()
{


    const today = new Date().toISOString().split('T')[0];
    
    const { data, setData, post, reset, errors, props } = useForm({
        name: '',
        phone: '',
        date: '',
        time: '',
        service: '',
    });

    const [availableSlots, setAvailableSlots] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/booking', {
            onSuccess: (response) => {
                reset();
                toast.success('Termini u rezervua me sukses!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            },
           
        });
    };

    useEffect(()=>{
        Aos.init({duration:400});
      }, [])
      
    



    return(
        
        

       
<div className='mt-20  bg-neutral-900 lg:mt-0 '>
<Head title="Rezervo Terminin" />
    
<div class=" flex items-center justify-center h-screen">
    <div class="bg-neutral-200 mb-10 lg:mb-0 p-5 m-2 rounded-lg shadow-lg max-w-lg w-full">
    <ToastContainer className='m-3' />
        <div class="flex justify-center mb-6">
            <span class="inline-block bg-gray-200 rounded-full pt-2">
<svg className='h-10' version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">  </style> <g> <path class="st0" d="M496.934,420.533c-5.006-11.84-13.327-21.861-23.827-28.952c-10.482-7.091-23.254-11.263-36.824-11.254 c-9.039,0-17.738,1.855-25.624,5.175c-1.894,0.808-3.736,1.731-5.538,2.69l-21.319-59.147l18.336-29.396 c0-63.665,22.726-245.915-31.024-299.648c-53.742,53.733-47.294,235.992-47.294,299.63l20.618,33.089l-23.236,55.65 c-9.373-5.122-20.161-8.05-31.531-8.042c-9.044-0.008-17.751,1.847-25.628,5.184c-11.849,4.997-21.861,13.322-28.952,23.822 c-7.105,10.491-11.263,23.262-11.25,36.824c-0.009,9.044,1.841,17.751,5.183,25.642c5.006,11.84,13.322,21.842,23.822,28.944 c10.486,7.1,23.245,11.262,36.829,11.254c9.04,0,17.743-1.829,25.624-5.184c11.835-5.005,21.86-13.339,28.947-23.83 c7.096-10.491,11.268-23.245,11.25-36.825c0.014-9.044-1.832-17.751-5.174-25.624c-1.98-4.686-4.5-9.062-7.451-13.109 l20.103-32.236l20.12,32.254c-0.47,0.631-0.945,1.26-1.398,1.891c-7.088,10.491-11.254,23.262-11.241,36.824 c-0.009,9.044,1.833,17.751,5.174,25.642c5.02,11.84,13.345,21.852,23.836,28.944c10.473,7.1,23.245,11.262,36.821,11.254 c9.035,0,17.746-1.838,25.632-5.184c11.835-5.014,21.852-13.339,28.947-23.83c7.092-10.491,11.264-23.245,11.254-36.825 C502.117,437.113,500.276,428.406,496.934,420.533z M317.922,458.086c-2.316,5.477-6.221,10.198-11.125,13.5 c-4.917,3.31-10.713,5.228-17.121,5.228c-4.287,0-8.272-0.862-11.933-2.397c-5.476-2.308-10.198-6.231-13.508-11.139 c-3.306-4.9-5.21-10.704-5.214-17.121c-0.009-4.287,0.852-8.264,2.392-11.929c2.312-5.468,6.23-10.18,11.125-13.499 c4.922-3.311,10.717-5.22,17.138-5.228c4.282,0.008,8.263,0.861,11.924,2.405c5.477,2.317,10.189,6.222,13.496,11.121 c3.311,4.926,5.218,10.722,5.223,17.13C320.324,450.435,319.471,454.429,317.922,458.086z M464.538,458.086 c-2.308,5.477-6.231,10.198-11.125,13.5c-4.913,3.31-10.717,5.21-17.126,5.228c-4.287,0-8.264-0.862-11.924-2.397 c-5.481-2.317-10.198-6.231-13.509-11.139c-3.301-4.9-5.214-10.713-5.223-17.121c0.009-4.287,0.857-8.264,2.401-11.929 c2.317-5.468,6.226-10.18,11.125-13.499c4.912-3.311,10.718-5.22,17.13-5.228c4.278,0.008,8.263,0.861,11.924,2.405 c5.476,2.317,10.202,6.222,13.504,11.121c3.302,4.918,5.219,10.722,5.232,17.13C466.939,450.435,466.087,454.429,464.538,458.086z"></path> <path class="st0" d="M104.887,217.282l73.694,0.018c8.552,0,15.479-6.94,15.488-15.479c-0.009-8.538-6.941-15.479-15.474-15.479 l-73.708,0.018c-2.916-0.018-5.285-2.379-5.298-5.308l0.014-14.929c0-2.93,2.369-5.29,5.298-5.29l73.68,0.017 c8.552,0,15.479-6.941,15.466-15.479c0.013-8.574-6.914-15.462-15.466-15.462h-73.698c-2.911-0.017-5.285-2.396-5.299-5.308 l0.014-14.911c0-2.946,2.374-5.325,5.285-5.308l73.708-0.017c8.551,0,15.457-6.906,15.457-15.48 c0.013-8.52-6.914-15.46-15.466-15.46h-73.694c-2.916,0.017-5.294-2.361-5.29-5.29V53.226c0-2.929,2.374-5.29,5.294-5.29 l69.051-0.018c11.113,0,20.117-9.018,20.117-20.094c0-11.113-9.013-20.13-20.112-20.13L60.327,4.589 c-13.269-0.32-26.103,4.722-35.592,13.97C15.234,27.842,9.891,40.534,9.891,53.812L9.878,462.745 c0,13.26,5.348,25.97,14.854,35.236c9.492,9.283,22.326,14.307,35.591,14.006l113.624-3.142c11.104,0,20.112-8.982,20.1-20.095 c0-11.112-9-20.13-20.104-20.13h-69.051c-2.92,0-5.299-2.361-5.294-5.289l-0.014-14.912c0-2.928,2.37-5.307,5.303-5.307h73.694 c8.552,0,15.479-6.941,15.488-15.461c-0.009-8.539-6.932-15.479-15.488-15.479h-73.698c-2.929,0-5.299-2.38-5.29-5.29 l-0.009-14.911c0.009-2.929,2.392-5.325,5.303-5.308h73.694c8.552,0,15.479-6.941,15.466-15.461 c0.013-8.538-6.914-15.496-15.466-15.496h-73.698c-2.916,0-5.299-2.361-5.299-5.291l0.014-14.91c0-2.93,2.374-5.29,5.285-5.29 h73.708c8.542,0,15.47-6.923,15.47-15.479c-0.013-8.557-6.927-15.462-15.47-15.48h-73.703c-2.916,0-5.29-2.379-5.29-5.29v-14.929 c0-2.928,2.374-5.289,5.303-5.289h73.676c8.56-0.018,15.474-6.923,15.488-15.479c0-8.539-6.932-15.462-15.483-15.462h-73.689 c-2.907,0-5.286-2.378-5.29-5.308v-14.929C99.588,219.661,101.971,217.282,104.887,217.282z"></path> </g> </g></svg>            </span>
       
        </div>
        <h2 class="text-2xl font-semibold text-center mb-4">Rezervo Terminin</h2>
        <p class="text-gray-600 text-center mb-6">Shënoni informatat e mëposhtme për të rezervuar terminin:</p>
        <form onSubmit={handleSubmit}>
            <div class="mb-4">
                <label for="fullName" class="block text-gray-700 text-sm font-semibold ">Emri dhe Mbiemri *</label>
                {errors.name && <p className="text-red-600 text-sm  mb-1">{errors.name}</p>}
                <input 
                type="text" 
                id="name" 
                name='name' 
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                
                class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="Filan Fisteku"/>
                
            </div>

            <div class="mb-4">
                <label for="phone" class="block text-gray-700 text-sm font-semibold ">Numri i telefonit *</label>
                {errors.phone && <p className="text-red-600 text-sm  mb-1 ">{errors.phone}</p>}
                <input 
                type="phone" 
                name='phone' 
                id="phone"
                value={data.phone}
                onChange={(e) => setData('phone', e.target.value)}
                class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="049123456"/>
            </div>
            
            <div class="mb-4">
                <label for="service" class="block text-gray-700 text-sm font-semibold ">Shërbimi *</label>
                {errors.service && <p className="text-red-600 text-sm  mb-1">{errors.service}</p>}
                <select
                 class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" 
                 id="service"
                  name="service" 
                  value={data.service}
                onChange={(e) => setData('service', e.target.value)}
                  required>
    <option value="" disabled>Zgjedh një shërbim</option>
    <option value="Prerje e Flokëve">Prerje e Flokëve</option>
    <option value="Rruajtje">Rruajtje</option>
    <option value="Ngjyrosje">Ngjyrosje</option>
    <option value="Larja e Flokëve">Larja e Flokëve</option>
    <option value="Mask për Fytyr">Mask për Fytyr</option>   
                                
  </select>
            </div>
            <div class="mb-4">

                <label for="date" class="block text-gray-700 text-sm font-semibold ">Data *</label>
                {errors.date && <p className="text-red-600 text-sm mb-1">{errors.date}</p>}
                <input 
                type="date" 
                min={today}
                name='date' 
                id="date" 
                value={data.date}
                onChange={(e) => setData('date', e.target.value)}
                class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required />
            </div>

            <div class="mb-4">
                <label for="time" class="block text-gray-700 text-sm font-semibold mb-2">Koha *</label>
                {errors.time && <p className="text-red-600 text-sm mb-1">{errors.time}</p>}
                <select
                  value={data.time}
                  onChange={(e) => setData('time', e.target.value)}
                class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" id="time" name="time" required>
                       <option value="" disabled>Zgjedh një termin kohor</option>
    <option value="09:00">09:00</option>
    <option value="10:00">10:00</option>
    <option value="11:00">11:00</option>
    <option value="12:00">12:00</option>
    <option value="13:00">13:00</option>
    <option value="14:00">14:00</option>
    <option value="15:00">15:00</option>
    <option value="16:00">16:00</option>
    <option value="17:00">17:00</option>
  </select>
            </div>
           
            <button type="submit" class="transition duration-200 ease-in-out w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Rezervo</button>
            <p class="text-gray-600 text-md text-center mt-4">
             <span className='text-red-500 font-bold'>Vini re!</span>  Ju lutem respektoni orarin e terminit të rezervuar.

            </p>
        </form>
    </div>
</div>
</div>
            


    )
}
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React, {useState, useEffect} from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Modal from '@/Components/Modal';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



export default function Apps({ auth, appointments, query }) {

  const [deleteModalId, setDeleteModalId] = useState(null);

  const { delete: destroy, processing } = useForm({});

  const handleDelete = (id) => {
    destroy(`/appointments/${id}`, {
        onSuccess: () => {
            closeDeleteModal();
            toast.success('Termini u fshi me sukses!', {
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
        onError: (errors) => {
            toast.error('Ndodhi një gabim gjatë fshirjes së terminit!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    });
};



  const openDeleteModal = (id) => {
    setDeleteModalId(id);
};

const closeDeleteModal = () => {
    setDeleteModalId(null);
};
  

  const { data, setData, get } = useForm({
    query: query || '',
    service: '',
    date: '',
  });


  useEffect(()=>{
    Aos.init({duration:400});
}, [])



  const handleSearch = (e) => {
    e.preventDefault();
    get('/appointments/search', {
      preserveState: true,
    });
  };

 
const handleFilterSubmit = (e) => {
    e.preventDefault();
    get('/appointments/filter', {
        preserveState: true,
    });
};

const handleFilterDateSubmit = (e) => {
  e.preventDefault();
  get('/appointments/filter/date', {
      preserveState: true,
  });
};

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <ToastContainer className='m-3' />

      <div className='lg:mx-32 mx-2'>
        <h1 className='mx-8  mt-8 text-2xl font-bold text-white mb-2'>Kërko Termine</h1>
        <div data-aos="fade-in" class="px-7 mx-auto">

	<form onSubmit={handleSearch} class="flex items-center">   
        <label for="search" class="sr-only">Search</label>
        <div class="relative w-full">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5  text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input 
            type="text"
            id="search"
            name="search"
             value={data.query}
            onChange={(e) => setData('query', e.target.value)}
             class=" border transition duration-200 ease-in-out  text-sm rounded-lg block w-full pl-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Shkruaj emrin dhe mbiemrin ose numrin e telefonit." required/>
           
        </div>
        <button type="submit" class="inline-flex transition duration-200 ease-in-out items-center py-2.5 px-3 ml-2 text-sm font-medium text-white  rounded-lg border border-blue-700  focus:ring-4 focus:outline-none  bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"><svg class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Search</button>
    </form>

    <div className='block lg:flex gap-2 justify-start items-center mt-2 '>

    <form onSubmit={handleFilterSubmit} class="mt-2 smax-w-sm">
   
  <label for="countries" class="flex  mb-2 text-xs font-medium text-gray-900 dark:text-white">Kërko sipas shërbimit:</label>
  <div className='flex'>
  <select id="services" name='service'  value={data.service} onChange={(e) => setData('service', e.target.value)} class=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
  <option  disabled value="">Zgjedh shërbimin</option>
                            <option value="Prerje e Flokëve">Prerje e Flokëve</option>
                            <option value="Rruajtje">Rruajtje</option>
                            <option value="Ngjyrosje">Ngjyrosje</option>
                            <option value="Larja e Flokëve">Larja e Flokëve</option>
                            <option value="Mask për Fytyr">Mask për Fytyr</option>  
  </select>
  <button type="submit" class="inline-flex transition duration-200 ease-in-out items-center py-2.5 px-3 ml-2 text-sm font-medium text-white  rounded-lg   focus:ring-4 focus:outline-none  bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-800"><svg className='h-5' fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>go</title> <path d="M27.728 16.024l-8.485 8.482-2.828-2.835 3.656-3.671h-14.071v-4h14.071l-3.657-3.644 2.828-2.816 8.486 8.484z"></path> </g></svg></button>
  </div>
</form>

<form onSubmit={handleFilterDateSubmit} class="max-w-sm mt-2">
   
  <label for="countries" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Kërko sipas datës:</label>
  <div className='flex'>
  <input value={data.date} onChange={(e) => setData('date', e.target.value)} id="date" type='date' name='date' class=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-none text-white focus:ring-blue-500 focus:border-blue-500"/>

  <button type="submit" class="inline-flex transition duration-200 ease-in-out items-center py-2.5 px-3 ml-2 text-sm font-medium text-white  rounded-lg   focus:ring-4 focus:outline-none  bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-800"><svg className='h-5' fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>go</title> <path d="M27.728 16.024l-8.485 8.482-2.828-2.835 3.656-3.671h-14.071v-4h14.071l-3.657-3.644 2.828-2.816 8.486 8.484z"></path> </g></svg></button>
  </div>
</form>

</div>

	
    <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
</div>
<div class="overflow-y-hidden    rounded-lg    m-5">
{appointments.length > 0 ? (
    
  <table data-aos="fade-in" class="w-full rounded-lg  text-left text-sm text-gray-200">
    <thead class="bg-gray-800">
      <tr>
        
        <th scope="col" class="px-6 py-4  font-medium text-gray-200">Emri</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-200">Data</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-200">Orari</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-200">Numri</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-200">Sherbimi</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-200"></th>
      </tr>
    </thead>
    <tbody class="divide-y divide-neutral-700 bg-neutral-800 border-t border-neutral-700">
    {appointments.map((appointment) => (
      <tr class="transition duration-100 ease-in-out">
        <th class="flex  items-center gap-3 px-6 py-8 font-normal text-gray-900">
          <div class=" h-10 w-10">
            <svg className='h-full w-full  object-cover object-center' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 10H3M21 12.5V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22H12M16 2V6M8 2V6M14.5 19L16.5 21L21 16.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          </div>
          <div class="text-md whitespace-nowrap ">
            <div class="font-bold text-gray-200">{appointment.name}</div>

          </div>
        </th>
        <td class="px-4">
          <span
            class="whitespace-nowrap inline-flex items-center gap-1 rounded-full  px-2 py-1 text-md font-semibold text-blue-400"
          >

{appointment.date}
          </span>
        </td>
        <td class="px-6 py-4 font-bold whitespace-nowrap">{appointment.time}</td>
        <td class="px-4">
          <span
            class="whitespace-nowrap inline-flex items-center rounded-full  px-2 py-1 text-md font-semibold text-gray-200"
          >

{appointment.phone}
          </span>
        </td>        <td class="px-6 py-4">
          <div class="flex gap-2">
            <span
              class="whitespace-nowrap rounded-full  px-2 py-1 text-md font-semibold text-blue-400"
            >
     {appointment.service}
            </span>
         
          </div>
        </td>
        <td class="px-6 py-4">
          <div class="flex justify-end gap-4">
            <div className='flex  transition bg-red-700/70 hover:bg-red-900/70 duration-100 ease-in-out p-1 rounded-xl items-center gap-2'>
            <button onClick={() => openDeleteModal(appointment.id)}  className='flex items-center gap-2 p-1  '  href="#">
              <svg
              className='h-5'
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
                x-tooltip="tooltip"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              <span className='whitespace-nowrap'>Fshije Terminin</span>
            </button >
         
            </div>
         
          </div>
        </td>

         {/* Delete Modal */}
         <Modal key={`delete-${appointment.id}`} show={deleteModalId === appointment.id} onClose={closeDeleteModal} maxWidth="lg" closeable={true}>
                            <div className='p-10'>
                            <h2 className='text-2xl font-bold text-neutral-300'>Fshij Terminin</h2>
                            <p className='text-neutral-400'>A jeni i sigurtë që dëshironi të fshini terminin  e <span className='text-blue-500 font-bold'>{appointment.name}</span> me datën <span className='text-blue-500 font-bold'>{appointment.date}</span>, në orën <span className='text-blue-500 font-bold'>{appointment.time}</span> ?</p>
                            <p className='text-red-400 font-semibold'>Pas fshirjes, termini i fshirë nuk rikthehet.</p>
                            
                            <button onClick={() => handleDelete(appointment.id)}   className='flex items-center gap-2  transition duration-200 ease-in-out px-4 py-2 rounded-lg border-none bg-red-500 hover:bg-red-800 mt-2  text-white'>
                            <svg
              className='h-6'
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
                x-tooltip="tooltip"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
                              Fshije Terminin</button>
                            </div>
                        </Modal>
                        
      </tr>
    ))}

    

      
      
       </tbody>
  </table>
):(
  
<div data-aos="fade-in" class="w-full  flex flex-col items-center justify-center mt-10">
<svg class="w-1/16 hidden lg:block h-64 opacity-40 md:1/3 lg:w-1/4 " viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7.493 0.015 C 7.442 0.021,7.268 0.039,7.107 0.055 C 5.234 0.242,3.347 1.208,2.071 2.634 C 0.660 4.211,-0.057 6.168,0.009 8.253 C 0.124 11.854,2.599 14.903,6.110 15.771 C 8.169 16.280,10.433 15.917,12.227 14.791 C 14.017 13.666,15.270 11.933,15.771 9.887 C 15.943 9.186,15.983 8.829,15.983 8.000 C 15.983 7.171,15.943 6.814,15.771 6.113 C 14.979 2.878,12.315 0.498,9.000 0.064 C 8.716 0.027,7.683 -0.006,7.493 0.015 M8.853 1.563 C 9.548 1.653,10.198 1.848,10.840 2.160 C 11.538 2.500,12.020 2.846,12.587 3.413 C 13.154 3.980,13.500 4.462,13.840 5.160 C 14.285 6.075,14.486 6.958,14.486 8.000 C 14.486 9.054,14.284 9.932,13.826 10.867 C 13.654 11.218,13.307 11.781,13.145 11.972 L 13.090 12.037 8.527 7.473 L 3.963 2.910 4.028 2.855 C 4.219 2.693,4.782 2.346,5.133 2.174 C 6.305 1.600,7.555 1.395,8.853 1.563 M7.480 8.534 L 12.040 13.095 11.973 13.148 C 11.734 13.338,11.207 13.662,10.867 13.828 C 10.239 14.135,9.591 14.336,8.880 14.444 C 8.456 14.509,7.544 14.509,7.120 14.444 C 5.172 14.148,3.528 13.085,2.493 11.451 C 2.279 11.114,1.999 10.526,1.859 10.119 C 1.468 8.989,1.403 7.738,1.670 6.535 C 1.849 5.734,2.268 4.820,2.766 4.147 C 2.836 4.052,2.899 3.974,2.907 3.974 C 2.914 3.974,4.972 6.026,7.480 8.534 " stroke="none" fill-rule="evenodd" fill="#ff0000"></path></g></svg>    <div class="flex flex-col items-center justify-center">
      <div className='flex flex-col  '>
        <p class="text-3xl md:text-4xl lg:text-5xl text-gray-300 mt-12">Nuk ka rezultate!</p>
        <p class="md:text-lg lg:text-xl text-gray-600 mt-2">Termini/Terminet që ju kërkuat nuk ekzistojnë.</p>
        </div>
        <a href={route('appointments')} class="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-12 rounded transition duration-150" title="Return Home">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
            </svg>
            <span>Kthehu Prapa</span>
        </a>
    </div>
</div>
)}
</div>
</div>

          
        </AuthenticatedLayout>
    );
}

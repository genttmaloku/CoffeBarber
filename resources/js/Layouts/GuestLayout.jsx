import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen overflow-x-hidden flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-neutral-900">
            <div>
                <Link href="/">
                   <img className='h-10' src="/images/logo-min.png" alt="" />
                </Link>
            </div>

            <div className=" bg-neutral-200 m-10 p-5 lg:p-16  rounded-xl">
                {children}
            </div>
        </div>
    );
}

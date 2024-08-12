<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Appointment;
use Carbon\Carbon;


class AdminController extends Controller
{
    
    public function dashboard()
    {
        $today = Carbon::now()->toDateString();
    
       
        $appointments = Appointment::whereDate('date', $today)->get();
    
    
        return Inertia::render('Dashboard', [
            'appointments' => $appointments,
        ]);


    }

    public function appointments()
    {
        $appointments = Appointment::all();

        return Inertia::render('Apps', [
            'appointments' => $appointments,
            'query' => '',
        ]);
    }


   
    public function search(Request $request)
    {
        $query = $request->input('query');
        

        $appointments = Appointment::where('name', 'like', "%{$query}%")
            ->orWhere('phone', 'like', "%{$query}%")
            ->get();

       
        return Inertia::render('Apps', [
            'appointments' => $appointments,
            'query' => $query,
        ]);
    }

    public function filter(Request $request)
    {

        $service = $request->input('service');
    
        $appointments = Appointment::where('service', 'like', "%{$service}%")
        ->get();

        return Inertia::render('Apps', [
            'appointments' => $appointments,
            'service' => $service,
        ]);

    }


    public function filterDate(Request $request)
    {

        $date = $request->input('date');
    
        $appointments = Appointment::where('date', $date)
        ->get();

        return Inertia::render('Apps', [
            'appointments' => $appointments,
            'date' => $date,
        ]);
        
    }
    

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();
        $appointments = Appointment::all();


        return Inertia::render('Apps', [
            'appointments' => $appointments,
            'query' => '',
        ]);
    }

    public function deleteDash(Appointment $appointment)
    {
        $appointment->delete();
        $today = Carbon::now()->toDateString();
    
       
        $appointments = Appointment::whereDate('date', $today)->get();
    
    
        return Inertia::render('Dashboard', [
            'appointments' => $appointments,
            'query' => '',
        ]);


     
    }


}

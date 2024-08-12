<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Models\Appointment;
use Illuminate\Support\Facades\Mail;
use App\Mail\AppointmentCreated;

class BookingController extends Controller
{
    public function index()
    {
        return Inertia::render('Booking');
        
    }

    public function store(Request $request)
    {
        $customMessages = [
            'name.required' => 'Ju lutem shënoni emrin dhe mbiemrin.',
            'name.regex' => 'Emri dhe mbiemri duhet të përmbajnë vetëm shkronja.',
            'phone.required' => 'Ju lutem shënoni numrin e telefonit.',
            'phone.regex' => 'Numri i telefonit duhet të përmbajë vetëm numra.',
            'date.required' => 'Ju lutem zgjidhni një datë.',
            'date.not_sunday' => 'Dyqani është i mbyllur të dieleve.',
            'time.required' => 'Ju lutem zgjidhni një kohë.',
            'service.required' => 'Ju lutem zgjidhni një shërbim.',
            'service.in' => 'Shërbimi i zgjedhur nuk është valid.',
        ];
    
        Validator::extend('not_sunday', function ($attribute, $value, $parameters, $validator) {
            return \Carbon\Carbon::parse($value)->dayOfWeek !== \Carbon\Carbon::SUNDAY;
        });
    
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'regex:/^[a-zA-Z\s]+$/'],
            'phone' => ['required', 'regex:/^\+?[0-9\s-]{7,15}$/'],
            'date' => ['required', 'date', 'not_sunday'],
            'time' => ['required', 'date_format:H:i'],
            'service' => ['required', 'in:Prerje e Flokëve,Rruajtje,Ngjyrosje,Larja e Flokëve,Mask për Fytyr'],
        ], $customMessages);
    
        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }
    
        $existingAppointment = Appointment::where('date', $request->date)
            ->where('time', $request->time)
            ->exists();
    
        if ($existingAppointment) {
            $availableSlots = $this->getAvailableSlots($request->date);
    
            $errorMessage = 'Termini i përzgjedhur është i rezervuar! Terminet e lira për këtë datë janë: ' . implode(', ', $availableSlots);
    
            return back()->withErrors(['time' => $errorMessage])->withInput();
        }
    
        Appointment::create($request->all());
        
    
        return redirect()->back()->with('success', 'Termini u rezervua me sukses!');
    }

    private function getAvailableSlots($date)
    {
     
        $allSlots = [
            '09:00', '10:00', '11:00', '12:00', '13:00',
            '14:00', '15:00', '16:00', '17:00',
        ];


        $bookedSlots = Appointment::where('date', $date)
            ->pluck('time')
            ->toArray();

 
        return array_diff($allSlots, $bookedSlots);
    }

}

<?php

namespace App\Http\Controllers;

use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use App\Models\Position;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        return view('employees.index');
    }

    public function getPositions(): JsonResponse
    {
        $positions = Position::all();

        return response()->json($positions);
    }

    public function list()
    {
        $employees = Employee::orderBy('created_at', 'desc')->paginate(4);

        return EmployeeResource::collection($employees);
    }

    public function save(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'first_name' => 'required',
            'email' => 'required|email',
            'position_id' => 'required',
            'salary' => 'required|numeric'
        ]);

        $response = ['status' => false, 'message' => 'error'];
        $status = 400;
        try {
            Employee::create([
                'name' => $request->name,
                'first_name' => $request->first_name,
                'second_name' => $request->second_name,
                'email' => $request->email,
                'birthday' => $request->birthday,
                'phone' => $request->phone,
                'picture' => $request->picture,
                'position_id' => $request->position_id,
                'salary' => $request->salary,
            ]);

            $response =['status' => true, 'message' => 'success saving'];
            $status = 200;
        } catch (\Exception $e) {
            error_log("Error saving:" . $e->getMessage());
        }

        return response()->json($response, $status);
    }

    public function editEmployee($id) {
        $employee = Employee::find($id);

        return response()->json($employee);

    }

}

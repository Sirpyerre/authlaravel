<?php

namespace App\Http\Controllers;

use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use App\Models\Position;
use Illuminate\Http\JsonResponse;

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

}

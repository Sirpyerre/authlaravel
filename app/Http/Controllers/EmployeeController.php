<?php

namespace App\Http\Controllers;

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

}

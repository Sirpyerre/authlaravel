<?php

namespace App\Http\Controllers;

use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use App\Models\Position;
use Error;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

            $response = ['status' => true, 'message' => 'success saving'];
            $status = 200;
        } catch (\Exception $e) {
            error_log("Error saving:" . $e->getMessage());
        }

        return response()->json($response, $status);
    }

    public function editEmployee($id)
    {
        $employee = Employee::find($id);

//        return response()->json($employee);

        return new EmployeeResource($employee);
    }

    public function update($id, Request $request)
    {
        $response = ['status' => false, 'message' => 'error'];
        $status = 400;

        $employee = Employee::find($id);
        if (is_null($employee)) {
            $response['message'] = 'Employee invalid';
            return response()->json($response, $status);
        }

        $request->validate([
            'name' => 'required',
            'first_name' => 'required',
            'email' => 'required|email',
            'position_id' => 'required',
            'salary' => 'required|numeric'
        ]);

        try {
            $employee->name = $request->name;
            $employee->first_name = $request->first_name;
            $employee->second_name = $request->second_name;
            $employee->email = $request->email;
            $employee->birthday = $request->birthday;
            $employee->phone = $request->phone;
            $employee->position_id = $request->position_id;
            $employee->salary = $request->salary;

            $employee->save();

            $response = ['status' => true, 'message' => 'success updating!'];
            $status = 200;
        } catch (\Exception $e) {
            error_log("Error saving:" . $e->getMessage());
        }

        return response()->json($response, $status);
    }

    public function trash($id)
    {
        $response = ['status' => false, 'message' => 'error'];
        $status = 400;

        $employee = Employee::find($id);
        if (is_null($employee)) {
            $response['message'] = 'Employee invalid';
            return response()->json($response, $status);
        }

        try {
            $employee->delete();
            $response = ['status' => true, 'message' => 'success updating!'];
            $status = 202;
        } catch (\Exception $e) {
            error_log("Error deleting:" . $e->getMessage());
        }

        return response()->json($response, $status);
    }

    public function uploadFile(Request $request, $id)
    {
        $response = ['status' => false, 'message' => 'error'];
        $status = 400;

        if ($request->hasFile('fileEmployee')) {
            $pathSave = date('Y/m/d');

            try {
                $path = Storage::putFile($pathSave, $request->file('fileEmployee'));

                if (is_null($id)) {
                    $response['status'] = true;
                    $response['message'] = $path;
                    return response()->json($response);
                } else {
                    $employee = Employee::find((int) $id);
                    if (is_null($employee)) {
                        $response['message'] = 'Employee invalid';
                        return response()->json($response, $status);
                    }

                    $employee->picture = $path;

                    try {
                        $employee->save();
                        $response['status'] = true;
                        $response['message'] = $path;
                        $status = 200;

                    } catch (\Exception $e) {
                        error_log("Error updating employee with file path:" . $e->getMessage());
                    }
                }
            } catch (\Exception $e) {
                error_log("Can't save file:" . $e->getMessage());
                $response['message'] = "Can't save file:" . $e->getMessage();
            }

        }

        return response()->json($response, $status);
    }

    public function removeFile(Request $request)
    {

        $response = ['status' => false, 'message' => 'error'];
        $status = 400;

        $params = $request->all();
        if (isset($params['uid'])) {
            $employee = Employee::find((int) $params['uid']);
            if (is_null($employee)) {
                $response['message'] = 'Employee invalid';
                return response()->json($response, $status);
            }

            try {
                Storage::delete($employee->picture);

                $employee->picture = '';
                $employee->save();

                $response['status'] = true;
                $response['message'] = 'remove!';
                $status = 200;
                return response()->json($response);
            } catch (\Exception $e) {
                error_log("Can't remove file:" . $e->getMessage());
                $response['message'] = "Can't remove file:" . $e->getMessage();
            }
        }


        return response()->json($response, $status);
    }
}

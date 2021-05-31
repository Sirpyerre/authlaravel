<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/employee', [App\Http\Controllers\EmployeeController::class, 'index'])->name('employee');
Route::get('/employee/index', 'App\Http\Controllers\EmployeeController@index');
Route::get('/employee/list', 'App\Http\Controllers\EmployeeController@index');
Route::get('/employee/form', 'App\Http\Controllers\EmployeeController@index');
Route::get('/employee/edit/{id}', 'App\Http\Controllers\EmployeeController@index');

Route::get('/positions', 'App\Http\Controllers\EmployeeController@getPositions');
Route::get('/employee/get', 'App\Http\Controllers\EmployeeController@list');
Route::post('/employee/save', 'App\Http\Controllers\EmployeeController@save');
Route::get('/employee/editEmployee/{id}', 'App\Http\Controllers\EmployeeController@editEmployee');
Route::post('/employee/update/{id}', 'App\Http\Controllers\EmployeeController@update');

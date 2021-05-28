<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $positionsDefault = [
            ['title' => 'CEO'],
            ['title' => 'Developer'],
            ['title' => 'Tester'],
            ['title' => 'Coordinator'],
            ['title' => 'Administrator'],
        ];


    }
}

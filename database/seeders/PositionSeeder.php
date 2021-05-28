<?php

namespace Database\Seeders;

use App\Models\Position;
use Faker\Factory;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
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

        foreach ($positionsDefault as $position){
            Position::create($position);
        }
    }
}

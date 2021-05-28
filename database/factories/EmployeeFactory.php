<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Employee::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'first_name' => $this->faker->firstName,
            'second_name' => $this->faker->lastName,
            'email' => $this->faker->email,
            'birthday' => $this->faker->dateTimeBetween('-50 years', '-20 years')->format('Y-m-d'),
            'phone' => $this->faker->phoneNumber,
            'position_id' => function () {
                return \App\Models\Position::All()->random();
            },
            'salary' => $this->faker->numberBetween(15000, 50000),
        ];
    }
}

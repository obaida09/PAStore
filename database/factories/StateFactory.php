<?php

namespace Database\Factories;

use App\Models\City;
use App\Models\State;
use Illuminate\Database\Eloquent\Factories\Factory;

class StateFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = State::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
          'state_name_ar' => $this->faker->name(),
          'state_name_en' => $this->faker->name(),
          'city_id' => City::all()->random()->id,
          'created_at' => now(),
          'updated_at' => now(),
        ];
    }
}

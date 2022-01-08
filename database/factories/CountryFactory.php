<?php

namespace Database\Factories;

use App\Models\Country;
use Illuminate\Database\Eloquent\Factories\Factory;

class CountryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Country::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
          'country_name_ar' => $this->faker->name(),
          'country_name_en' => $this->faker->name(),
          'mob'  => $this->faker->name(),
          'code' => $this->faker->name(),
          'created_at' => now(),
          'updated_at' => now(),
        ];
    }
}

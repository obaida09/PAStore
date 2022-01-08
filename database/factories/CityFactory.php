<?php

namespace Database\Factories;

use App\Models\City;
use App\Models\Country;
use Illuminate\Database\Eloquent\Factories\Factory;

class CityFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = City::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
      return [
        'city_name_ar' => $this->faker->name(),
        'city_name_en' => $this->faker->name(),
        'country_id' => Country::all()->random()->id,
        'created_at' => now(),
        'updated_at' => now(),
    ];
    }
}

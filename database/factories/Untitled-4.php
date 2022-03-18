<?php

namespace Database\Factories;

use App\Models\TradeMark;
use Illuminate\Database\Eloquent\Factories\Factory;
use PHPUnit\Framework\Constraint\StringStartsWith;

class TradeMarkFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TradeMark::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
          'trade_name_ar' => $this->faker->name(),
          'trade_name_en' => $this->faker->name(),
          'created_at' => now(),
          'updated_at' => now(),
        ];
    }
}

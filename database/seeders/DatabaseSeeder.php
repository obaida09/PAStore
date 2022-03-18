<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Admin::factory()->times(1)->create();
        \App\Models\User::factory(100)->create();
        \App\Models\TradeMark::factory(100)->create();
        \App\Models\Country::factory(100)->create();
        \App\Models\City::factory(100)->create();
        \App\Models\State::factory(100)->create();
        \App\Models\Color::factory()->times(100)->create();
        \App\Models\ManuFacturers::factory()->times(100)->create();
    }
}

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
        \App\Models\User::factory(100)->create();
        \App\Models\TradeMark::factory(100)->create();
        \App\Models\Country::factory(100)->create();
        \App\Models\City::factory(100)->create();
        \App\Models\State::factory(100)->create();
    }
}

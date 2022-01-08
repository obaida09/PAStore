<?php

namespace Database\Seeders;

use App\Models\ManuFacturers;
use Illuminate\Database\Seeder;

class ManuFacturesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      ManuFacturers::factory()->times(100)->create();
    }
}

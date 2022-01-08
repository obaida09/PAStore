<?php

namespace Database\Seeders;

use App\Models\TradeMark;
use Illuminate\Database\Seeder;

class TradeMarkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      TradeMark::factory()->times(100)->create();
    }
}

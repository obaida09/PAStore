<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRatingProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rating_productss', function (Blueprint $table) {
          $table->id();
          $table->integer('user_id');

          $table->integer('product_id')->unsigned();
          $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');

          $table->integer('rating');
          $table->text('comment');
          $table->integer('status');
          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rating_products');
    }
}

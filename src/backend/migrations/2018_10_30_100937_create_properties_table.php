<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePropertiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('type_id');
            $table->string('type_desc');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('size')->nullable();
            $table->string('thumb_url')->nullable();
            $table->unsignedInteger('thumb_height')->nullable();
            $table->unsignedInteger('thumb_width')->nullable();
            $table->string('documents')->nullable();
            $table->text('images')->nullable();
            $table->string('country');
            $table->string('city');
            $table->string('suburb');
            $table->decimal('latitude')->nullable();
            $table->decimal('longitude')->nullable();
            $table->unsignedBigInteger('price')->default(0);
            $table->string('price_formatted')->nullable();
            $table->unsignedBigInteger('commission')->default(0);
            $table->boolean('taken')->default(false);
            $table->unsignedInteger('taken_user_id')->nullable();
            $table->unsignedInteger('bedroom_number')->nullable();
            $table->unsignedInteger('bathroom_number')->nullable();
            $table->unsignedInteger('car_spaces')->nullable();
            $table->unsignedInteger('construction_year')->nullable();
            $table->timestamp('taken_date')->nullable();
            $table->unsignedInteger('user_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('properties');
    }
}

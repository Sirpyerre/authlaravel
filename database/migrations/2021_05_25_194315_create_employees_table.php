<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('first_name', 50);
            $table->string('second_name', 50)->nullable();
            $table->string('email', 100);
            $table->date('birthday')->nullable();
            $table->string('phone')->nullable();
            $table->unsignedBigInteger('position_id');
            $table->integer('salary')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('position_id')->references('id')->on('positions');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
}

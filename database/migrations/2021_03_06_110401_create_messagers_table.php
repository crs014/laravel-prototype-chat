<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messagers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sender');
            $table->foreign('sender')
                ->references('id')->on('users');
            $table->unsignedBigInteger('receiver');
            $table->foreign('receiver')
                ->references('id')->on('users');
            $table->string('content', 120);
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
        Schema::dropIfExists('messagers');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void {
        Schema::create('tasks', static function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->bigIncrements('user_id');
            $table->string('name');
            $table->boolean('status');
            $table->unsignedBigInteger('label');

            $table->foreign('label')
                ->references('id')
                ->on('task_label');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void {
        Schema::dropIfExists('tasks');
    }
};

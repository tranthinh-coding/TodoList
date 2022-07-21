<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use App\Enums\TaskStatusEnum;

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
            $table->string('name')->nullable();
            $table->enum('status', TaskStatusEnum::asArray())->default(TaskStatusEnum::PENDING);
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('label_id')->nullable();
            $table->timestamp('expiration_date')->nullable();
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'));
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

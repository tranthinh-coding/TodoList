<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enums\TaskStatusEnum;
use Illuminate\Support\Facades\DB;

class TaskFactory extends Factory {
    public function definition (): array {
        $user_id  = DB::table('users')->pluck('id')->random();
        $label_id = DB::table('task_labels')->pluck('id')->random();

        return [
            'name'     => $this->faker->jobTitle(),
            'status'   => TaskStatusEnum::getRandomValue(),
            'user_id'  => $user_id,
            'label_id' => $label_id,
        ];
    }
}

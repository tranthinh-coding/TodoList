<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\TaskLabel;
use App\Enums\TaskStatusEnum;
use App\Models\User;

class TaskFactory extends Factory
{
    public function definition(): array {
        return [
            'name' => $this->faker->jobTitle(),
            'status' => TaskStatusEnum::getRandomValue(),
            'user_id' => User::query()->inRandomOrder('id')->first(),
            'label_id' => TaskLabel::query()->inRandomOrder('id')->first(),
        ];
    }
}

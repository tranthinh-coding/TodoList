<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enums\TaskStatusEnum;
use Illuminate\Support\Facades\DB;

class TaskFactory extends Factory {
    /**
     * @throws \Exception
     */
    public function definition (): array {
        $user_id = DB::table('users')->pluck('id')->random(1);

        $names  = [
            'Gia đình',
            'Công việc',
            'Khách hàng',
            'Trả lời sau',
            'Đồng nghiệp',
        ];
        $colors = [
            '#fbbf24',
            '#f87171',
            '#84cc16',
            '#22c55e',
            '#2dd4bf',
            '#38bdf8',
            '#a78bfa',
            '#e879f9',
            '#f472b6',
            '#f43f5e',
        ];

        return [
            'name'        => $this->faker->jobTitle(),
            'status'      => TaskStatusEnum::getRandomValue(),
            'user_id'     => $user_id,
            'label_name'  => $this->faker->randomElement($names),
            'label_color' => $this->faker->randomElement($colors),
        ];
    }
}

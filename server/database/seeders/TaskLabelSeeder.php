<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Faker\Factory;
use Illuminate\Support\Facades\DB;

class TaskLabelSeeder extends Seeder
{
    public function run()
    {
        $faker = Factory::create();
        $limit = 1000;

        $names = [
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

        $userIds = DB::table('users')->get('id')->toArray();

        for ($i = 0; $i < $limit; ++$i) {
            $label = [
                'user_id' => $faker->randomElement($userIds)->id,
                'name' => $faker->randomElement($names),
                'color'=> $faker->randomElement($colors)
            ];
            DB::table('task_labels')->insert($label);
        }
    }
}

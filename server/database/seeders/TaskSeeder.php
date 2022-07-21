<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Factories\TaskFactory;

class TaskSeeder extends Seeder
{
    public function run()
    {
        TaskFactory::factory()->count(400)->create();
    }
}

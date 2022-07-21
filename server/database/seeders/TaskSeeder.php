<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Factories\TaskFactory;

class TaskSeeder extends Seeder
{
    public function run()
    {
        TaskFactory::count(400)->create();
    }
}

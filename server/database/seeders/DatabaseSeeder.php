<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Database\Seeders\UserSeeder;
use Database\Seeders\TaskSeeder;
use Database\Seeders\TaskLabelSeeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UserSeeder::class,
            TaskSeeder::class,
        ]);
    }
}

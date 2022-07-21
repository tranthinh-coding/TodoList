<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\TaskLabel;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'status',
        'label',
    ];

    public function taskLabel() {
        return $this->belongsTo(TaskLabel::class);
    }
}

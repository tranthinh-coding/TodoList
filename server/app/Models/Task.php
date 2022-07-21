<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\TaskLabel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'status',
        'label_id',
        'user_id',
        'expiration_date',
    ];

    public function taskLabel(): BelongsTo {
        return $this->belongsTo(TaskLabel::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}

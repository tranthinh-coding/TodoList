<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model {
    use HasFactory;

    protected $fillable = [
        'name',
        'status',
        'label_name',
        'label_color',
        'user_id',
        'expiration_date',
    ];

    public function user (): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function taskProcessing ($rawData): array {
        return [
            "id"              => $rawData->id,
            "name"            => $rawData->name,
            "status"          => $rawData->status,
            "label_name"      => $rawData->label_name,
            "label_color"     => $rawData->label_color,
            "expiration_date" => $rawData->expiration_date,
            "created_at"      => $rawData->created_at,
            "updated_at"      => $rawData->updated_at,
        ];
    }

    public function allTaskOfUser ($userId): array {
        $tasks = self::query()->where('user_id', $userId)->get();
        $data  = [];
        foreach ($tasks as $task) {
            $data[] = $this->taskProcessing($task);
        }
        return $data;
    }

    public function getTaskById ($userId, $taskId): array {
        return $this->taskProcessing(
            self::where('id', $taskId)
                ->where('user_id', $userId)
                ->first()
        );
    }

    public function createTask($data): mixed {
        return $this->create($data);
    }

    public function updateTask ($taskId, $data): bool {
        return $this->where('id', $taskId)->update($data);
    }

    public function deleteTask ($taskId, $uid): bool {
        return $this
            ->where('id', $taskId)
            ->where('user_id', $uid)
            ->delete();
    }
}

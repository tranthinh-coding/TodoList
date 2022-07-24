<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

class PersonalAccessToken extends Model {
    use HasFactory;

    protected $table = 'personal_access_tokens';

    /**
     * @param $tokenId
     * @param $token
     *
     * @return Collection|array|null
     */
    public static function getUserId ($tokenId, $token): Collection|array|null {
        return self::query()
                   ->where('id', $tokenId)
                   ->where('token', hash('sha256', $token))
                   ->value('tokenable_id');
    }

    /**
     * @param $userId
     *
     * @return bool
     */
    public static function removeAllTokenUser ($userId): bool {
        if ($userId && self::query()->where('tokenable_id', $userId)->delete()) {
            return TRUE;
        }
        return FALSE;
    }
}

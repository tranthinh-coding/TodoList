<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class TaskStatusEnum extends Enum {
    /** DONE     : Task was completed */
    public const DONE = "Done";
    /** PENDING  : Task is pending */
    public const PENDING = "Pending";
    /** @var string[] ALL TYPES OF ENUM */
    public const TYPES = [self::DONE, self::PENDING];
}

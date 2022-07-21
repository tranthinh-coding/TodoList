<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class TaskStatusEnum extends Enum {

    /** DONE     : Task was completed */
    public const DONE    = "Done";

    /** PENDING  : Task is pending */
    public const PENDING = "Pending";
}

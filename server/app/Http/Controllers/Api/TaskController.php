<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Task;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Requests\CreateTaskRequest;
use Illuminate\Support\Facades\Response;

class TaskController extends Controller {
    protected Task $model;

    public function __construct () {
        $this->model = new Task;
    }

    public function index (Request $request): JsonResponse {
        $tasks = $this->model->allTaskOfUser($request->user()->id);
        return Response::json($tasks);
    }

    public function show (Request $request, $taskId): array {
        return $this->model->getTaskById($request->user()->id, $taskId);
    }

    public function create (CreateTaskRequest $request): JsonResponse {
        $task = $this->model->createTask([
            'name'            => $request->name,
            'status'          => $request->status,
            'user_id'         => $request->user()->id,
            'label_name'      => $request->label_name,
            'label_color'     => $request->label_color,
            'expiration_date' => $request->expiration_date,
        ]);
        return Response::json([
            'message' => 'Create task successfully',
            'status'  => 200,
            'task'    => $task,
        ]);
    }

    public function update (UpdateTaskRequest $request): JsonResponse {
        $task = $this->model->updateTask($request->task_id, [
            'name'            => $request->name,
            'status'          => $request->status,
            'label_name'      => $request->label_name,
            'label_color'     => $request->label_color,
            'expiration_date' => $request->expiration_date,
        ]);

        return Response::json([
            'message' => 'Updated task successfully',
            'status'  => 200,
            'task'    => $task,
        ]);
    }

    public function destroy (Request $request): JsonResponse {
        $this->model->deleteTask($request->task_id, $request->user()->id);
        return Response::json([
            'message' => 'Deleted task successfully',
            'status'  => 200,
        ]);
    }
}

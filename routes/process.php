<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProcessController;

Route::middleware(['auth'])->group(function () {
    Route::get('/process', [ProcessController::class, 'index'] )->name('process');
    Route::post('/process/update', [ProcessController::class, 'update'] )->name('process.update');
});


<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DocumentTypesController;

Route::middleware(['auth'])->group(function () {
    Route::get('/document-types', [DocumentTypesController::class, 'index'] )->name('document-types');
    Route::post('/document-types/update', [DocumentTypesController::class, 'update'] )->name('document-types.update');
});


<?php


use App\Http\Controllers\DocumentsController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth'])->group(function () {

    Route::get('/documents', [DocumentsController::class, 'index'] )->name('documents');
    Route::get('/documents/create', [DocumentsController::class, 'create'])->name('documents.create');
    Route::post('documents/store', [DocumentsController::class, 'store'])->name('documents.store');
    Route::get('documents/show/{doc_id}', [DocumentsController::class, 'show'])->name('documents.show');

});


<?php
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return to_route('documents');
});

require __DIR__.'/auth.php';
require __DIR__.'/documents.php';
require __DIR__.'/document_types.php';


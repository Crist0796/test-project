<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('doc_documento', function (Blueprint $table) {
            $table->id('doc_id');
            $table->string('doc_codigo');
            $table->string('doc_nombre', 60);
            $table->string('doc_contenido', 4000);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doc_documento');
    }
};

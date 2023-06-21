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
        Schema::create('tip_tipo_doc', function (Blueprint $table) {
            $table->id('tip_id');
            $table->string('tip_nombre', 60);
            $table->string('tip_prefjio', 20);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tip_tipo_doc');
    }
};

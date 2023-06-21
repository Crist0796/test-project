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
        Schema::table('doc_documento', function (Blueprint $table) {
            /* $table->foreignId('doc_id_tipo')->references('tip_id')->on('tip_tipo_doc')->nullOnDelete()->cascadeOnUpdate(); */
            $table->foreignId('doc_id_tipo')->constrained(
                table: 'tip_tipo_doc', indexName: 'tipo_doc', column: 'tip_id'
            )->cascadeOnUpdate();
            $table->foreignId('doc_id_proceso')->constrained(
                table: 'pro_proceso', indexName: 'proceso', column: 'pro_id'
            )->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('doc_documento', function (Blueprint $table) {
            $table->dropForeign('tipo_doc');
            $table->dropForeign('proceso');
        });
    }
};

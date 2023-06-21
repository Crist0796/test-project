<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Document extends Model
{
    use HasFactory;
    protected $primaryKey = 'doc_id';
    protected $table = 'doc_documento';

    protected $fillable = [
        'doc_nombre',
        'doc_contenido',
        'doc_codigo',
        'doc_id_proceso',
        'doc_id_tipo'
    ];


    public function process():BelongsTo
    {
        return $this->belongsTo(Process::class, 'doc_id_proceso');
    }

    public function documentType() : BelongsTo
    {
        return $this->belongsTo(DocumentType::class, 'doc_id_tipo');
    }

}

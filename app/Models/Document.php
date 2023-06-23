<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
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

    public function scopeFilterByType(Builder $query, string $tip_id) : void
    {
        $query->whereHas('documentType', function (Builder $q) use ($tip_id){
            $q->where('tip_id', $tip_id);
        });
    }

    public function scopeFilterByProcess(Builder $query, string $pro_id) : void
    {
        $query->whereHas('process', function (Builder $q) use ($pro_id){
            $q->where('pro_id', $pro_id);
        });
    }

    public function scopeFilterByDocumentTypePrefix(Builder $query, $prefix){
        $query->where('doc_codigo', 'like', $prefix.'-%');
    }

    public function scopeFilterByProcessPrefix(Builder $query, $prefix){
        $query->where('doc_codigo', 'like', '%-'.$prefix.'-%');
    }

}

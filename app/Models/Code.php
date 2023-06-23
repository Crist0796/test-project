<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Code extends Model
{
    use HasFactory;
    protected $primaryKey = 'codigo_id';
    protected $table = 'codigos';

    protected $fillable = [
        'codigo',
        'numero'
    ];

    public function scopeFilterByDocumentTypePrefix(Builder $query, $prefix){
        $query->where('codigo', 'like', $prefix.'-%');
    }
}

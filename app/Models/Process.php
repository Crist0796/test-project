<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Process extends Model
{
    use HasFactory;
    protected $primaryKey = 'pro_id';
    protected $table = 'pro_proceso';

    protected $fillable = [
        'pro_prefijo',
        'pro_nombre'
    ];
}

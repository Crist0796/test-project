<?php

namespace Database\Seeders;

use App\Models\DocumentType;
use Illuminate\Database\Seeder;


class DocumentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach(documentTypeSeederData() as $tipoDocumento){
            $tipoDocumento = DocumentType::create($tipoDocumento);
        }
    }
}

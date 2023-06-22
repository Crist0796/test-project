<?php

namespace App\Http\Controllers\Traits;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Models\Document;

Trait DocumentsTrait {

    /**
     * @param Request $request
     * @return Builder $documents Devuelve Los modelos aplicando los filtros (si es que el usuario los mando)
     *
    */
    public function getDocumentWithFilters(Request $request) : Builder
    {
        $documents = Document::where('doc_nombre', 'like', '%'.$request->doc_nombre.'%');
        if($request->tip_id) $documents->filterByType($request->tip_id);
        if($request->pro_id) $documents->filterByProcess($request->pro_id);
        $documents->with(['documentType', 'process']);
        return $documents;
    }

    public function getCurrentFilers(Request $request) : array|bool
    {
        $currentFilters = [];
        if($request->doc_nombre) $currentFilters['doc_nombre'] = $request->doc_nombre;
        if($request->tip_id) $currentFilters['tip_id'] = $request->tip_id;
        if($request->pro_id) $currentFilters['pro_id'] = $request->pro_id;
        if($request->paginate) $currentFilters['paginate'] = $request->paginate;
        return $currentFilters ? $currentFilters : false;
    }


}

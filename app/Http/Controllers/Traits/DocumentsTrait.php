<?php

namespace App\Http\Controllers\Traits;
use App\Http\Requests\DocRequest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Models\Document;
use App\Models\Code;
use App\Models\DocumentType;
use App\Models\Process;

Trait DocumentsTrait {

    /**
     * @param Request $request
     * @return Builder $documents Devuelve Los modelos aplicando los filtros (si es que el usuario los mandó)
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

    /*Obtiene los filtros que se están aplicando y si no hay retorna un array con los datos vacíos ''*/
    public function getCurrentFilers(Request $request) : array
    {
        $currentFilters = [
            'tip_id' => '',
            'pro_id' => '',
            'doc_nombre' => '',
            'paginate' => 5
        ];
        if($request->doc_nombre) $currentFilters['doc_nombre'] = $request->doc_nombre;
        if($request->tip_id) $currentFilters['tip_id'] = $request->tip_id;
        if($request->pro_id) $currentFilters['pro_id'] = $request->pro_id;
        if($request->paginate) $currentFilters['paginate'] = $request->paginate;
        return $currentFilters;
    }

    /**
     * Compara si los datos del documento fueron modificados, y si es así
     *  aplicaa los cambiosy devuelve true o false según corresponda
     * */
    public function insertDataAndGetChangesOnDocument(DocRequest $request, Document $document) : bool
    {
        $count = 0;

        /*Si el usuario cambió el id del proceso o del tipo de documento
          Acuatlizo los códigos y actualizó el código en el documento
        */
        if($document->doc_id_tipo != $request->doc_id_tipo || $document->doc_id_proceso != $request->doc_id_proceso){
            $documentType = DocumentType::findOrFail($request->doc_id_tipo);
            $process = Process::findOrFail($request->doc_id_proceso);
            $codeArray = explode('-', $document->doc_codigo);
            $oldCode = $codeArray[0].'-'.$codeArray[1];

            /*Aquí también hubiera podido utilizr explode pero utilicé una expresión regular porque
              Se ve más hacker
            */
            $haveNum = preg_match('/\d+/', $document->doc_codigo, $numCode); //Saca el número del codigo.
            $this->updateCodes($oldCode, $numCode[0]);
            $document->doc_codigo = $documentType->tip_prefijo.'-'.$process->pro_prefijo.'-'.
                                    $this->getLastCode($documentType->tip_prefijo.'-'.$process->pro_prefijo);
        }

        /*Recorro el request y cada vez que hay un cambio respecto al documento a modificar
         Hace el cambio y actualiza en contador, si al finalizar el contador es mayor a cero
         significa que hubo un cambio, entonces guardo el documento y retorno true
        */
        foreach($request->all() as  $propertie => $value){
            if($document->$propertie != $request->$propertie){
                $document->$propertie = $request->$propertie;
                $count++;
            }
        }

        if($count){
            $document->save();
            return true;
        }
        return false;
    }


    public function getLastCode(string $code) : int
    {
        $lastCode = 1;
        $foundCode = Code::where('codigo', $code)->orderBy('numero', 'desc')->first();
        if($foundCode){
            $lastCode = intval($foundCode->numero) + 1;
        }

        $newCode = new Code();
        $newCode->codigo = $code;
        $newCode->numero = $lastCode;
        $newCode->save();
        return intval($newCode->numero);

    }

    //Actualiza los códigos
    public function updateCodes(string $oldCode = '', int $numCode) : void
    {

        //Toma los códigos apartir del que se va a eliminar
        $codes = Code::where('codigo', $oldCode)->where('numero', '>',  $numCode)->get();
        //Codigo que se va a eliminar
        $code = Code::where('codigo', $oldCode)->where('numero', $numCode)->first();
        Code::destroy($code->codigo_id);

        foreach($codes as $code){
            $this->updateDocumentCode($code->codigo.'-'.$code->numero, $code->codigo.'-'.$code->numero-1);
            $code->numero = $code->numero - 1;
            $code->save();
        }

    }

    public function updateDocumentCode($oldCode, $newCode){
        $document = Document::where('doc_codigo', $oldCode)->first();
        $document->doc_codigo = $newCode;
        $document->save();
    }


}

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\DocumentsTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\DocumentType;
use App\Models\Document;
use App\Models\Code;
class DocumentTypesController extends Controller
{

    use DocumentsTrait;

    /**
     * Display a listing of the resource.
     */
    public function index() : Response
    {
        $documentsTypes = DocumentType::paginate(5);
        return Inertia::render('DocumentTypes/Index', ['documentTypes' => $documentsTypes]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {

        $rules = [
            'tip_id' => 'required',
        ];

        $messages = [];

        /*Se valuan las posibilidades y con base en ello hago la validación:
        1-) Envían el prefijo pero no el nombre.
        2-) Envían el nombre y el prefijo.
        3-) Envían el nombre y no el prefijo.
        4-9 No envían nada.
        */
        if($request->tip_prefijo && !$request->tip_nombre){
            $rules['tip_prefijo'] = 'max:5';
            $messages['tip_prefijo.max'] = 'El prefijo no debe tener más de 5 caracteres';
        }elseif($request->tip_prefijo && $request->tip_nombre){
            $rules['tip_prefijo'] = 'max:5';
            $messages['tip_prefijo.max'] = 'El prefijo no debe tener más de 5 caracteres';
            $rules['tip_nombre'] = 'unique:tip_tipo_doc|min:3';
            $messages['tip_nombre.unique'] = 'Ya existe un tipo de documento con ese nombre';
            $messages['tip_nombre.min'] = 'El nombre debería debe tener mínimo 3 caracteres';

        }elseif(!$request->tip_prefijo && $request->tip_nombre){
            $rules['tip_nombre'] = 'unique:tip_tipo_doc|min:3';
            $messages['tip_nombre.unique'] = 'Ya existe un tipo de documento con ese nombre';
            $messages['tip_nombre.min'] = 'El nombre debería debe tener mínimo 3 caracteres';
        }else{
            return redirect()->route('document-types')
            ->withErrors(['prefijo' => 'Escriba un nombre o un prefijo']);
        }


        $request->validate($rules, $messages);

        //Busco los documentos que tienen ese prefijo y si hay los actualizo.
        try{
            DB::beginTransaction();
            $documentType = DocumentType::findOrFail($request->tip_id);
            $documents = Document::filterByDocumentTypePrefix($documentType->tip_prefijo)->get();
            $codes = Code::filterByDocumentTypePrefix($documentType->tip_prefijo)->get();

            $documentType->tip_prefijo = $request->tip_prefijo ? str($request->tip_prefijo)->upper() : substr(str($request->tip_nombre)->upper(), 0, 3);
            if($request->tip_nombre){
                $documentType->tip_nombre = $request->tip_nombre;
            }

            //-- Si el prefijo ya existe retorno con error -- //
            $foundDocumentType = DocumentType::where('tip_prefijo', $documentType->tip_prefijo)->first();
            if($foundDocumentType){
               return redirect()->route('document-types')
               ->withErrors(['prefijo' => 'El prefijo ya existe.']);
            }

            $documentType->save();

            /*Si existen documentos que en el código tengan el prefijo viejo
              los recorro y los actualizo con el nuevo
            */
            if($documents){
                foreach($documents as $document){
                    $codeArray = explode('-', $document->doc_codigo);
                    $newCode = $documentType->tip_prefijo.'-'.$codeArray[1].'-'.$codeArray[2];
                    $document->doc_codigo = $newCode;
                    $document->save();
                }
            }

            /*Si existen códigos (en la tabla codigos) tengan el prefijo viejo
              los recorro y los actualizo con el nuevo
            */
            if($codes){
                foreach($codes as $code){
                    $codeArray = explode('-', $code->codigo);
                    $newCode = $documentType->tip_prefijo.'-'.$codeArray[1];
                    $code->codigo = $newCode;
                    $code->save();
                }
            }

            DB::commit();
            session()->flash('document_type_updated', 'El tipo de documento se actualizó correctamente');
            return to_route('document-types');
        }catch(\Exception $e){
            DB::rollBack();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

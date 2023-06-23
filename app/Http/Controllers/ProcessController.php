<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\DocumentsTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Process;
use App\Models\Code;
use App\Models\Document;
use Illuminate\Support\Facades\DB;
class ProcessController extends Controller
{

    use DocumentsTrait;

    /**
     * Display a listing of the resource.
     */
    public function index() : Response
    {
        $process = Process::paginate(5);
        return Inertia::render('Process/Index', ['process' => $process]);
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
            'pro_id' => 'required',
        ];

        $messages = [];

        /*Se valuan las posibilidades y con base en ello hago la validación:
        1-) Envían el prefijo pero no el nombre.
        2-) Envían el nombre y el prefijo.
        3-) Envían el nombre y no el prefijo.
        4-9 No envían nada.
        */
        if($request->pro_prefijo && !$request->pro_nombre){
            $rules['pro_id'] = 'max:5';
            $messages['pro_prefijo.max'] = 'El prefijo no debe tener más de 5 caracteres';
        }elseif($request->pro_prefijo && $request->pro_nombre){
            $rules['pro_prefijo'] = 'max:5';
            $messages['pro_prefijo.max'] = 'El prefijo no debe tener más de 5 caracteres';
            $rules['pro_nombre'] = 'unique:pro_proceso|min:3';
            $messages['pro_nombre.unique'] = 'Ya existe un nombre de proceso con ese nombre';
            $messages['pro_nombre.min'] = 'El nombre debería debe tener mínimo 3 caracteres';

        }elseif(!$request->pro_prefijo && $request->pro_nombre){
            $rules['pro_nombre'] = 'unique:pro_proceso|min:3';
            $messages['pro_nombre.unique'] = 'Ya existe un nombre de proceso con ese nombre';
            $messages['pro_nombre.min'] = 'El nombre debería debe tener mínimo 3 caracteres';
        }else{
            return redirect()->route('process')
            ->withErrors(['prefijo' => 'Escriba un nombre o un prefijo']);
        }


        $request->validate($rules, $messages);


        try{
            DB::beginTransaction();
            $process = Process::findOrFail($request->pro_id);

             //Busco los documentos y códigos que tienen ese prefijo para actualizarlos.
            $documents = Document::filterByProcessPrefix($process->pro_prefijo)->get();
            $codes = Code::filterByProcessPrefix($process->pro_prefijo)->get();

            $process->pro_prefijo = $request->pro_prefijo ? str($request->pro_prefijo)->upper() : substr(str($request->pro_nombre)->upper(), 0, 3);
            if($request->pro_nombre){
                $process->pro_nombre = $request->pro_nombre;
            }

            //-- Si el prefijo ya existe retorno con error -- //
            $foundProcess = Process::where('pro_prefijo', $process->pro_prefijo)->first();
            if($foundProcess && $foundProcess->pro_id != $request->pro_id){

               return redirect()->route('process')
               ->withErrors(['prefijo' => 'El prefijo ya existe.']);
            }
            $process->save();

            /*Si existen documentos que en el código tengan el prefijo viejo
              los recorro y los actualizo con el nuevo
            */
            if($documents){
                foreach($documents as $document){
                    $codeArray = explode('-', $document->doc_codigo);
                    $newCode = $codeArray[0].'-'.$process->pro_prefijo.'-'.$codeArray[2];
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
                    $newCode = $codeArray[0].'-'.$process->pro_prefijo;
                    $code->codigo = $newCode;
                    $code->save();
                }
            }

            DB::commit();
            session()->flash('process_updated', 'El Proceso se actualizó correctamente');
            return to_route('process');
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

<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Traits\DocumentsTrait;
use App\Models\Document;
use App\Models\DocumentType;
use App\Models\Process;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Requests\DocRequest;


class DocumentsController extends Controller
{

    use DocumentsTrait;

    /**
     * Display a listing of the resource.
     */
    public function index(?Request $request) : Response
    {
        $documents = $this->getDocumentWithFilters($request);
        $currentFilters = $this->getCurrentFilers($request);
        $documentTypes = DocumentType::all();
        $process = Process::all();
        return Inertia::render('Documents/Index', ['documents' => $documents->paginate($currentFilters['paginate'] ?? 5),
                                                   'documentTypes' => $documentTypes,
                                                   'process' => $process,
                                                   'currentFilters' => $currentFilters]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create() : Response
    {
        $documentTypes = DocumentType::all();
        $process = Process::all();
        return Inertia::render('Documents/Create', ['process' => $process,
                                                    'documentTypes' => $documentTypes]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DocRequest $request)
    {
        $request->validate($request->rules(), $request->messages());
        $documentType = DocumentType::findOrFail($request->doc_id_tipo);
        $process = Process::findOrFail($request->doc_id_proceso);
        $document = Document::create([
            'doc_nombre' => $request->doc_nombre,
            'doc_contenido' => $request->doc_contenido,
            'doc_id_proceso' => $request->doc_id_proceso,
            'doc_id_tipo' => $request->doc_id_tipo,
        ]);

        $document->doc_codigo = $documentType->tip_prefijo.'-'.$process->pro_prefijo.'-'.
                                $this->getLastCode($documentType->tip_prefijo.'-'.$process->pro_prefijo);
        $document->save();

        session()->flash('document_created', 'El documento se creó correctamente');
        return to_route('documents');
    }
    /**
     * Display the specified resource.
     */
    public function show(string $doc_id) : Response
    {
        $documentTypes = DocumentType::all();
        $process = Process::all();
        $document = Document::findOrFail($doc_id);
        return Inertia::render('Documents/Show', ['document' => $document, 'process' => $process,
                                                 'documentTypes' => $documentTypes]);
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
    public function update(DocRequest $request)
    {
        $request->validate($request->rules(), $request->messages());
        $document = Document::findOrFail($request->doc_id);
        if($this->insertDataAndGetChangesOnDocument($request, $document)){
            session()->flash('document_updated', 'El documento se modificó correctamente');
        }
        return to_route('documents.show', $document->doc_id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $doc_id)
    {
        $document = Document::findOrFail($doc_id);
        $codeArray = explode('-', $document->doc_codigo);
        $this->updateCodes($codeArray[0].'-'.$codeArray[1], intval($codeArray[2]));
        Document::destroy($doc_id);
        session()->flash('document_deleted', 'El documento se eliminó correctamente');
        return to_route('documents');
    }
}

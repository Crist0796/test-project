<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;
use Inertia\Inertia;
use App\Models\DocumentType;
use App\Models\Process;
use App\Http\Requests\DocRequest;

class DocumentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $documentTypes = DocumentType::all();
        $process = Process::all();
        $documents = Document::with(['process', 'documentType'])->paginate(1);
        return Inertia::render('Documents/Index', ['documents' => $documents,
                                                   'documentTypes' => $documentTypes,
                                                   'process' => $process]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
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
        $validate = $request->validate($request->rules(), $request->messages());
        $documentType = DocumentType::findOrFail($request->doc_id_tipo);
        $process = Process::findOrFail($request->doc_id_proceso);
        $document = Document::create([
            'doc_nombre' => $request->doc_nombre,
            'doc_contenido' => $request->doc_contenido,
            'doc_id_proceso' => $request->doc_id_proceso,
            'doc_id_tipo' => $request->doc_id_tipo,
        ]);

        $document->doc_codigo = $documentType->tip_prefijo.'-'.$process->pro_prefijo.'-'.$document->doc_id;
        $document->save();
        return to_route('documents.show', $document->doc_id);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $doc_id)
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

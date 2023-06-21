<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DocRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'doc_nombre' => 'required|max:60',
            'doc_contenido' => 'required|max:4000',
            'doc_id_proceso' => 'required',
            'doc_id_tipo' => 'required'
        ];
    }

    public function messages() : array
    {
        return [
            'doc_nombre.required' => 'El nombre del documento es requerido',
            'doc_nombre.max' => 'El nombre del documento no debe exceder 60 caracteres',
            'doc_contenido.required' => 'El contenido del documento es requerido',
            'doc_contenido.max' => 'El contenido del documento no debe exceder 4000 caracteres',
            'doc_id_proceso' => 'El proceso es requerido',
            'doc_id_tipo' => 'El tipo de documento es requerido'
        ];
    }
}

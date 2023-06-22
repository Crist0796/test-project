<?php

function pr($o){
	echo '<pre>';
	print_r($o);
	echo '</pre>';
}

function prd($o){
	pr($o);
	die;
}

function prt($o){
	if($o instanceof Illuminate\Contracts\Support\Arrayable ){
		pr($o->toArray());
	}else{
		pr($o);
	}
}

function prdt($o){
	prt($o);
	die();
}

function processSeederData() : array
{
    return [
        [
            'pro_nombre' => 'Ingenieria',
            'pro_prefijo' => 'ING'
        ],
        [
            'pro_nombre' => 'Administracion',
            'pro_prefijo' => 'ADM'
        ],
        [
            'pro_nombre' => 'Atencion',
            'pro_prefijo' => 'ATE'
        ],
        [
            'pro_nombre' => 'Recursos Humanos',
            'pro_prefijo' => 'RRHH'
        ],
        [
            'pro_nombre' => 'Investigacion',
            'pro_prefijo' => 'INV'
        ]
        ];
}

function documentTypeSeederData() : array
{
    return [
        [
            'tip_nombre' => 'Instructivo',
            'tip_prefijo' => 'INS'
        ],
        [
            'tip_nombre' => 'Liquidacion',
            'tip_prefijo' => 'LIQ'
        ],
        [
            'tip_nombre' => 'Memorando',
            'tip_prefijo' => 'MEM'
        ],
        [
            'tip_nombre' => 'Reporte',
            'tip_prefijo' => 'REP'
        ],
        [
            'tip_nombre' => 'Licencia',
            'tip_prefijo' => 'LIC'
        ]
        ];
}


function modifyIfAreDifferent(string $a, string $b) : bool
{
    if($a =! $b){
        return true;
    }
    return false;
}


?>

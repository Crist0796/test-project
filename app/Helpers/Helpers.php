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


?>

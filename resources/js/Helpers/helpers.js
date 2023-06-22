
// Setea la url para que mantenga los filtros de búsquedad en la paginación
const setUrl = (url, currentFilters) => {

    if(currentFilters.doc_nombre || currentFilters.tip_id  || currentFilters.pro_id){
        let initUrl = '?'
        const filters = Object.keys(currentFilters)
        filters.forEach((filter) => {
            initUrl += `${filter}=${currentFilters[filter] ? currentFilters[filter] : ''}&`
        })
        const ini = url.indexOf('?')
        const end = url.length
        const page = url.slice(ini - end).replace('?', '&')
        console.log(initUrl.substring(0, initUrl.length - 1) + page)
        return initUrl.substring(0, initUrl.length - 1) + page
    }
    return url
}

//Llama a toast para mostrarlo en pantalla
const showToast = (msg, toast) => toast.success(msg)
export {
    setUrl,
    showToast
}

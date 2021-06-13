window.addEventListener("load", main);

function main() {
    const urlParams = getUrlParams();
    const esPermiso = isPermiso(urlParams);


    if (esPermiso) {
        
        const esDiario = isPermisoDiario(urlParams);
            
        const esPeriodo = isPermisoPeriodo(urlParams);

        let list=listAllProperties(urlParams);

        writeHtml(list, urlParams);

        if (esDiario) {
           clearPermisoPeriodoHtml();
        } else if (esPeriodo) {
            clearPermisoDiarioHtml();
        } 
        detallesHtml();
    }


}

/**
 * 
 * @param {string} name 
 * @returns {string} value
 */
function getUrlParamBy(name) {
    const url = location.href;
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1].replaceAll("%20", " ");
}

/**
 * 
 * @param {any} object 
 * @returns {Array<string>}
 */



function getUrlParams(){
    return {
        nombre: getUrlParamBy("nombre"),
        apellido: getUrlParamBy("apellido"),
        dni: getUrlParamBy("dni"),
        inicio: getUrlParamBy("inicio"),
        fin: getUrlParamBy("fin"),
        desde: getUrlParamBy("desde"),
        desdeCP: getUrlParamBy("desdeCP"),
        hasta: getUrlParamBy("hasta"),
        hastaCP: getUrlParamBy("hastaCP"),
        motivo: getUrlParamBy("motivo"),
        vacaciones: getUrlParamBy("vacaciones"),
        dominio: getUrlParamBy("dominio"),
        vehiculo: getUrlParamBy("vehiculo"),
    };
}

function isPermiso(urlParams){
    return  urlParams.nombre != null &&
    urlParams.apellido != null &&
    urlParams.dni != null &&
    urlParams.inicio != null &&
    urlParams.desde != null &&
    urlParams.desdeCP != null &&
    urlParams.hasta != null &&
    urlParams.hastaCP != null;
}

function isPermisoDiario(urlParams){
    return urlParams.fin == null &&
    urlParams.vacaciones == null &&
    urlParams.dominio == null &&
    urlParams.vehiculo == null &&
    urlParams.motivo != null;
}

function isPermisoPeriodo(urlParams){
    return urlParams.fin != null &&
    urlParams.vacaciones != null &&
    urlParams.dominio != null &&
    urlParams.vehiculo != null &&
    urlParams.motivo == null;
}

function listAllProperties(object) {
    var objectToInspect;
    var result = [];

    for(objectToInspect = object; objectToInspect !== null;
        objectToInspect = Object.getPrototypeOf(objectToInspect)) {
     result = result.concat(
         Object.getOwnPropertyNames(objectToInspect)
     );
 }

     return result;
}

function writeHtml(list, urlParams) {
    for (let id of list) {
        let object = document.querySelector("#" + id);
        if (object != null) {
            if (id == "vacaciones") {
                object.textContent = urlParams[id] == "true" ? "Si" : "No";
            } else {
                object.textContent = urlParams[id];
            }
        }
    }
}

function clearPermisoDiarioHtml() {
    document.querySelector("#motivo").parentElement.parentElement.parentElement.remove();
}

function clearPermisoPeriodoHtml() {
    document.querySelector("#vehiculo").parentElement.parentElement.parentElement.remove();
    document.querySelector("#vacaciones").parentElement.parentElement.parentElement.remove();
    document.querySelector("#fin").parentElement.remove();
}

function detallesHtml() {
    document.querySelector("#detalles").classList.remove("d-none");
}











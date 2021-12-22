
//constructor del los Procedimientos
class Procedmiento {
    constructor (tipo,numero,anio,detalle,organismo,fechaDeApertura,horaDeApertura){
        this.id = listaDeProcedimientos.length + 1
        this.tipo = tipo
        this.numero = parseInt(numero)
        this.anio = parseInt(anio)
        this.detalle = detalle.toUpperCase()
        this.organismo = organismo
        this.momentoApertura = new Date (fechaDeApertura+"T" +horaDeApertura)
        this.comentario = ""
        this.vigente = true
        this.abierta = false
        this.eliminado = false
    
    }

}
let listaDeProcedimientos = []

if(localStorage.getItem("proc")){

	listaDeProcedimientos = JSON.parse(localStorage.getItem("proc"))

}else{
//Simulacion

    


for (let i = 0; i < 70; i++) {
    let elevador = (20 * unDia) - (i * (unDia/3))
    let estaFecha = new Date(Date.parse(hoyDia) - elevador).toISOString().substr(0, 10)
    let estaHora = tipoDeHora[horaForProc[i]]
    listaDeProcedimientos.push(new Procedmiento(tiposForProc[i], nrosForProc[i], anioForProc, detForProc[i], orgForProc[i], estaFecha, estaHora))

}
for (let i = 0; i < 12; i++){
    let elevador = (30 * unDia) - (i * 30 * unDia)
    let estaFecha = new Date(Date.parse(hoyDia) + elevador).toISOString().substr(0, 10)
    let estaHora = tipoDeHora[horaForProc[i]]
    listaDeProcedimientos.push(new Procedmiento(tiposForProc[i], nrosForProc[i], anioForProc, detForProc[i], orgForProc[i], estaFecha, estaHora))

}

localStorage.setItem("proc",JSON.stringify(listaDeProcedimientos))

}



const procToPush =  () => {
   
    const e = new Procedmiento (
inputTipoProc.value,
inputNumProc.value,
inputAnioProc.value,
inputDetalleProc.value,
inputOrganismoProc.value,
inputFechaAperturaProc.value,
inputHoraAperturaProc.value)
        
listaDeProcedimientos.push(e)
let aJson = JSON.stringify(listaDeProcedimientos)
localStorage.setItem("proc", aJson)
    }
    


btnCargProc.onclick = (e) => {
    e.preventDefault ()

    if (inputTipoProc.value == "" || inputNumProc.value == "" || inputAnioProc.value == "" || inputDetalleProc.value == "" || inputOrganismoProc.value == "" || inputFechaAperturaProc.value == "" || inputHoraAperturaProc.value == ""){
        validaciones.innerHTML = "Llenar todos los Campos"
		validaciones.style.color = "red"
    }else{

        procToPush()

        todosInputsProc.val("")
        
        validaciones.innerHTML = "Procedimiento Subido"
		validaciones.style.color = "green"

        setTimeout(() => {
			validaciones.innerHTML = ""
		}, 2000
		)
    }
}



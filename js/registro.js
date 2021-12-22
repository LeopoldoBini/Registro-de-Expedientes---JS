let lista = {
    total: [],
    esteMes: [],
    hoy: [],
    renderizada: ""
}


const ExtraerOrdenarChequearEstado = () => {


    const deJson = localStorage.getItem("proc")
    const listaDeProcedimientos = JSON.parse(deJson)

    listaDeProcedimientos.sort((a, b) => Date.parse(a.momentoApertura) - Date.parse(b.momentoApertura))

    listaDeProcedimientos.forEach(proc => {
        let seAbrioHaceMucho = (hoyDiaParse - Date.parse(proc.momentoApertura)) > 15 * unDia
        let esteAbrehoy = new Date(proc.momentoApertura).toLocaleDateString() == hoyDia.toLocaleDateString()

        if (seAbrioHaceMucho) proc.vigente = false
        if (esteAbrehoy) proc.abreHoy = true

    })

    lista.total = listaDeProcedimientos
    lista.esteMes = lista.total.filter(e => e.momentoApertura.includes(hoyDia.toISOString().substr(0, 7)))
    lista.hoy = lista.total.filter(e => new Date(e.momentoApertura).toLocaleDateString() == hoyDia.toLocaleDateString())

    const btnFiltroMostrarTodas = $("#btnTodos")
    btnFiltroMostrarTodas.animate({ opacity: ".2" })

    const kbdBtnFiltroEsteMes = $("#kbdEsteMes")
    kbdBtnFiltroEsteMes.text(tipoDeMes[hoyDia.getMonth()])
    $("#spanTitulo").text("Contrataciones Publicas")
}

const botonesFiltro = () => {
    let botonFiltro = $(".botonFiltro")

    botonFiltro.click((click) => {
        const clickTargetId = click.target.id
        const nodoClickeado = $("#" + clickTargetId)
        const nodoBtnPadre = nodoClickeado.closest("button")
        const prenderApagarBtn = (btnNode) => {
            btnNode.animate({ opacity: ".2" })
            btnNode.siblings().animate({ opacity: "1" })
        }
        prenderApagarBtn(nodoBtnPadre)

        const listaARenderizar = nodoBtnPadre[0].value
        const esDistintaALaRenderizada = lista.renderizada != listaARenderizar

        if (esDistintaALaRenderizada) {
            renovarTabla(lista[listaARenderizar])
            $("#spanTitulo").text(nodoBtnPadre[0].value)
        }
    })
}

const obtenerFiltroPorMes = (list) => {

    let soloMomentoApertura = list.map(({ momentoApertura }) => momentoApertura)

    let obtenerParametrosParaFiltrar = (objMomentos, momento) => {
        let objDate = new Date(momento)
        let aniosDeCadaObj = objDate.getFullYear()
        let mesDeCadaObj = objDate.getMonth()
        let ordenarMayorAMenor = (a, b) => b - a
        let ordenarMenorAMayor = (a, b) => a - b
        return objMomentos = {
            anios: Array.from(new Set([...objMomentos.anios, aniosDeCadaObj].sort(ordenarMayorAMenor))),
            mes: Array.from(new Set([...objMomentos.mes, mesDeCadaObj].sort(ordenarMenorAMayor))),
        }
    }

    let parametrosParaFiltroPorMes = soloMomentoApertura.reduce(obtenerParametrosParaFiltrar, { anios: [], mes: [] })

    parametrosParaFiltroPorMes.anios.forEach(anio => {
        $("#inputFiltroAnio").append(
            `<option value="${anio}">${anio}</option>`
        )
    })
    parametrosParaFiltroPorMes.mes.forEach(mes => {
        $("#inputFiltroMes").append(
            `<option value="${mes}">${tipoDeMes[mes]}</option>`
        )
    })

    const btnFiltoPorMes = $("#btnFiltroMesPersonalizado")

    btnFiltoPorMes.on("click", () => {

        const mes = $("#inputFiltroMes").val()
        const anio = $("#inputFiltroAnio").val()

        if (mes && anio) {

            const objDateMesElegido = new Date(anio, mes)
            const SoloMesYAnioISOSting = objDateMesElegido.toISOString().substr(0, 7)
            const listaFiltradaPorMesElegido = lista.total.filter(p => p.momentoApertura.includes(SoloMesYAnioISOSting))
            const esDistintaALaRenderizada = listaFiltradaPorMesElegido != lista.renderizada

            if (esDistintaALaRenderizada) {
                renovarTabla(listaFiltradaPorMesElegido)
                lista.renderizada = listaFiltradaPorMesElegido
                $(".botonFiltro").animate({ opacity: "1" })
                $("#spanTitulo").text(`${tipoDeMes[mes]} del ${anio}`)
            }
        }
    })

}





let inyectarTabla = (list) => {

    let sinEliminados = list.filter(p => !p.eliminado)

    sinEliminados.forEach((proc, index) => {

        let dateApertura = new Date(proc.momentoApertura)
        let estaFechaDeAperturaLocaleString = dateApertura.toLocaleDateString("es-AR")
        let esteSemanal = tipoDeSemanal[dateApertura.getDay()]
        let esteDia = dateApertura.getDate()
        let anteriorFechaDeAperturaLocaleString = ""
        if (index != 0) {
            let dateAperturaProcAnterior = new Date(list[index - 1].momentoApertura)
            anteriorFechaDeAperturaLocaleString = dateAperturaProcAnterior.toLocaleDateString("es-AR")
        }

        let esteTipo = tipoDeTipos[proc.tipo]
        let esteOrg = tipoDeOrganismo[proc.organismo]
        const min = (m) => { if (m == 0) { return "00" } else { return m } }
        let hora = dateApertura.getHours() + ":" + min(dateApertura.getMinutes())

        
        $("#tablaBody").prepend(
            `<tr class="row${proc.id}" ref="${proc.id}">
        <td class="dinone">${proc.id}</td>
        <td>${esteSemanal}</td>
        <td>${esteDia}</td>
        <td>${hora}</td>
        <td>${esteTipo}</td>
        <td>${proc.numero}</td>
        <td>${proc.anio}</td>
        <td>${proc.detalle}</td>
        <td>${esteOrg}</td>
        <td>${estaFechaDeAperturaLocaleString}</td>
        <td>
        <button class="btn tooltip-test btnEliminar" title="Eliminar" data-bs-placement="top" data-bs-toggle="modal" data-bs-target="#eliminarModal"> ❌ </button>
        </td>
        </tr>`
        )
        let esteRow = $(".row" + proc.id)

        
        if (estaFechaDeAperturaLocaleString != anteriorFechaDeAperturaLocaleString) { esteRow.addClass("divisorDia") }

        if (proc.vigente && !proc.abreHoy) { esteRow.addClass("table-success") }
        else if (proc.abreHoy) { esteRow.addClass("table-danger fw-bolder") }
        else { esteRow.addClass("table-dark") }
    
    })

    lista.renderizada = list
}






let renovarTabla = (list) => {
    $("#tablaBody").slideUp().html("")
    inyectarTabla(list)
    $("#tablaBody").slideDown()
}


function btnEliminar() {
    let btnEliminar = $(".btnEliminar")
    let tituloModal = $("#modalPaEliminarTitle")
    let bodyModal = $("#objetoProc")

    let aEliminar = {
        nodoRow: "",
        id: "",
    }
    let limipiarVarABorrar = () => {
        aEliminar.nodoRow = ""
        aEliminar.id = ""
    }


    btnEliminar.click((click) => {

        aEliminar.nodoRow = click.target.parentElement.parentElement
        aEliminar.id = parseInt(aEliminar.nodoRow.getAttribute("ref"))


        tituloModal.text(`Borrar del Registro ${aEliminar.nodoRow.children[4].innerText}   ${aEliminar.nodoRow.children[5].innerText}`)
        bodyModal.text(aEliminar.nodoRow.children[7].innerText)


        console.log(aEliminar)






    })
    $("#eliminarNomas").click(() => {

        lista.total.find((proc) => proc.id === aEliminar.id).eliminado = true
        localStorage.removeItem("proc")
        localStorage.setItem("proc", JSON.stringify(lista.total))

        renovarTabla(lista.renderizada)
        limipiarVarABorrar()



    })
}

ExtraerOrdenarChequearEstado()
inyectarTabla(lista.total)
botonesFiltro()
obtenerFiltroPorMes(lista.total)
btnEliminar() // esta, si apreto el bt y no elimino, si no que vuelvo, se actualiza la info del modal y las variables necesarias para hacer la eliminacion, ahora si yo le doy eliminar, se me rompe y no vuelve a funcionar. funciona solo la primera vez y se clava con la primera informacion




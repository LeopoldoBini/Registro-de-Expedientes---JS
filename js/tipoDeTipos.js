const inputTipoProc = document.getElementById("inputTipoProc")
const inputNumProc = document.getElementById("inputNumProc")
const inputAnioProc = document.getElementById("inputAnioProc")
const inputDetalleProc = document.getElementById("inputDetalleProc")
const inputOrganismoProc = document.getElementById("inputOrganismoProc")
const inputFechaAperturaProc = document.getElementById("inputFechaAperturaProc")
const inputHoraAperturaProc = document.getElementById("inputHoraAperturaProc")
const btnCargProc = document.getElementById("btnCargProc")
const validaciones = document.getElementById("validaciones")

const todosInputsProc = $(".inputProc")

const tipoDeTipos = {
    1: "L.P.",
    2: "C.A.",
    3: "A.S."
};

const tipoDeOrganismo = {
    1: "911", 2: "CAG", 3: "CENCONV", 4: "CRH", 5: "CRyRP", 6: "DGR", 7: "HAO", 8: "HPMI", 9: "HSB", 10: "IPSS", 11: "MDS", 12: "ME", 13: "MECYT", 14: "MG", 15: "MI", 16: "MP", 17: "MS", 18: "MSP", 19: "MTD", 20: "SC", 21: "SGG", 22: "TCSE", 23: "TELEFERICO", 24: "TREN",
};

const tipoDeHora = {
    1: "10:00",
    2: "10:30",
    3: "11:00",
    4: "11:30",
    5: "12:00",
    6: "12:30",
    7: "13:00",
};

const tipoDeSemanal = {
    0 : "Lunes",
    1 : "Martes",
    2 : "Miercoles",
    3 : "Jueves",
    4 : "Viernes",
    5 : "Sabado",
    6 : "Domingo",
}
const tipoDeMes ={
    0 : "ENERO",
    1 : "FEBRERO",
    2 : "MARZO",
    3 : "ABRIL",
    4 : "MAYO",
    5 : "JUNIO",
    6 : "JULIO",
    7 : "AGOSTO",
    8 : "SEPTIEMBRE",
    9 : "OCTUBRE",
    10 : "NOVIEMBRE",
    11 : "DICIEMBRE"
}

let tiposForProc = [3, 1, 2, 2, 3, 2, 1, 1, 1, 3, 1, 3, 2, 2, 1, 1, 1, 2, 1, 3, 2, 2, 1, 2, 2, 3, 2, 3, 1, 1, 2, 2, 2, 2, 2, 3, 3, 1, 1, 3, 2, 3, 2, 3, 3, 3, 3, 2, 1, 2, 1, 1, 3, 3, 3, 2, 2, 3, 1, 3, 1, 3, 2, 1, 1, 1, 1, 2, 1, 2]
let nrosForProc = [133, 150, 145, 146, 134, 147, 151, 152, 153, 135, 154, 136, 148, 149, 155, 156, 157, 150, 158, 137, 151, 152, 159, 153, 154, 138, 155, 139, 160, 161, 156, 157, 158, 159, 160, 140, 141, 162, 163, 142, 161, 143, 162, 144, 145, 146, 147, 163, 164, 164, 165, 166, 148, 149, 150, 165, 166, 151, 167, 152, 168, 153, 167, 169, 170, 171, 172, 168, 173, 169]
let anioForProc = 2021
let detForProc = ["MED CON DESC. ESPECIALES", "VIVERES FRESCOS- CARNE", "INDUMENTARIA", "MEDICAMENTOS DE SEDOANALGESIA", "NEUMÁTICOS", "ALIMENTO EQUINOS", "MODULOS FOCALIZADOS", "INDUMENTARIA", "SERVICIO DE PROVISION DE AGUA", "ADQUISICION DE BIENES INVENTARIABLES PARA CENTROS DE SAUD", "COMPUTADORAS- PAPA FRANCISCO", "COMPUTADORAS- HOSP CAFAYATE", "DROGAS. PROG. LABORATORIO", "TABLERO PARA GRUPO ELECTROGENO", "REACTIVOS SARS", "CLARITROMICINA", "ARTICULOS DE LIMPIEZA", "POSTES", "PROVISION E INSTALACION EN COMODATO CON OPCION A COMPRA PARA SALA DE GASES", "MOTO ENDURO", "FORMULAS DE INICIO", "REPUESTOS ORIGINALES PARA MOTONITORES DRAGER", "SERVICIO DE VIGILANCIA", "INSUMOS DETECCION COVID", "UTILES MENORES MEDICOS", "PERTRECHOS Y ELEMENTOS DE SEGURIDAD SP", "MATERIALES PARA BASE OPERATIVA ATLAS(PROVISION DE AGUA) SANTA VICTORIA ESTE", "REPARACION MODULO TIB", "INSUMOS PARA CIRUGIA", "MEDICAMENTOS-COVID", "ADQUISICION DE UN SIEMENS SHOULDER ARRAY Y UN CARBON BRUSH SET DATA PARA TC SIEMENS SPIRIT", "DOS MONITORES DE GRADO MEDICO", "ELEMENTOS DE BIOSEGURIDAD", "MEDICAMENTOS", "SIAIS", "REACTIVOS", "REACTIVOS", "TENDIDO DE OXIGENO", "PROVISION DE OXIGENO CENTRALIZADO - H. LA CALDERA", "ELEMENTOS DE PROTECCION COVID", "VEHICULO . CAMIONETA 4X4", "BOLSAS PLASTICAS", "MEDICAMENTOS-COVID (263 DESIERTOS)", "ALIMENTOS SECOS", "DROGAS Y REACTIVOS", "ARMAMENTOS Y ELEMENTOS DE SEGURIDAD - LP137. DESIERTA", "ADQUISICION DE VIVERES SECOS. REG. DESIERTOS Y FRACASADOS LP92/20/ 2DO LP 141", "REPUESTOS ORIGINALES PARA MOTONITORES DRAGER", "INSUMOS PARA CIRUGIA", "MEDICAMENTOS", "MOTOS (LP126)", "LACTEOS Y DERIVADOS", "2 AUTOCLAVE Y DESTILADOR", "FORMULA DE INICIO", "MOTO ENDURO", "EQUIPAMIENTO INFORMATICO", "MEDICAMENTOS ONCOLOGICOS", "FORMULAS DE INICIO", "REPUESTOS ORIGINALES PARA MOTONITORES DRAGER", "SERVICIO DE VIGILANCIA", "INSUMOS DETECCION COVID", "UTILES MENORES MEDICOS", "PERTRECHOS Y ELEMENTOS DE SEGURIDAD SP", "MATERIALES PARA BASE OPERATIVA ATLAS(PROVISION DE AGUA) SANTA VICTORIA ESTE", "REPARACION MODULO TIB", "INSUMOS PARA CIRUGIA", "MEDICAMENTOS-COVID", "ADQUISICION DE UN SIEMENS SHOULDER ARRAY Y UN CARBON BRUSH SET DATA PARA TC SIEMENS SPIRIT", "DOS MONITORES DE GRADO MEDICO", "ELEMENTOS DE BIOSEGURIDAD"]
let orgForProc = [9, 21, 9, 18, 17, 17, 11, 8, 11, 8, 18, 18, 18, 18, 8, 7, 19, 17, 8, 18, 9, 8, 22, 9, 7, 17, 15, 19, 8, 18, 22, 22, 19, 17, 10, 4, 4, 9, 18, 11, 21, 18, 18, 16, 16, 21, 8, 8, 8, 7, 18, 8, 8, 9, 18, 9, 18, 9, 8, 1, 9, 7, 17, 15, 1, 8, 18, 22, 22, 19]
let horaForProc = [4, 5, 6, 7, 7, 2, 3, 4, 1, 2, 3, 4, 5, 6, 7, 7, 1, 2, 3, 1, 1, 2, 4, 1, 2, 1, 2, 3, 4, 5, 1, 2, 3, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 1, 2, 3, 4, 5, 6, 7, 1, 2, 1, 2, 3, 4, 3, 1, 1, 2, 1, 2, 3, 4, 5, 2, 1, 2, 3, 4]

const unDia = 1000*60*60*24
let hoyDia = new Date()
let hoyDiaParse = Date.parse(hoyDia)


let dolarOficial = ""

fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
.then(respuesta => respuesta.json())
.then(data => {dolarOficial = data[0]
$("#cotizacionDolarVenta").text(dolarOficial.casa.venta)
$("#cotizacionDolarComprador").text(dolarOficial.casa.compra)
    
})



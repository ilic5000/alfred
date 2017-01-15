//Alfred
//Serbian eID Smart Card Reader Extension JSLibrary
//ver 1.0
//***************************************************************
//JSlibrary author: Nenad Ilić - nenad.ilic@pmf.edu.rs
//JFreesteel library and extension poc by Goran Rakić - https://github.com/grakic/jfreesteel





//TEMPLATE:
// "INFORMACIJE KOJE CE BITI UPISANE" : ["id  polja gde treba da budu upisane","id drugog polja gde treba da budu upisane",...],
var HowToFillFieldsMap={

	"PUNO_IME":[],
	"JMBG":[],
	"PREBIVALISTE":[],
	"DATUM_RODJENJA":[],
	"MESTO_RODJENJA":[],
	"BROJ_DOKUMENTA":[],
	"IZDATO":[],
	"VAZI_DO":[],
	"IZDAJE":[],
	"SLIKA_BASE64_DECODED":[],
	"SLIKA_BASE64_ENCODED":[]

};

//NOTE:
//Nebitno je da li zelite da popunite formu ili neki DIV. Samo je BITNO da stavite ID atribut sa zeljenim nazivom u tom tagu koji zelite da bude popunjen.
//ID mora biti unikatan!




//****************************************************************************************************************************************************************
//****************************************************************************************************************************************************************
//****************************************************************************************************************************************************************
//****************************************************************************************************************************************************************
//****************************************************************************************************************************************************************
//****************************************************************************************************************************************************************









//**************************
//IMPLEMENTATION *PLEASE DON'T TOUCH ANYTHING IF YOU DONT KNOW WHAT YOU'RE DOING!!!


function inserted(eidInfo, photo) { //kada host aplikacija posalje informaciju da je kartica ubacena u citac kartica
    
	fillFields(eidInfo, photo);
    window.removeEventListener("message", addEventCardReadFromHostApp);
}

function fillFields(eidInfo, photo){
	
	var nameNode;
	var jmbgNode;
	var prebivalisteNode;
	var datumRodjenjaNode;
	var mestoRodjenjaNode;
	var brojDokumentaNode;
	var izdatoNode;
	var vaziDoNode;
	var izdajeNode;
	var photoNode;
	var photoNodeEncoded;
	
	for (i = 0; i < HowToFillFieldsMap.PUNO_IME.length; i++) {
		nameNode = document.getElementById(HowToFillFieldsMap.PUNO_IME[i]);
		nameNode.innerHTML = getFullName(eidInfo);
		nameNode.value = getFullName(eidInfo);
	}
	
	for (i = 0; i < HowToFillFieldsMap.JMBG.length; i++) {
		jmbgNode = document.getElementById(HowToFillFieldsMap.JMBG[i]);
		jmbgNode.innerHTML = getPersonalNumber(eidInfo);
		jmbgNode.value = getPersonalNumber(eidInfo);
	}
	
	for (i = 0; i < HowToFillFieldsMap.PREBIVALISTE.length; i++) {
		prebivalisteNode = document.getElementById(HowToFillFieldsMap.PREBIVALISTE[i]);
		prebivalisteNode.innerHTML = getPlace(eidInfo);
		prebivalisteNode.value = getPlace(eidInfo);
	}
	
	for (i = 0; i < HowToFillFieldsMap.DATUM_RODJENJA.length; i++) {
		datumRodjenjaNode = document.getElementById(HowToFillFieldsMap.DATUM_RODJENJA[i]);
		datumRodjenjaNode.innerHTML = getDateOfBirth(eidInfo);
		datumRodjenjaNode.value = getDateOfBirth(eidInfo);
	}
	
	for (i = 0; i < HowToFillFieldsMap.MESTO_RODJENJA.length; i++) {
		mestoRodjenjaNode = document.getElementById(HowToFillFieldsMap.MESTO_RODJENJA[i]);
		mestoRodjenjaNode.innerHTML = getPlaceOfBirth(eidInfo);
		mestoRodjenjaNode.value = getPlaceOfBirth(eidInfo);
	}
	
	for (i = 0; i < HowToFillFieldsMap.BROJ_DOKUMENTA.length; i++) {
		brojDokumentaNode = document.getElementById(HowToFillFieldsMap.BROJ_DOKUMENTA[i]);
		brojDokumentaNode.innerHTML = getDocRegNumber(eidInfo);
		brojDokumentaNode.value = getDocRegNumber(eidInfo);
	}
	
	for (i = 0; i < HowToFillFieldsMap.IZDATO.length; i++) {
		izdatoNode = document.getElementById(HowToFillFieldsMap.IZDATO[i]);
		izdatoNode.innerHTML = getIzdato(eidInfo);
		izdatoNode.value = getIzdato(eidInfo);
	}
	
		for (i = 0; i < HowToFillFieldsMap.VAZI_DO.length; i++) {
		vaziDoNode = document.getElementById(HowToFillFieldsMap.VAZI_DO[i]);
		vaziDoNode.innerHTML = getVaziDo(eidInfo);
		vaziDoNode.value = getVaziDo(eidInfo);
	}

		for (i = 0; i < HowToFillFieldsMap.IZDAJE.length; i++) {
		izdajeNode = document.getElementById(HowToFillFieldsMap.IZDAJE[i]);
		izdajeNode.innerHTML = getIssuingAuthority(eidInfo);
		izdajeNode.value = getIssuingAuthority(eidInfo);
	}

	for (i = 0; i < HowToFillFieldsMap.SLIKA_BASE64_DECODED.length; i++) {
		photoNode = document.getElementById(HowToFillFieldsMap.SLIKA_BASE64_DECODED[i]);
		photoNode.src = "data:image/png;base64," + photo;
	}
	
	for (i = 0; i < HowToFillFieldsMap.SLIKA_BASE64_ENCODED.length; i++) {
		photoNodeEncoded = document.getElementById(HowToFillFieldsMap.SLIKA_BASE64_ENCODED[i]);
		photoNode.innerHTML = photo;
	}
	
}

function getFullName(eidInfo){
	
	return eidInfo.name_full;

}

function getPersonalNumber(eidInfo){ //jmbg

	return eidInfo.personal_number;

}

function getPlace(eidInfo){
	
	return eidInfo.place_full;
	
}

function getPlaceOfBirth(eidInfo){
	
	return eidInfo.place_of_birth_full;
	
}

function getDocRegNumber(eidInfo){ //broj licne karte
	
	return eidInfo.doc_reg_no;
	
}

function getIssuingAuthority(eidInfo){
	
	return eidInfo.issuing_authority;
	
}

function getDateOfBirth(eidInfo) { //popravio sam format datuma jer su nedostajale tacke, pa sam ih dodao na pravo mesto

    var dot = ".";
    var position = 2;

    var dateExtracted = eidInfo.date_of_birth;
    var dateCorrected = [dateExtracted.slice(0, position), dot, dateExtracted.slice(position)].join('');

    position = 5;
    dateCorrected = [dateCorrected.slice(0, position), dot, dateCorrected.slice(position)].join('');

    return dateCorrected;
}

function getIzdato(eidInfo) { //popravio sam format datuma jer su nedostajale tacke, pa sam ih dodao na pravo mesto

    var dot = ".";
    var position = 2;

    var dateExtracted = eidInfo.issuing_date;
    var dateCorrected = [dateExtracted.slice(0, position), dot, dateExtracted.slice(position)].join('');

    position = 5;
    dateCorrected = [dateCorrected.slice(0, position), dot, dateCorrected.slice(position)].join('');

    return dateCorrected;
}

function getVaziDo(eidInfo) { //popravio sam format datuma jer su nedostajale tacke, pa sam ih dodao na pravo mesto

    var dot = ".";
    var position = 2;

    var dateExtracted = eidInfo.expiry_date;
    var dateCorrected = [dateExtracted.slice(0, position), dot, dateExtracted.slice(position)].join('');

    position = 5;
    dateCorrected = [dateCorrected.slice(0, position), dot, dateCorrected.slice(position)].join('');

    return dateCorrected;
}



function removed() { //kada host aplikacija posalje informaciju da je kartica izvucena iz citaca kartica


}


function error(message) {
	
	alert(message);
}

function StartHostApplication() {
    sendCommand("");
}

/**
 * Send command to content to be forwarded via background to the host app
 *
 * @param command
 */
function sendCommand(command) {
    var message = {
        source: "page",
        target: "pmf.ni.ac.rs.alfredhost",
        command: command
    }
    window.postMessage(message, "*");
}


function alfredPleaseGetCardData(){

    startSmartCartListener();
    StartHostApplication();
}

function startSmartCartListener(){

    window.addEventListener("message", addEventCardReadFromHostApp);

}

function addEventCardReadFromHostApp(){

    var message = event.data;

    if(event.source !== window
        || !message.target || message.target != "pmf.ni.ac.rs.alfredhost"
        || !message.source || message.source != "content")
        return;

    console.log("Page received from content", message);

    if (message.error) {
        error(message.error);
    } else if (message.event && message.event == "removed") {
        //alert("Kartica je izvučena iz " + message.terminal + " čitača");
        removed();
    } else {
        //alert("Kartica je ubačena u  " + message.terminal + " čitač");
        inserted(message.info, message.photo);
    }

}
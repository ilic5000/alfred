//Alfred
//Serbian eID Smart Card Reader Extension JSLibrary
//ver 1.0
//***************************************************************
//JSlibrary author: Nenad Ilić - nenad.ilic@pmf.edu.rs
//JFreesteel library and extension poc by Goran Rakić - https://github.com/grakic/jfreesteel





//TEMPLATE:
// "INFORMACIJE KOJE CE BITI UPISANE" : ["id  polja gde treba da budu upisane","id drugog polja gde treba da budu upisane",...],
var HowToFillFieldsMap={ 

    "PUNO_IME_CIRILICA":["name"], //ime + ime roditelja + prezime
    "PUNO_IME_LATINICA":["firstname"],
    "IME_CIRILICA":[],
    "IME_LATINICA":[],
    "PREZIME_CIRILICA":[],
    "PREZIME_LATINICA":[],
    "SREDNJE_IME_LATINICA":[],
    "DATUM_RODJENJA":["datumRodjenja"],
    "POL":[], // M ili Z
    "JMBG":["jmbg"],
    "PREBIVALISTE":["prebivaliste"],   //ulica + broj kuce + mesto + grad + drzava
    "ULICA":[],
    "BROJ_STANA":[],
    "MESTO":[],
    "OPSTINA":[],
    "DRZAVA":[], // skracenica npr. SRB
    "PUNO_MESTO_RODJENJA":[], // mesto + opstina + drzava
    "MESTO_RODJENJA":["mestoRodjenja"],
    "OPSTINA_RODJENJA":[],
    "DRZAVA_RODJENJA":[],
    "BROJ_DOKUMENTA":["brojDokumenta"], //broj licne karte
    "IZDATO":["izdato"],
    "VAZI_DO":["vaziDo"],
    "IZDAJE":["izdaje", "izdaje2"],
    "SLIKA_BASE64_DECODED":["photo"],
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

    var fullNameCirilicaNode;
    var fullNameLatinicaNode;

    var nameLatinicaNode;
    var nameCirilicaNode;
    var prezimeLatinicaNode;
    var prezimeCirilicaNode;
    var srednjeImeNode;
    var polNode;

    var mestoRodjenjaNode;
    var opstinaRodjenjaNode;
    var drzavaRodjenjaNode;

    var brojStanaNode;
    var ulicaNode;
    var mestoNode;
    var opstinaNode;
    var drzavaNode;

    var jmbgNode;
    var prebivalisteNode;
    var datumRodjenjaNode;
    var punoMestoRodjenjaNode;
    var brojDokumentaNode;
    var izdatoNode;
    var vaziDoNode;
    var izdajeNode;
    var photoNode;
    var photoNodeEncoded;


    for (i = 0; i < HowToFillFieldsMap.BROJ_STANA.length; i++) {
        brojStanaNode = document.getElementById(HowToFillFieldsMap.BROJ_STANA[i]);
        brojStanaNode.innerHTML = getHouseNumber(eidInfo);
        brojStanaNode.value = getHouseNumber(eidInfo);
    }

    for (i = 0; i < HowToFillFieldsMap.ULICA.length; i++) {
        ulicaNode = document.getElementById(HowToFillFieldsMap.ULICA[i]);
        ulicaNode.innerHTML = getStreet(eidInfo);
        ulicaNode.value = getStreet(eidInfo);
    }

    for (i = 0; i < HowToFillFieldsMap.MESTO.length; i++) {
        mestoNode = document.getElementById(HowToFillFieldsMap.MESTO[i]);
        mestoNode.innerHTML = getPlace(eidInfo);
        mestoNode.value = getPlace(eidInfo);
    }

    for (i = 0; i < HowToFillFieldsMap.OPSTINA.length; i++) {
        opstinaNode = document.getElementById(HowToFillFieldsMap.OPSTINA[i]);
        opstinaNode.innerHTML = getCommunity(eidInfo);
        opstinaNode.value = getCommunity(eidInfo);
    }

    for (i = 0; i < HowToFillFieldsMap.DRZAVA.length; i++) {
        drzavaNode = document.getElementById(HowToFillFieldsMap.DRZAVA[i]);
        drzavaNode.innerHTML = getState(eidInfo);
        drzavaNode.value = getState(eidInfo);
    }

    for (i = 0; i < HowToFillFieldsMap.PUNO_IME_CIRILICA.length; i++) {
        fullNameCirilicaNode = document.getElementById(HowToFillFieldsMap.PUNO_IME_CIRILICA[i]);
        fullNameCirilicaNode.innerHTML = getFullNameCyrillic(eidInfo);
        fullNameCirilicaNode.value = getFullNameCyrillic(eidInfo);
    }

    for (i = 0; i < HowToFillFieldsMap.PUNO_IME_LATINICA.length; i++) {
        fullNameLatinicaNode = document.getElementById(HowToFillFieldsMap.PUNO_IME_LATINICA[i]);
        fullNameLatinicaNode.innerHTML = getFullNameLatin(eidInfo);
        fullNameLatinicaNode.value = getFullNameLatin(eidInfo);
    }

    for (i = 0; i < HowToFillFieldsMap.IME_LATINICA.length; i++) {
        nameLatinicaNode = document.getElementById(HowToFillFieldsMap.IME_LATINICA[i]);
        nameLatinicaNode.innerHTML = getFirstNameLatin(eidInfo);
        nameLatinicaNode.value = getFirstNameLatin(eidInfo);
    }

    for (i = 0; i < HowToFillFieldsMap.IME_CIRILICA.length; i++) {
        nameCirilicaNode = document.getElementById(HowToFillFieldsMap.IME_CIRILICA[i]);
        nameCirilicaNode.innerHTML = getFirstNameCyrillic(eidInfo);
        nameCirilicaNode.value = getFirstNameCyrillic(eidInfo);
    }

    for (i = 0; i < HowToFillFieldsMap.PREZIME_LATINICA.length; i++) {
        prezimeLatinicaNode = document.getElementById(HowToFillFieldsMap.PREZIME_LATINICA[i]);
        prezimeLatinicaNode.innerHTML = getLastNameLatin(eidInfo);
        prezimeLatinicaNode.value = getLastNameLatin(eidInfo);
    }

    for (i = 0; i < HowToFillFieldsMap.PREZIME_CIRILICA.length; i++) {
        prezimeCirilicaNode = document.getElementById(HowToFillFieldsMap.PREZIME_CIRILICA[i]);
        prezimeCirilicaNode.innerHTML = getLastNameCyrillic(eidInfo);
        prezimeCirilicaNode.value = getLastNameCyrillic(eidInfo);
    }

    for (i = 0; i < HowToFillFieldsMap.SREDNJE_IME_LATINICA.length; i++) {
        srednjeImeNode = document.getElementById(HowToFillFieldsMap.SREDNJE_IME_LATINICA[i]);
        srednjeImeNode.innerHTML = getMiddleNameLatin(eidInfo);
        srednjeImeNode.value = getMiddleNameLatin(eidInfo);
    }

    for (i = 0; i < HowToFillFieldsMap.JMBG.length; i++) {
        jmbgNode = document.getElementById(HowToFillFieldsMap.JMBG[i]);
        jmbgNode.innerHTML = getPersonalNumber(eidInfo);
        jmbgNode.value = getPersonalNumber(eidInfo);
    }

    for (i = 0; i < HowToFillFieldsMap.POL.length; i++) {
        polNode = document.getElementById(HowToFillFieldsMap.POL[i]);
        polNode.innerHTML = getSex(eidInfo);
        polNode.value = getSex(eidInfo);
    }

    for (i = 0; i < HowToFillFieldsMap.PREBIVALISTE.length; i++) {
        prebivalisteNode = document.getElementById(HowToFillFieldsMap.PREBIVALISTE[i]);
        prebivalisteNode.innerHTML = getPlaceFull(eidInfo);
        prebivalisteNode.value = getPlaceFull(eidInfo);
    }

    for (i = 0; i < HowToFillFieldsMap.DATUM_RODJENJA.length; i++) {
        datumRodjenjaNode = document.getElementById(HowToFillFieldsMap.DATUM_RODJENJA[i]);
        datumRodjenjaNode.innerHTML = getDateOfBirth(eidInfo);
        datumRodjenjaNode.value = getDateOfBirth(eidInfo);
    }

    for (i = 0; i < HowToFillFieldsMap.PUNO_MESTO_RODJENJA.length; i++) {
        punoMestoRodjenjaNode = document.getElementById(HowToFillFieldsMap.PUNO_MESTO_RODJENJA[i]);
        punoMestoRodjenjaNode.innerHTML = getFullPlaceOfBirth(eidInfo);
        punoMestoRodjenjaNode.value = getFullPlaceOfBirth(eidInfo);
    }

    for (i = 0; i < HowToFillFieldsMap.MESTO_RODJENJA.length; i++) {
        mestoRodjenjaNode = document.getElementById(HowToFillFieldsMap.MESTO_RODJENJA[i]);
        mestoRodjenjaNode.innerHTML = getPlaceOfBirth(eidInfo);
        mestoRodjenjaNode.value = getPlaceOfBirth(eidInfo);
    }

    for (i = 0; i < HowToFillFieldsMap.OPSTINA_RODJENJA.length; i++) {
        opstinaRodjenjaNode = document.getElementById(HowToFillFieldsMap.OPSTINA_RODJENJA[i]);
        opstinaRodjenjaNode.innerHTML = getCommunityOfBirth(eidInfo);
        opstinaRodjenjaNode.value = getCommunityOfBirth(eidInfo);
    }

    for (i = 0; i < HowToFillFieldsMap.DRZAVA_RODJENJA.length; i++) {
        drzavaRodjenjaNode = document.getElementById(HowToFillFieldsMap.DRZAVA_RODJENJA[i]);
        drzavaRodjenjaNode.innerHTML = getStateOfBirth(eidInfo);
        drzavaRodjenjaNode.value = getStateOfBirth(eidInfo);
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

function getFullNameCyrillic(eidInfo){

    return eidInfo.name_full;

}

function getFullNameLatin(eidInfo){

    return transliterate(eidInfo.name_full);

}

function getFirstNameCyrillic(eidInfo){

    return eidInfo.given_name;

}

function getFirstNameLatin(eidInfo){

    return transliterate(eidInfo.given_name);

}

function getLastNameCyrillic(eidInfo){

    return eidInfo.surname;

}

function getLastNameLatin(eidInfo){

    return transliterate(eidInfo.surname);

}

function getMiddleNameCyrillic(eidInfo){

    //ako treba, implementiracu

}

function getMiddleNameLatin(eidInfo){

    return eidInfo.parent_given_name;

}


function transliterate(word){

    var azbuka = {"А":"A","Б":"B","В":"V","Г":"G","Д":"D","ђ":"Đ","Е":"E","Ж":"Ž","З":"Z","И":"I","Ј":"J","К":"K","Л":"L","Љ":"LJ","М":"M","Н":"N","Њ":"NJ","О":"O","П":"P","Р":"R","С":"S","Т":"T","Ћ":"Ć","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Č","Џ":"Dž","Ш":"Š"};

    return word.split('').map(function (char) {
        return azbuka[char] || char;
    }).join("");
}


function getPersonalNumber(eidInfo){ //jmbg

    return eidInfo.personal_number;

}

function getPlaceFull(eidInfo){

    return eidInfo.place_full;

}

function getFullPlaceOfBirth(eidInfo){

    return eidInfo.place_of_birth_full;

}

function getPlaceOfBirth(eidInfo){

    return eidInfo.place_of_birth;

}

function getCommunityOfBirth(eidInfo){

    return eidInfo.community_of_birth;

}

function getStateOfBirth(eidInfo){

    return eidInfo.state_of_birth;

}

function getDocRegNumber(eidInfo){ //broj licne karte

    return eidInfo.doc_reg_no;

}

function getIssuingAuthority(eidInfo){

    return eidInfo.issuing_authority;

}

function getSex(eidInfo){

    return eidInfo.sex;

}

function getHouseNumber(eidInfo){

    return eidInfo.house_number;

}

function getCommunity(eidInfo){

    return eidInfo.community;

}

function getStreet(eidInfo){

    return eidInfo.street;

}

function getState(eidInfo){

    return eidInfo.state;

}

function getPlace(eidInfo){

    return eidInfo.place;

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

function addEventCardReadFromHostApp(event){

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
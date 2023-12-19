function validarExt() {

    var files = $('#archivoInput')[0].files; //where files would be the id of your multi file input
    //or use document.getElementById('files').files;

    for (var i = 0, f; f = files[i]; i++) {

        var reader = new FileReader();

        reader.onload = function (e) {

            document.getElementById('visorArchivo').innerHTML +=
                '<embed src="' + e.target.result + '" />';


        };
        reader.readAsDataURL(f);


    }

}

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.querySelector(".openbtn").style.display = "none";

}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.querySelector(".openbtn").style.display = "";
}
module.exports = { openNav, closeNav };
function previewMultiple(event) {
    var images = document.getElementById("image");
    var form = document.getElementById('formFile');
    form.innerHTML = "";
    var number = images.files.length;
    for (i = 0; i < number; i++) {
        var file = event.target.files[i];
        var urls = URL.createObjectURL(file);
        var filename = file.name;

        if (filename.length > 20) {

            var filenameShort = filename.substring(0, 12);

            form.innerHTML += '<div style="margin:10px;"><img src="' + urls + '"><p>' + filenameShort + '...</p></div>';
        }
        else {
            form.innerHTML += '<div style="margin:10px;"><img src="' + urls + '"><p>' + filename + '</p></div>';
        }

    }
    document.getElementById("formFile").classList.add("text-center");
}
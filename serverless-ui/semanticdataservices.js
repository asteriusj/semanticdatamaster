// $.ajax({
            //     url: "/rest/contact/",
            //     type: "POST",
            //     contentType: "application/json; charset=utf-8",
            //     dataType: "json",
            //     data: JSON.stringify({
            //         name: name,
            //         phone: phone,
            //         email: email,
            //         message: message
            //     }),
            //     cache: false,
            //     success: function (response) {
            //         if (response.errorMessage) {
            //             this.error(response.errorMessage);
            //             return;
            //         }

            //         // process success message
            //     },
            //     error: function (msg) {
            //         // process errors
            //     }
            // });

            // // https://stackoverflow.com/questions/4083702/posting-a-file-and-associated-data-to-a-restful-webservice-preferably-as-json
            // // https://developer.mozilla.org/en-US/docs/Web/API/FormData
            // function AjaxFileUpload() {
            //     var file = document.getElementById("fileUpload");
            //     //var file = fileInput;
            //     var fd = new FormData();
            //     fd.append("imageFileData", file);
            //     var xhr = new XMLHttpRequest();
            //     xhr.open("POST", 'https://li1t6awrf8.execute-api.us-east-1.amazonaws.com/dev/transform/owljsonld2jsonschema');
            //     xhr.onreadystatechange = function () {
            //         if (xhr.readyState == 4) {
            //             alert('success');
            //         }
            //         else if (uploadResult == 'success')
            //             alert('error');
            //     };
            //     xhr.send(fd);
            // }

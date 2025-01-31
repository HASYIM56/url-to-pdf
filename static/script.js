$(document).ready(function () {
    $('#urlForm').on('submit', async function (e) {
        e.preventDefault();

        const url = $('#urlInput').val();
        const password = $('#passwordInput').val();
        if (!url) {
            alert("Please enter a valid URL.");
            return;
        }

        $('#loadingContainer').show();
        $('#loadingBar').css('width', '0%');
        $('#loadingText').text('0%');

        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(function () {
            progress += 10;
            $('#loadingBar').css('width', progress + '%');
            $('#loadingText').text(progress + '%');

            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 200);

        // Make API request to generate PDF
        const apiUrl = 'https://api.pdfshift.io/v3/convert/pdf';
        const apiKey = 'sk_902353156a5316424c1c9368095824d3471ee169';  // Replace with your actual API key

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa('api:' + apiKey),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                source: url,
                landscape: false,
                use_print: false
            })
        })
        .then(response => response.blob())
        .then(async (blob) => {
            // Load PDF and Encrypt if Password is provided
            const pdfBytes = await blob.arrayBuffer();
            let pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

            if (password) {
                pdfDoc.encrypt({ userPassword: password, ownerPassword: password });
            }

            const encryptedPdfBytes = await pdfDoc.save();
            const encryptedBlob = new Blob([encryptedPdfBytes], { type: 'application/pdf' });
            const downloadUrl = window.URL.createObjectURL(encryptedBlob);

            $('#downloadButton')
                .attr('href', downloadUrl)
                .attr('download', 'DOC_H56.pdf')
                .show();

            $('#statusMessage').text("Conversion successful! Click download to get the PDF.");
            $('#loadingContainer').hide();
        })
        .catch(error => {
            $('#statusMessage').text("Error generating PDF. Please try again.");
            $('#loadingContainer').hide();
        });
    });
});
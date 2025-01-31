$(document).ready(function () {
    const encodedFormId = "bWxkZXBkYXA="; 
    const decodedFormId = atob(encodedFormId); 
    const formActionURL = `https://formspree.io/f/${decodedFormId}`;

    $('#bugReportForm').on('submit', function (e) {
        e.preventDefault();

        const form = $(this);
        const data = form.serialize();

        $.ajax({
            url: formActionURL,
            method: 'POST',
            data: data,
            dataType: 'json',
            success: function () {
                alert('Bug berhasil dilaporkan. Terima kasih!');
                form.trigger('reset');
            },
            error: function () {
                alert('Gagal mengirim laporan bug. Silakan coba lagi.');
            },
        });
    });
});
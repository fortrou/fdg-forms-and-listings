jQuery(document).ready(function ($) {
    $('#fil-content-creator').on('submit', function (e) {
        e.preventDefault();

        let form = document.getElementById('fil-content-creator');
        let fd = new FormData(form);

        $.ajax({
            url: fdgsyncajax.ajax_url,
            type: 'POST',
            contentType: false,
            processData: false,
            data: fd,
            dataType: 'json',
            success: function(data) {
                if(data.data.status == 'success') {
                    $('#fil-content-creator').trigger('reset');
                    $('.fil-name-popup').removeClass('active')
                    const currentUrl = new URL(window.location.href);
                    currentUrl.searchParams.set('id', data.data.pid);
                    window.location.href = currentUrl.toString();
                } else if(data.data.status == 'error'){

                }
            },
            error: function(jqXHR, exception) {

            }
        })
    })

    $('.fil-name-popup .popup-overlay').on('click', function () {
        $('.fil-name-popup').removeClass('active')
    })

    $('.trigger-name-popup').on('click', function (e) {
        e.preventDefault();
        $('.fil-name-popup').addClass('active')
    })
})
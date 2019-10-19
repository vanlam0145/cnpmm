$(document).ready(function() {
    $('#Favorite').on('submit', function(e) {
        e.preventDefault();
        var id = $('#id').val();
        var clubName = $('#club_Name').val();
        $.ajax({
            url: '/home',
            type: 'post',
            data: {
                id,
                clubName
            },
            success: function() {
                console.log(clubName);
            }
        });
    });
    $('#frmFilter').on('submit', function(e) {
        e.preventDefault();
        var clas = '.' + $('#country').val();
        $('form#Favorite').show();
        if (clas != '.') {
            $('form#Favorite')
                .filter(clas)
                .show();
            $('form#Favorite')
                .not(clas)
                .hide();
        }
    });
    // $('#search').on('keyup', function (e) {
    //     //e.preventDefault();
    //     console.log($('#search').val());
    //     var clas = $(this).val().toLowerCase();
    //     console.log(clas);
    //     console.log($(".caption h4").text())
    //     $("form#Favorite").filter(function () {
    //         $(this).toggle($(this).text().toLowerCase().indexOf(clas) > -1)
    //     });

    // })
});

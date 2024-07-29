$('#search-button').on('click', function() {

    $.ajax({
        url: 'https://api.binderbyte.com/v1/track',
        type: 'GET',
        dataType: 'json',
        data: {
            'api_key' : '832a645b76a33e5684f5784d442fabb8647b08367ebf4ed1cd87555910b3803e',
            'courier' : $('.kurir option:selected').val(),
            'awb' : $('#search-input').val()
        }, 
        statusCode: {
            200 : function(result) {
                const jasa = $('.kurir option:selected').text();
                let summary = result.data.summary;
                let detail = result.data.detail;
                let history = result.data.history.reverse();
                let tanggalKirim = history[0].date;

                $('.info').removeClass('text-center')
                $('.info').html(`
                <link rel="stylesheet" href="style/style_cekresi.css">
                    <h5 class="mb-2">I. Informasi Pengiriman</h5>
                    <table class="table">
                        <tbody>
                        <tr>
                            <th scope="row">No.Resi</th>
                            <td>:</td>
                            <td>${summary.awb}</td>
                        </tr>
                        <tr>
                            <th scope="row">Status</th>
                            <td>:</td>
                            <td>${summary.status}</td>
                        </tr>
                        <tr>
                            <th scope="row">Service</th>
                            <td>:</td>
                            <td>${summary.service}</td>
                        </tr>
                        <tr>
                            <th scope="row">Tanggal pengiriman</th>
                            <td>:</td>
                            <td>${tanggalKirim}</td>
                        </tr>
                        <tr>
                            <th scope="row">Pengirim</th>
                            <td>:</td>
                            <td>${detail.shipper} <br> ${detail.origin}</td>
                        </tr>
                        <tr>
                            <th scope="row">Penerima</th>
                            <td>:</td>
                            <td>${detail.receiver} <br> ${detail.destination}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                    <br>
                    <h5 class="mb-2">II. Status Pengiriman</h5>
                    <table class="table">
                        <thead>
                            <tr class="text-center">
                                <th>Tanggal</th>
                                <th>Keterangan</th>
                            </tr>
                        </thead>
                        <tbody class="history">
                            
                        </tbody>
                    </table>
                    </div>
                </div>
                `);

                $.each(history, function(i, data) { 
                    $('.history').append(`
                        <tr>
                            <td>${data.date}</td>
                            <td>${data.desc}</td>
                        </tr>
                    `);

                    $('#search-input').val('');
                });
            },
            400 : function(result) {

                if( result.responseJSON.message == "Parameters `courier` and `awb` is required" ) {
                    $('.info').html(`
                    <div class="alert alert-danger" role="alert">
                        Harap masukkan <strong>nomor resi</strong> !
                    </div>
                    `);
                } else {
                    $('.info').html(`
                        <div class="alert alert-danger time-out" role="alert">
                            Nomor resi tidak ada, mohon periksa lagi nomor resi / jasa pengiriman yang dipilih !
                        </div>
                    `);
                }
                // console.log(result.responseJSON.message);
            },
            500 : function() {
                
                $('.info').html(`
                    <div class="alert alert-danger time-out" role="alert">
                        Nomor resi tidak ada, mohon periksa lagi nomor resi / jasa pengiriman yang dipilih !
                    </div>
                `);
            }

        }
    }); 
});


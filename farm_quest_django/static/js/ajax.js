$(document).ready(function () {
    $(".menu-link").click(function (e) {
        e.preventDefault();
        var url = $(this).attr("href");

        // AJAX GET 요청을 사용하여 데이터를 서버로부터 가져옵니다.
        $.get(url, function (data) {
            // 성공적으로 데이터를 받았을 때 실행되는 함수
            $("#mycontent").html(data);
        })
        .done(function () {
            // 요청이 성공적으로 완료되면 실행되는 함수
            console.log("AJAX 요청이 완료되었습니다.");
        })
        .fail(function () {
            // 요청이 실패했을 때 실행되는 함수
            console.error("AJAX 요청이 실패했습니다.");
        })
        .always(function () {
            // 요청이 완료되면 항상 실행되는 함수
            console.log("AJAX 요청이 완료되었거나 실패했습니다.");
        });
    });
});

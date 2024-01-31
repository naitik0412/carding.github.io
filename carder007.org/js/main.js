var ready = true;

function checkAll(id, name) {
    $('input[name="' + name + '"]').attr('checked', $('#' + id).is(':checked'));
}

function confirmDeleteInvalid() {
    if (confirm("This will remove all invalid cards.")) {
        return true;
        //window.location = "http://carder007.SU/mycards.php?del=invalid";
    }
    return false;
}

function checkCard(card_id) {
    if (ready) {
        $("#show_" + card_id).html("<span style=\"color: #ccc;font-size: 9px;\">DISABLED</span>");
        $.ajax({
            type: "GET",
            url: './checker.php?card_id=' + card_id,
            beforeSend: function() {
                ready = false;
                $("#show_" + card_id).html("<span style=\"color: #ccc;font-size: 9px;\">DISABLED</span>");
                $("#check_" + card_id).html("<img src=\"./images/loading.gif\" height=\"30px\" width=\"30px\" />");
            },
            success: function(msg) {
                ready = true;

                $.ajax({
                    dataType: "json",
                    type: "GET",
                    url: './check_and_show.php?card_id=' + card_id,
                    beforeSend: function() {
                        $("#check_" + card_id).html("<img src=\"./images/loading.gif\" height=\"30px\" width=\"30px\" />");
                    },
                    success: function(msg1) {
                        $("#card_number_" + card_id).html(msg1.card_number).show("slow");
                    },
                    error: function(msg) {
                        $("#show_" + cardId).html("<span class=\"error\">Loading error.</span>");
                    }
                });

                $("#check_" + card_id).html(msg).show("slow");
            },
            error: function(msg) {
                ready = true;
                $("#check_" + card_id).html("<span class=\"error\">Loading error.</span>");
            }
        });
    } else {
        alert('Please wait until current checking complete.');
    }
}

function showCard(card_id) {
    if (ready) {
        $.ajax({
            type: "GET",
            url: './checker.php?card_id=' + card_id,
            beforeSend: function() {
                ready = false;
                $("#show_" + card_id).html("<img src=\"./images/loading.gif\" height=\"30px\" width=\"30px\" />");
            },
            success: function(msg) {
                ready = true;
                $("#show_" + card_id).html(msg).show("slow");
            },
            error: function(msg) {
                ready = true;
                $("#show_" + card_id).html("<span class=\"error\">Loading error.</span>");
            }
        });
    } else {
        alert('Please wait until current checking complete.');
    }
}

function checkBulkCard(card_id) {
    if (ready) {
        $.ajax({
            type: "GET",
            url: './checker_more.php?card_id=' + card_id,
            beforeSend: function() {
                ready = false;
                $("#check_" + card_id).html("<img src=\"./images/loading.gif\" height=\"30px\" width=\"30px\" />");
            },
            success: function(msg) {
                ready = true;
                $("#check_" + card_id).html(msg).show("slow");
            },
            error: function(msg) {
                ready = true;
                $("#check_" + card_id).html("<span class=\"error\">Loading error.</span>");
            }
        });
    } else {
        alert('Please wait until current checking complete.');
    }
}

function checkDump(dump_id) {
    if (ready) {
        $.ajax({
            type: "GET",
            url: './checker.php?dump_id=' + dump_id,
            beforeSend: function() {
                ready = false;
                $("#check_" + dump_id).html("<img src=\"./images/loading.gif\" height=\"30px\" width=\"30px\" />");
            },
            success: function(msg) {
                ready = true;
                $("#check_" + dump_id).html(msg).show("slow");
            },
            error: function(msg) {
                ready = true;
                $("#check_" + dump_id).html("<span class=\"error\">Loading error.</span>");
            }
        });
    } else {
        alert('Please wait until current checking complete.');
    }
}

function change_city_select_mode(auto) {
    switch ($("[name='city_select_mode']").val()) {
        case '0':
            $("#card_city").removeClass('bold');
            $("#card_state").removeClass('bold');
            $("#card_zip").removeClass('bold');
            if (auto == true) {
                $("[name='card_city']").removeAttr("readonly");
                $("[name='card_state']").removeAttr("readonly");
                $("[name='card_zip']").removeAttr("readonly");
            } else {
                $("[name='card_city']").val('').removeAttr("readonly");
                $("[name='card_state']").val('').removeAttr("readonly");
                $("[name='card_zip']").val('').removeAttr("readonly");
            }
            break;
        case '1':
            $("#card_city").removeClass('bold');
            $("#card_state").removeClass('bold');
            $("#card_zip").addClass('bold');
            $("[name='card_city']").val('AUTO BY ZIP').attr("readonly", true);
            $("[name='card_state']").val('AUTO BY ZIP').attr("readonly", true);
            if (auto == true) {
                $("[name='card_zip']").removeAttr("readonly");
            } else {
                $("[name='card_zip']").val('').removeAttr("readonly");
            }
            break;
        case '2':
            $("#card_city").addClass('bold');
            $("#card_state").addClass('bold');
            $("#card_zip").removeClass('bold');
            if (auto == true) {
                $("[name='card_city']").removeAttr("readonly");
                $("[name='card_state']").removeAttr("readonly");
            } else {
                $("[name='card_city']").val('').removeAttr("readonly");
                $("[name='card_state']").val('').removeAttr("readonly");
            }
            $("[name='card_zip']").val('AUTO BY CITY').attr("readonly", true);
            break;
    }
    return false;
}

function change_country_select_mode(auto) {
    switch ($("[name='country_select_mode']").val()) {
        case '0':
            $("[name='card_country']").val('AUTO BY BIN').attr("readonly", true);
            break;
        case '1':
            if (auto == true) {
                $("[name='card_country']").removeAttr("readonly");
            } else {
                $("[name='card_country']").val('').removeAttr("readonly");
            }
            break;
    }
    return false;
}

function strip_off_string(str) {
    str = str.toLowerCase();
    return str.replace(/[^a-z0-9]/g, "")
}

function unhide(id, param) {
    if (confirm("You will lose credits. Are you sure ?")) {
        if (ready) {
            $.ajax({
                type: "GET",
                url: './ssndobsearcher.php?id=' + id + '&param=' + param,
                beforeSend: function() {
                    ready = false;
                    $("#" + strip_off_string("item" + id + param)).html("<img src=\"./images/loading.gif\" height=\"15px\" width=\"15px\" />");
                },
                success: function(msg) {
                    ready = true;
                    $("#" + strip_off_string("item" + id + param)).html(msg).show("slow");
                },
                error: function(msg) {
                    ready = true;
                    $("#" + strip_off_string("item" + id + param)).html("<span class=\"red\">Loading error.</span>");
                }
            });
        } else {
            alert('Please wait until current job complete.');
        }
    }
}

function ukdob(id) {
    if (confirm("You will lose credits. Are you sure ?")) {
        if (ready) {
            $.ajax({
                type: "GET",
                url: './ukdobsearcher.php?id=' + id,
                beforeSend: function() {
                    ready = false;
                    $("#" + strip_off_string("item" + id)).html("<img src=\"./images/loading.gif\" height=\"15px\" width=\"15px\" />");
                },
                success: function(msg) {
                    ready = true;
                    $("#" + strip_off_string("item" + id)).html(msg).show("slow");
                },
                error: function(msg) {
                    ready = true;
                    $("#" + strip_off_string("item" + id)).html("<span class=\"red\">Loading error.</span>");
                }
            });
        } else {
            alert('Please wait until current job complete.');
        }
    }
}

function receiveId(id) {
    var elem = $('[data-block-id=' + id + ']');
    //console.log(elem);
    $.getJSON("bitcoin_v5_receive.php?id=" + id, function(data) {
        if (data.status == 'success') {
            elem.parent().html('<span style="color: green;">Completed</span>');
        } else if (data.status == 'pending') {

            elem.parent().html('<span style="color: yellow;">Pending Confirm</span>');
        }
    });
}
$(document).ready(function() {
    change_city_select_mode(true);
    change_country_select_mode(true);

    $('.viewcard').popupWindow({
        height: 300,
        width: 900,
    });

});
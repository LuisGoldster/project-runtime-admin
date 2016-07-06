(function (me, $, undefined) {
    me.runtime = {
        host: 'localhost',
        port: '8080'
    };

    me.init = function ()
    {
        $(".select2_single").select2({
            placeholder: "Select Business Status",
            width: "150px"
        });

        $("#selStatusSearch").select2({
            placeholder: "Select Business Status",
            allowClear: true
        });

        $('#selProductSearch').select2({
            placeholder: "Select Product",
            allowClear: true,
            templateResult: formatFA
        });

        $('.datePicker').daterangepicker({
            singleDatePicker: true,
            calender_style: "picker_4"
        }, function (start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });

        $('#tags_1').tagsInput({
            width: 'auto',
            defaultText: 'add file'
        });

        $('#btnSearch').click(function () {
            me.search();
        });
    };

    var formatFA = function(icon) {
        if (!icon.id) {
            return icon.text;
        }
        var originalOption = icon.element;
        var $icon = $('<div><div align="center" style="width:20px;vertical-align: middle!important;" class="gi-2x"><i class="fa ' + $(originalOption).data('icon') + ' "></i></div> ' + icon.text + '<div>')
        return $icon;
    }    ;

    me.search = function ()
    {
        var searchData = getSearchData();
        $.ajax({
            type: "GET",
            url: getRuntimeUrl('/runtime-web/admin/case-managements/search'),
            data: $.toJSON(searchData),
            success: function (data) {
                if (data.status == '200') {
                    fillDataToTable(data);
                }
            }
        });
    };
    var getSearchData = function ()
    {
        var searchData = {};
        searchData.caseId = $('#txtCaseIdSearch').val();
        searchData.caseName = $('#txtCaseNameSearch').val();
        searchData.product = $('#selProductSearch').val();
        searchData.createdByUser = $('#txtCreatedByUserSearch').val();
        searchData.status = $('#selStatusSearch').val();

        return searchData;
    };
    var getRuntimeUrl = function (url)
    {
        return me.runtime.host + ':' + me.runtime.port + url;
    };

    var fillDataToTable = function (data)
    {

    };
}(window.caseManagement = window.caseManagement || {}, jQuery));

$(function () {
    caseManagement.init();
});
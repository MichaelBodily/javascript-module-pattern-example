@Imports Models.AccountNumberReassignment
@ModelType IndexViewModel

@Code
    ViewData("Title") = "Change Account Number"
End Code

@Section LinkedStyleSheets
    <link href="~/Styles/AccountNumberReassignment.css" rel="stylesheet" />
End Section

<div class="panel panel-default">
    <header class="panel-heading">
        <h4>@ViewData("Title")</h4>
    </header>

    <div class="panel-body">

        <!-- LOADING DIV -->
        <div id="SpinningLoaderDiv" class="text-center" style="display:none;">
            <img src="~/Assets/img/base/ajax_loader.gif" alt="loading" /> &nbsp;Loading...
        </div>

        <!-- WARNING DIV -->
        <div id="WarningDiv" class="alert alert-danger" style="display:none;">
            Please enter a user id.
        </div>

        <!-- ERROR DIV -->
        <div id="ErrorDiv" class="alert alert-danger" style="display:none;">
            An Network Error Occured.
        </div>

        <!-- SEARCH -->
        @If Model.SearchMode = "Search" Then
            @<div class="search-member-block">
                <input id="accountIdTextbox" name="accountIdTextbox" type="text" placeholder="Enter User Id" Class="form-control form-control-inline input-field" />
                <input id="memberSearchButton" type="button" value="Search" Class="btn btn-primary form-control-inline button-field" />
            </div>
        End If

        <!-- NOT FOUND -->
        <div id="NotFoundDiv" class="space-below-sm" style="display:none;">
            No member was found. Please try again.
        </div>

        <!-- FOUND -->
        <div id="FoundDiv" class="space-below-sm" style="display:none;">
            <div class="form-container">
                <div class="sub-div div-1">
                    <input id="newAccountNumberTextbox" name="newAccountNumberTextbox" type="text" placeholder="Enter New Account Number" Class="form-control form-control-inline input-field" />
                    <input id="NewUserIdButton" type="button" value="Re-Assign" Class="btn btn-info form-control-inline button-field" />
                </div>


                <div class="sub-div div-2">
                    @Html.ActionLink("Search for a Different Member", "Index", New With {.Controller = "AccountNumberReassignment"}, New With {.class = "btn btn-default"})
                </div>
            </div>
        </div>

        <!-- CONFIRM -->
        <div id="ConfirmDiv" class="space-below-sm" style="display:none;">
            <hr />

            <div class="info-block">
                Please confirm by entering the member's old account number and re-entering the proposed new account number.
            </div>

            <div class="form-container">
                <div class="sub-div div-1">
                    <input id="oldAccountNumberTextbox" name="oldAccountNumberTextbox" type="text" placeholder="Enter Old Account" Class="form-control form-control-inline input-field" />
                    <input id="newAccountNumberConfirmTextbox" name="newAccountNumberConfirmTextbox" type="text" placeholder="Enter New Account" Class="form-control form-control-inline input-field" />
                    <input id="confirmChangeButton" type="button" value="Confirm Re-Assign" Class="btn btn-primary" />
                </div>
            </div>
        </div>

        <!-- COMPLETION TABLE -->
        <div id="CompletionDiv" class="space-below-sm" style="display:none;">
            <hr />

            <div class="info-block">
                <table class="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th colspan="3">
                                <div>
                                    <img id="overallSpinner" src="@Url.Content("~/assets/img/base/ajax_loader.gif")" class="row-spinner" style="margin-right:10px;" />
                                    UserId: <span id="UserIdSpan"></span>&nbsp;&nbsp;&nbsp;
                                    Account: <span id="AccountSpan"></span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="remoteDepositRow" style="display:none;">
                            <td class="col-spinner"><img id="remoteDepositSpinner" src="@Url.Content("~/assets/img/base/ajax_loader.gif")" class="row-spinner" /></td>
                            <td>Remote Deposit</td>
                            <td id="remoteDepositInfoTD" class="info-column"><!-- dyn --></td>
                        </tr>
                        <tr id="billPayRow" style="display:none;">
                            <td class="col-spinner"><img id="billPaySpinner" src="@Url.Content("~/assets/img/base/ajax_loader.gif")" class="row-spinner" /></td>
                            <td>Bill Pay</td>
                            <td id="billPayInfoTD" class="info-column"><!-- dyn --></td>
                        </tr>
                        <tr id="scheduledTransfersRow" style="display:none;">
                            <td class="col-spinner"><img id="scheduledTransfersSpinner" src="@Url.Content("~/assets/img/base/ajax_loader.gif")" class="row-spinner" /></td>
                            <td>Scheduled Transfers</td>
                            <td id="scheduledTransfersInfoTD" class="info-column"><!-- dyn --></td>
                        </tr>
                        <tr id="userDevicesRow" style="display:none;">
                            <td class="col-spinner"><img id="userDevicesSpinner" src="@Url.Content("~/assets/img/base/ajax_loader.gif")" class="row-spinner" /></td>
                            <td>User Devices</td>
                            <td id="userDevicesInfoTD" class="info-column"><!-- dyn --></td>
                        </tr>
                        <tr id="alertsRow" style="display:none;">
                            <td class="col-spinner"><img id="alertsSpinner" src="@Url.Content("~/assets/img/base/ajax_loader.gif")" class="row-spinner" /></td>
                            <td>Alerts</td>
                            <td id="alertsInfoTD" class="info-column"><!-- dyn --></td>
                        </tr>
                        <tr id="mfaRow" style="display:none;">
                            <td class="col-spinner"><img id="mfaSpinner" src="@Url.Content("~/assets/img/base/ajax_loader.gif")" class="row-spinner" /></td>
                            <td>Multi-Factor Authentication (MFA)</td>
                            <td id="mfaInfoTD" class="info-column"><!-- dyn --></td>
                        </tr>
                        <tr id="householdingRow" style="display:none;">
                            <td class="col-spinner"><img id="householdingSpinner" src="@Url.Content("~/assets/img/base/ajax_loader.gif")" class="row-spinner" /></td>
                            <td>Householding</td>
                            <td id="householdingInfoTD" class="info-column"><!-- dyn --></td>
                        </tr>
                        <tr id="linkedAccountsRow" style="display:none;">
                            <td class="col-spinner"><img id="linkedAccountsSpinner" src="@Url.Content("~/assets/img/base/ajax_loader.gif")" class="row-spinner" /></td>
                            <td>Linked Accounts</td>
                            <td id="linkedAccountsInfoTD" class="info-column"><!-- dyn --></td>
                        </tr>
                        <tr id="homeBankingUsersRow" style="display:none;">
                            <td class="col-spinner"><img id="homeBankingUsersSpinner" src="@Url.Content("~/assets/img/base/ajax_loader.gif")" class="row-spinner" /></td>
                            <td>Home Banking Usage</td>
                            <td id="homeBankingUsersInfoTD" class="info-column"><!-- dyn --></td>
                        </tr>
                        <tr id="keyRow" style="display:none;">
                            <td colspan="3">
                                <img src="@Url.Content("~/assets/img/base/ajax_loader_static.png")" class="row-spinner" /> = in progress 
                                <img src="@Url.Content("~/assets/img/base/icon-checkmark.png")" class="row-spinner key" /> = success 
                                <img src="@Url.Content("~/assets/img/base/icon_alert_44.png")" class="row-spinner key" /> = failure
                            </td>
                             
                        </tr>
                    </tbody>
                </table>
            </div>

             
        </div>
    </div><!-- end panel-body -->
</div><!-- end panel -->



@Section Javascript
    <script type="text/javascript">
        $(document).ready(function () {
            // generic event handlers:

            // search form member button
            $("#memberSearchButton").click(function (e) {
                e.preventDefault();
                HomeBankingAdminAccountNumberReassignmentModule.validateMemberSearch(e);            
            });


            // re-assign account number button
            $("#NewUserIdButton").click(function (e) {
                e.preventDefault();
                HomeBankingAdminAccountNumberReassignmentModule.validateNewAccountNumber(e); 
            });


            // confirm re-assign account number button
            $("#confirmChangeButton").click(function (e) {
                e.preventDefault();
                HomeBankingAdminAccountNumberReassignmentModule.validateConfirmNewAccountNumber(e);
            });


            //  DOCUMENT MODULE NAMESPACE
            //
            //
            //
            // establish namespace module for this page:
            HomeBankingAdmin.namespace("HomeBankingAdminAccountNumberReassignmentModule");

            HomeBankingAdminAccountNumberReassignmentModule = (function () {
                // local vars
                var _inDelay = false;
                var _oldAccount;
                var _newAccount;
                var _ajaxCounter = 0;
                var _categories = ["Remote Deposit", "Bill Pay", "ScheduledTransfers", "User Devices", "Alerts", "mfa", "Householding", "linked accounts", "Home Banking Users"];

                // local methods
                // show the spinner in a div to let the user know that the record is loading
                var _showSpinner = function () {
                    $("#SpinningLoaderDiv").slideDown();
                };


                // validate member search 
                var _validateMemberSearch = function (e) {
                    var isValid;

                    $("#WarningDiv").empty();
                    $("#WarningDiv").html("Please correct the following errors:");

                    var regX = new RegExp("^[a-zA-Z0-9_]*$");
                    if (!regX.test($("#accountIdTextbox").val())) {
                        document.getElementById("accountIdTextbox").style.outline = "1px solid red";
                        $("#WarningDiv").append("<br>&bull; Please enter a valid user id.")
                        isValid = false;
                    } else if ($("#accountIdTextbox").val().length === 0) {
                        document.getElementById("accountIdTextbox").style.outline = "1px solid red";
                        $("#WarningDiv").append("<br>&bull; Please enter a user id.")
                        isValid = false;
                    } else {
                        document.getElementById("accountIdTextbox").style.outline = "none";
                    }

                    if (isValid === false) {
                        $("#WarningDiv").slideDown();
                        return false;
                    };

                    $("#WarningDiv").hide();
                    HomeBankingAdminAccountNumberReassignmentModule.submitMemberSearch($("#accountIdTextbox").val())
                }


                // Ajax starting, getting a member from userId:
                var _submitMemberSearch = function (memberId) {
                    console.log("We are logging this click from ajax. - memberId: ", memberId);

                    $("#FoundDiv").slideUp();
                    $("#NotFoundDiv").slideUp();

                    // show spinner while we fetch the userId
                    document.getElementById("memberSearchButton").disabled = true;  
                    _inDelay = setTimeout(HomeBankingAdminAccountNumberReassignmentModule.showSpinner, 100);  // using setTimeout because jQuery delay only works on animate
                    formData = { MemberId: memberId }


                    $.ajax({
                        url: '@Url.Action("SearchByUserId", "AccountNumberReassignment")',  // "ActionName", "Controller" - Don't forget to add '' around the url - must be a valid string in the final webpage
                        dataType: "text",
                        type: "POST",
                        data: formData,
                        success: function (data) {      // result from the controller method. should be old account number
                            if (data !== "failure") {                           
                                $("#NotFoundDiv").slideUp();
                                _oldAccount = data;

                                // show the progress table immediately:
                                $("#UserIdSpan").text($("#accountIdTextbox").val());
                                $("#AccountSpan").text(HomeBankingAdminAccountNumberReassignmentModule.maskAccount(_oldAccount));
                                $("#CompletionDiv").slideDown();
                                // get info on each area via ajax:
                                HomeBankingAdminAccountNumberReassignmentModule.getAccountNumberReferences(_oldAccount);
                            } else {
                                $("#FoundDiv").slideUp();
                                $("#NotFoundDiv").slideDown();   
                                document.getElementById("memberSearchButton").disabled = false;  
                            };

                            clearTimeout(_inDelay);
                            $("#SpinningLoaderDiv").slideUp();
                        },

                        error: function (xhr, err) {
                            var terseError = $.parseJSON(xhr.responseText);
                            console.log("terseError: ", terseError);
                            console.log("Request Failed: " + err);
                            $("#ErrorDiv").slideDown();

                            clearTimeout(_inDelay);
                            $("#SpinningLoaderDiv").slideUp();
                        }
                    });
                };


                // for each area, see if there is an account number reference:
                var _getAccountNumberReferences = function (acct) {
                    $("#remoteDepositRow").slideDown();
                    $("#billPayRow").slideDown();
                    $("#scheduledTransfersRow").slideDown();
                    $("#userDevicesRow").slideDown();
                    $("#alertsRow").slideDown();
                    $("#mfaRow").slideDown();
                    $("#householdingRow").slideDown();
                    $("#linkedAccountsRow").slideDown();
                    $("#homeBankingUsersRow").slideDown();

                    // Remote Deposit
                    HomeBankingAdminAccountNumberReassignmentModule.ajaxHandler('@Url.Action("GetRemoteDepositInfo", "AccountNumberReassignment")?accountNumber=' + acct, "text", "GET",
                        _getRemoteDepositInfoSuccessHandler, _getInfoErrorHandler);
                    // Bill Pay
                    HomeBankingAdminAccountNumberReassignmentModule.ajaxHandler('@Url.Action("GetBillPayInfo", "AccountNumberReassignment")?accountNumber=' + acct, "text", "GET",
                        _getBillPayInfoSuccessHandler, _getInfoErrorHandler);
                    // Scheduled Transfers
                    HomeBankingAdminAccountNumberReassignmentModule.ajaxHandler('@Url.Action("GetScheduledTransfersInfo", "AccountNumberReassignment")?accountNumber=' + acct, "text", "GET",
                        _getScheduledTransfersInfoSuccessHandler, _getInfoErrorHandler);
                    // User Devices
                    HomeBankingAdminAccountNumberReassignmentModule.ajaxHandler('@Url.Action("GetUserDevicesInfo", "AccountNumberReassignment")?accountNumber=' + acct, "text", "GET",
                        _getUserDevicesInfoSuccessHandler, _getInfoErrorHandler);
                    // Alerts
                    HomeBankingAdminAccountNumberReassignmentModule.ajaxHandler('@Url.Action("GetAlertsInfo", "AccountNumberReassignment")?accountNumber=' + acct, "text", "GET",
                        _getAlertsInfoSuccessHandler, _getInfoErrorHandler);
                    // Multi - Factor Authentication(MFA)
                    HomeBankingAdminAccountNumberReassignmentModule.ajaxHandler('@Url.Action("GetMfaInfo", "AccountNumberReassignment")?accountNumber=' + acct, "text", "GET",
                        _getMfaInfoSuccessHandler, _getInfoErrorHandler);
                    // Householding
                    HomeBankingAdminAccountNumberReassignmentModule.ajaxHandler('@Url.Action("GetHouseholdingInfo", "AccountNumberReassignment")?accountNumber=' + acct, "text", "GET",
                        _getHouseholdingInfoSuccessHandler, _getInfoErrorHandler);
                    // Linked Accounts
                    HomeBankingAdminAccountNumberReassignmentModule.ajaxHandler('@Url.Action("GetLinkedAccountsInfo", "AccountNumberReassignment")?accountNumber=' + acct, "text", "GET",
                        _getLinkedAccountsInfoSuccessHandler, _getInfoErrorHandler);
                    // Home Banking Users
                    HomeBankingAdminAccountNumberReassignmentModule.ajaxHandler('@Url.Action("GetHomeBankingUsersInfo", "AccountNumberReassignment")?accountNumber=' + acct, "text", "GET",
                        _getHomeBankingUsersInfoSuccessHandler, _getInfoErrorHandler);
                };


                // Get Remote Deposit info success:
                var _getRemoteDepositInfoSuccessHandler = function (data) {                            
                    $("#remoteDepositSpinner").prop("src", "@Url.Content("~/assets/img/base/icon-blank.png")");                        
                    _ajaxCounter += 1;
                    HomeBankingAdminAccountNumberReassignmentModule.checkAjaxGetInfoComplete();

                    if (parseInt(data) > 0) {
                        $("#remoteDepositInfoTD").text(data + " Remote Deposit(s)");
                    } else {
                        $("#remoteDepositInfoTD").text("None Found");
                    }
                };


                // Get Bill Pay info success:
                var _getBillPayInfoSuccessHandler = function (data) {             
                    $("#billPaySpinner").prop("src", "@Url.Content("~/assets/img/base/icon-blank.png")");                    
                    _ajaxCounter += 1;
                    HomeBankingAdminAccountNumberReassignmentModule.checkAjaxGetInfoComplete();

                    if (parseInt(data) > 0) {
                        $("#billPayInfoTD").text("Bill Pay Active");
                    } else {
                        $("#billPayInfoTD").text("Not Active");
                    }
                };


                // Get Scheduled Transfers info success:
                var _getScheduledTransfersInfoSuccessHandler = function (data) {
                    $("#scheduledTransfersSpinner").prop("src", "@Url.Content("~/assets/img/base/icon-blank.png")");            
                    _ajaxCounter += 1;
                    HomeBankingAdminAccountNumberReassignmentModule.checkAjaxGetInfoComplete();

                    if (parseInt(data) > 0) {
                        $("#scheduledTransfersInfoTD").text(data + " Scheduled Transfer(s)");
                    } else {
                        $("#scheduledTransfersInfoTD").text("None Found");
                    }
                };


                // Get user Devices info success:
                var _getUserDevicesInfoSuccessHandler = function (data) {
                    $("#userDevicesSpinner").prop("src", "@Url.Content("~/assets/img/base/icon-blank.png")");
                    _ajaxCounter += 1;
                    HomeBankingAdminAccountNumberReassignmentModule.checkAjaxGetInfoComplete();

                    if (parseInt(data) > 0) {
                        $("#userDevicesInfoTD").text(data + " Registered Device(s)");
                    } else {
                        $("#userDevicesInfoTD").text("None Found");
                    }
                };


                // Get alerts info success:
                var _getAlertsInfoSuccessHandler = function (data) {
                    $("#alertsSpinner").prop("src", "@Url.Content("~/assets/img/base/icon-blank.png")");
                    _ajaxCounter += 1;
                    HomeBankingAdminAccountNumberReassignmentModule.checkAjaxGetInfoComplete();

                    if (parseInt(data) > 0) {
                        $("#alertsInfoTD").text(data + " Alert Subscription(s)");
                    } else {
                        $("#alertsInfoTD").text("None Found");
                    }
                };


                // Get mfa info success:
                var _getMfaInfoSuccessHandler = function (data) {                   
                    $("#mfaSpinner").prop("src", "@Url.Content("~/assets/img/base/icon-blank.png")");         
                    _ajaxCounter += 1;
                    HomeBankingAdminAccountNumberReassignmentModule.checkAjaxGetInfoComplete();

                    if (parseInt(data) > 0) {
                        $("#mfaInfoTD").text("MFA Active");
                    } else {
                        $("#mfaInfoTD").text("Not Active");
                    }
                };


                // Get householding info success:
                var _getHouseholdingInfoSuccessHandler = function (data) {                   
                    $("#householdingSpinner").prop("src", "@Url.Content("~/assets/img/base/icon-blank.png")");                     
                    _ajaxCounter += 1;
                    HomeBankingAdminAccountNumberReassignmentModule.checkAjaxGetInfoComplete();

                    if (parseInt(data) > 0) {
                        $("#householdingInfoTD").text("Active");
                    } else {
                        $("#householdingInfoTD").text("Not Active");
                    }
                };


                // Get linkedAccounts info success:
                var _getLinkedAccountsInfoSuccessHandler = function (data) {
                    $("#linkedAccountsSpinner").prop("src", "@Url.Content("~/assets/img/base/icon-blank.png")");    
                    _ajaxCounter += 1;
                    HomeBankingAdminAccountNumberReassignmentModule.checkAjaxGetInfoComplete();

                    if (parseInt(data) > 0) {
                        $("#linkedAccountsInfoTD").text(data + " Linked Account(s)");
                    } else {
                        $("#linkedAccountsInfoTD").text("None Found");
                    }
                };


                // Get home banking Users info success:
                var _getHomeBankingUsersInfoSuccessHandler = function (data) {
                    $("#homeBankingUsersSpinner").prop("src", "@Url.Content("~/assets/img/base/icon-blank.png")");                       
                    _ajaxCounter += 1;
                    HomeBankingAdminAccountNumberReassignmentModule.checkAjaxGetInfoComplete();

                    if (parseInt(data) > 0) {
                        $("#homeBankingUsersInfoTD").text("Active");
                    } else {
                        $("#homeBankingUsersInfoTD").text("Not Active");
                    }
                };


                // Get Info error:
                var _getInfoErrorHandler = function (xhr, err) {
                    var terseError = $.parseJSON(xhr.responseText);
                    console.log("terseError: ", terseError);
                    console.log("Request Failed: " + err);
                };


                // validate new account number
                var _validateNewAccountNumber = function (e) {
                    var isValid;

                    $("#WarningDiv").empty();
                    $("#WarningDiv").html("Please correct the following errors:");

                    var regX = /^\d+$/;
                    if (!regX.test($("#newAccountNumberTextbox").val())) {
                        document.getElementById("newAccountNumberTextbox").style.outline = "1px solid red";
                        $("#WarningDiv").append("<br>&bull; Please enter a valid account number (Numbers Only, no Spaces).")
                        isValid = false;
                    } else if ($("#newAccountNumberTextbox").val().length === 0) {
                        document.getElementById("newAccountNumberTextbox").style.outline = "1px solid red";
                        $("#WarningDiv").append("<br>&bull; Please enter a new Account Number.")
                        isValid = false;

                        // TODO: Get minimum account number length from config and check against it
                    } else {
                        document.getElementById("newAccountNumberTextbox").style.outline = "none";
                    }

                    if (isValid === false) {
                        $("#WarningDiv").slideDown();
                        return false;
                    };

                    // validation passed:
                    $("#WarningDiv").hide();
                    _newAccount = $("#newAccountNumberTextbox").val();
                    HomeBankingAdminAccountNumberReassignmentModule.confirmNewAccountNumberOnCore()
                };


                // Confirmation that the new account number actually exists on the core before proceeding:
                var _confirmNewAccountNumberOnCore = function () {
                    // show spinner while we fetch the account number from the core:
                    _inDelay = setTimeout(HomeBankingAdminAccountNumberReassignmentModule.showSpinner, 100);  // using setTimeout because jQuery delay only works on animate
                    document.getElementById("NewUserIdButton").disabled = true;

                    formData = {
                        AccountId: _newAccount,
                        MemberAlias: $("#accountIdTextbox").val()
                    }

                    HomeBankingAdminAccountNumberReassignmentModule.ajaxHandler('@Url.Action("ConfirmNewAccountNumberOnCore", "AccountNumberReassignment")', "text", "POST",
                        _confirmNewAccountNumberOnCoreSuccessHandler, _confirmNewAccountNumberOnCoreErrorHandler, formData);        
                };


                // New account number confirmed on core success handler:
                var _confirmNewAccountNumberOnCoreSuccessHandler = function (data) {
                    clearTimeout(_inDelay);
                    $("#SpinningLoaderDiv").slideUp();

                    // ajax response:
                    if (data.length > 0 && data.toLocaleLowerCase() === "success") {                        // if successful:
                        HomeBankingAdminAccountNumberReassignmentModule.showConfirmNewAccountNumberChange();
                    } else {
                        $("#WarningDiv").text("Sorry, the account " + _newAccount + " was not found on the Core. Please try again.");
                        $("#WarningDiv").slideDown();
                        document.getElementById("NewUserIdButton").disabled = false;
                    }
                }


                // New account number confirmed on core error handler:
                var _confirmNewAccountNumberOnCoreErrorHandler = function (xhr, err) {
                    var terseError = $.parseJSON(xhr.responseText);
                    console.log("terseError: ", terseError);
                    console.log("Request Failed: " + err);

                    clearTimeout(_inDelay);
                    $("#SpinningLoaderDiv").slideUp();
                    $("#ErrorDiv").slideDown();
                }


                // New account number was found on the Core. Show confirmation area:
                var _showConfirmNewAccountNumberChange = function () {
                    console.log("We are logging this click from ajax. - new account number: ", _newAccount);
                     
                    // show the confirm change area:
                    $("#ConfirmDiv").slideDown();
                };


                // validate confirm new account number
                var _validateConfirmNewAccountNumber = function (e) {
                    var isValid;

                    $("#WarningDiv").empty();
                    $("#WarningDiv").html("Please correct the following errors:");

                    var regX = /^\d+$/;

                    // old account number:
                    if (!regX.test($("#oldAccountNumberTextbox").val())) {
                        document.getElementById("oldAccountNumberTextbox").style.outline = "1px solid red";
                        $("#WarningDiv").append("<br>&bull; Please enter a valid old account number.")
                        isValid = false;
                    } else if ($("#oldAccountNumberTextbox").val().length === 0) {
                        document.getElementById("oldAccountNumberTextbox").style.outline = "1px solid red";
                        $("#WarningDiv").append("<br>&bull; Please enter the old Account Number.")
                        isValid = false;
                    } else if ($("#oldAccountNumberTextbox").val() !== _oldAccount) {
                        document.getElementById("oldAccountNumberTextbox").style.outline = "1px solid red";
                        $("#WarningDiv").append("<br>&bull; Old Account Number Is incorrect.")
                        isValid = false;
                    } else {
                        document.getElementById("oldAccountNumberTextbox").style.outline = "none";
                    }

                    // new account number:
                    if (!regX.test($("#newAccountNumberConfirmTextbox").val())) {
                        document.getElementById("newAccountNumberConfirmTextbox").style.outline = "1px solid red";
                        $("#WarningDiv").append("<br>&bull; Please enter a valid New account number (Numbers Only, no Spaces).")
                        isValid = false;
                    } else if ($("#newAccountNumberConfirmTextbox").val().length === 0) {
                        document.getElementById("newAccountNumberConfirmTextbox").style.outline = "1px solid red";
                        $("#WarningDiv").append("<br>&bull; Please enter the new Account Number.")
                        isValid = false;
                    } else if ($("#newAccountNumberConfirmTextbox").val() !== $("#newAccountNumberTextbox").val()) {
                        document.getElementById("newAccountNumberTextbox").style.outline = "1px solid red";
                        document.getElementById("newAccountNumberConfirmTextbox").style.outline = "1px solid red";
                        $("#WarningDiv").append("<br>&bull; New Account Numbers don't match.")
                        isValid = false;
                    } else {
                        document.getElementById("newAccountNumberTextbox").style.outline = "none";
                        document.getElementById("newAccountNumberConfirmTextbox").style.outline = "none";
                    }

                    if (isValid === false) {
                        $("#WarningDiv").slideDown();
                        return false;
                    };

                    $("#WarningDiv").hide();
                    HomeBankingAdminAccountNumberReassignmentModule.submitNewAccountNumberChange()
                };


                // Ajax starting, reassigning account number actions:
                var _submitNewAccountNumberChange = function () {
                    //console.log("Got here: submitNewAccountNumberChange()");

                    if (! confirm("Are you really sure you want to change the account number in these features?\n\nCAUTION! THIS WILL MAKE WIDE AND EXTENSIVE CHANGES TO YOUR DATABASE!\n\nThis action cannot be undone.")) {
                        return;
                    }


                    document.getElementById("confirmChangeButton").disabled = true;
                    $("#keyRow").slideDown();

                    $("#remoteDepositSpinner").prop("src", "@Url.Content("~/assets/img/base/ajax_loader.gif")");
                    $("#billPaySpinner").prop("src", "@Url.Content("~/assets/img/base/ajax_loader.gif")");
                    $("#scheduledTransfersSpinner").prop("src", "@Url.Content("~/assets/img/base/ajax_loader.gif")");
                    $("#userDevicesSpinner").prop("src", "@Url.Content("~/assets/img/base/ajax_loader.gif")");
                    $("#alertsSpinner").prop("src", "@Url.Content("~/assets/img/base/ajax_loader.gif")");
                    $("#mfaSpinner").prop("src", "@Url.Content("~/assets/img/base/ajax_loader.gif")");
                    $("#householdingSpinner").prop("src", "@Url.Content("~/assets/img/base/ajax_loader.gif")");
                    $("#linkedAccountsSpinner").prop("src", "@Url.Content("~/assets/img/base/ajax_loader.gif")");
                    $("#homeBankingUsersSpinner").prop("src", "@Url.Content("~/assets/img/base/ajax_loader.gif")");

                    formData = { NewAccountNumber: _newAccount, OldAccountNumber: _oldAccount }

                    // Remote Deposit
                    HomeBankingAdminAccountNumberReassignmentModule.ajaxHandler('@Url.Action("RemoteDepositAccountChange", "AccountNumberReassignment")', "text", "POST",
                        _accountChangeSuccessHandler, _accountChangeErrorHandler, formData);
                    // Bill Pay
                    HomeBankingAdminAccountNumberReassignmentModule.ajaxHandler('@Url.Action("BillPayAccountChange", "AccountNumberReassignment")', "text", "POST",
                        _accountChangeSuccessHandler, _accountChangeErrorHandler, formData);
                    // Scheduled Transfers
                    HomeBankingAdminAccountNumberReassignmentModule.ajaxHandler('@Url.Action("ScheduledTransfersAccountChange", "AccountNumberReassignment")', "text", "POST",
                        _accountChangeSuccessHandler, _accountChangeErrorHandler, formData);
                    // User Devices
                    HomeBankingAdminAccountNumberReassignmentModule.ajaxHandler('@Url.Action("UserDevicesAccountChange", "AccountNumberReassignment")', "text", "POST",
                        _accountChangeSuccessHandler, _accountChangeErrorHandler, formData);
                    // Alerts
                    HomeBankingAdminAccountNumberReassignmentModule.ajaxHandler('@Url.Action("AlertsAccountChange", "AccountNumberReassignment")', "text", "POST",
                        _accountChangeSuccessHandler, _accountChangeErrorHandler, formData);
                    // Multi - Factor Authentication(MFA)
                    HomeBankingAdminAccountNumberReassignmentModule.ajaxHandler('@Url.Action("MfaAccountChange", "AccountNumberReassignment")', "text", "POST",
                        _accountChangeSuccessHandler, _accountChangeErrorHandler, formData);
                    // Householding
                    HomeBankingAdminAccountNumberReassignmentModule.ajaxHandler('@Url.Action("HouseholdingAccountChange", "AccountNumberReassignment")', "text", "POST",
                        _accountChangeSuccessHandler, _accountChangeErrorHandler, formData);
                    // Linked Accounts
                    HomeBankingAdminAccountNumberReassignmentModule.ajaxHandler('@Url.Action("LinkedAccountsAccountChange", "AccountNumberReassignment")', "text", "POST",
                        _accountChangeSuccessHandler, _accountChangeErrorHandler, formData);
                    // Home Banking Users
                    HomeBankingAdminAccountNumberReassignmentModule.ajaxHandler('@Url.Action("HomeBankingUsersAccountChange", "AccountNumberReassignment")', "text", "POST",
                        _accountChangeSuccessHandler, _accountChangeErrorHandler, formData);
                };


                // account change success handler
                var _accountChangeSuccessHandler = function (data) {
                    if (data.length > 0) {
                        switch (data.toLocaleLowerCase()) {
                            case "remotedeposit_success":
                                $("#remoteDepositSpinner").prop("src", "@Url.Content("~/assets/img/base/icon-checkmark.png")");
                                break;
                            case "remotedeposit_failure":
                                $("#remoteDepositSpinner").prop("src", "@Url.Content("~/assets/img/base/icon_alert_44.png")");
                                document.getElementById("remoteDepositRow").children[1].innerText += ". Please update this item manually";
                                break;
                            case "billpay_success":
                                $("#billPaySpinner").prop("src", "@Url.Content("~/assets/img/base/icon-checkmark.png")");
                                break;
                            case "billpay_failure":
                                $("#billPaySpinner").prop("src", "@Url.Content("~/assets/img/base/icon_alert_44.png")");
                                document.getElementById("billPayRow").children[1].innerText += ". Please update this item manually";
                                break;
                            case "scheduledtransfers_success":
                                $("#scheduledTransfersSpinner").prop("src", "@Url.Content("~/assets/img/base/icon-checkmark.png")");
                                break;
                            case "scheduledtransfers_failure":
                                $("#scheduledTransfersSpinner").prop("src", "@Url.Content("~/assets/img/base/icon_alert_44.png")");
                                document.getElementById("scheduledTransfersRow").children[1].innerText += ". Please update this item manually";
                                break;
                            case "userdevices_success":
                                $("#userDevicesSpinner").prop("src", "@Url.Content("~/assets/img/base/icon-checkmark.png")");
                                break;
                            case "userdevices_failure":
                                $("#userDevicesSpinner").prop("src", "@Url.Content("~/assets/img/base/icon_alert_44.png")");
                                document.getElementById("userDevicesRow").children[1].innerText += ". Please update this item manually";
                                break;
                            case "alerts_success":
                                $("#alertsSpinner").prop("src", "@Url.Content("~/assets/img/base/icon-checkmark.png")");
                                break;
                            case "alerts_failure":
                                $("#alertsSpinner").prop("src", "@Url.Content("~/assets/img/base/icon_alert_44.png")");
                                document.getElementById("alertsRow").children[1].innerText += ". Please update this item manually";
                                break;
                            case "mfa_success":
                                $("#mfaSpinner").prop("src", "@Url.Content("~/assets/img/base/icon-checkmark.png")");
                                break;
                            case "mfa_failure":
                                $("#mfaSpinner").prop("src", "@Url.Content("~/assets/img/base/icon_alert_44.png")");
                                document.getElementById("mfaRow").children[1].innerText += ". Please update this item manually";
                                break;
                            case "householding_success":
                                $("#householdingSpinner").prop("src", "@Url.Content("~/assets/img/base/icon-checkmark.png")");
                                break;
                            case "householding_failure":
                                $("#householdingSpinner").prop("src", "@Url.Content("~/assets/img/base/icon_alert_44.png")");
                                document.getElementById("householdingRow").children[1].innerText += ". Please update this item manually";
                                break;
                            case "linkedaccounts_success":
                                $("#linkedAccountsSpinner").prop("src", "@Url.Content("~/assets/img/base/icon-checkmark.png")");
                                break;
                            case "linkedaccounts_failure":
                                $("#linkedAccountsSpinner").prop("src", "@Url.Content("~/assets/img/base/icon_alert_44.png")");
                                document.getElementById("linkedAccountsRow").children[1].innerText += ". Please update this item manually";
                                break;
                            case "homebankingusers_success":
                                $("#homeBankingUsersSpinner").prop("src", "@Url.Content("~/assets/img/base/icon-checkmark.png")");
                                break;
                            case "homebankingusers_failure":
                                $("#homeBankingUsersSpinner").prop("src", "@Url.Content("~/assets/img/base/icon_alert_44.png")");
                                document.getElementById("homeBankingUsersRow").children[1].innerText += ". Please update this item manually";
                                break;
                        }
                    }
                };


                // account change error:
                var _accountChangeErrorHandler = function (xhr, err) {
                    var terseError = $.parseJSON(xhr.responseText);
                    console.log("terseError: ", terseError);
                    console.log("Request Failed: " + err);
                };


                // Mask the account numbers
                var _maskAccount = function (accountString) {
                    if (accountString === null || accountString === "undefined" || accountString === "") {
                        return "---";
                    }

                    if (accountString === "n/a") {
                        return "n/a";
                    }

                    // show last three digits of account number only
                    var nativeString = "****" + accountString.substring(accountString.length - 3);
                    return nativeString;
                };


                // generic AJAX caller that we can reuse:
                var _ajaxHandler = function (url, dType, rqstType, successCallback, errorCallback, dataObject) {
                    $.ajax({
                        url: url,
                        dataType: dType,
                        type: rqstType,
                        data: dataObject,
                        success: successCallback,
                        error: errorCallback
                    });
                };


                // check ajax complete
                var _checkAjaxGetInfoComplete = function () {
                    if (_ajaxCounter === _categories.length) {
                        $("#overallSpinner").prop("src", "@Url.Content("~/assets/img/base/icon-checkmark.png")");
                        $("#FoundDiv").slideDown();
                        document.getElementById("confirmChangeButton").disabled = false;
                    }
                }



                // public interface:
                // public interface:
                // public interface:
                return {
                    showSpinner: _showSpinner,
                    maskAccount: _maskAccount,
                    validateMemberSearch: _validateMemberSearch,
                    submitMemberSearch: _submitMemberSearch,
                    getAccountNumberReferences: _getAccountNumberReferences,
                    validateNewAccountNumber: _validateNewAccountNumber,
                    confirmNewAccountNumberOnCore: _confirmNewAccountNumberOnCore,
                    showConfirmNewAccountNumberChange: _showConfirmNewAccountNumberChange,
                    validateConfirmNewAccountNumber: _validateConfirmNewAccountNumber,
                    submitNewAccountNumberChange: _submitNewAccountNumberChange,
                    ajaxHandler: _ajaxHandler,
                    checkAjaxGetInfoComplete: _checkAjaxGetInfoComplete
                }

            })();  // END HomeBankingAdminAccountNumberReassignmentModule

        });
    </script>
End Section

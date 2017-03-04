"use strict";
HomeBanking.namespace("HomeBanking.Controls.ApplyForAdvancePayLoan");
HomeBanking.Controls.ApplyForAdvancePayLoan.Module = (function () {
    // Global vars to this module
    var _applicantName;
    var _socialSecurityNumber;
    var _birthdateString;
    var _address_1;
    var _address_2;
    var _city;
    var _state;
    var _zipCode;
    var _homePhone;
    var _workPhone;
    var _employer;
    var _selectedAccountNumber;
    var _isMilitary;
    var _amountSeeking;
    var _selectedSuffix;
    /*
    * Reset modal to initial state
    */
    var _resetAll = function () {
        $("#LoadingDiv").show();
        $("#ErrorDiv").hide();
        $("#StepOneDiv").hide();
        $("#StepTwoDiv").hide();
        $("#StepThreeDiv").hide();
        $("#MilitaryDiv").hide();
        $("#DecisionMessageApprovedDiv").hide();
        $("#DecisionMessageDeniedDiv").hide();
        $("#DecisionMessageFailureDiv").hide();
        $("#ValidatorDiv").hide();
        $("#ProcessingRequestDiv").hide();
        $("#AgreeToTermsCheckbox").prop('checked', false);
        $("#MilitaryRadioYes").prop('checked', false);
        $("#MilitaryRadioNo").prop('checked', false);
        $("#StepThreeSubmitButton").attr("disabled", "disabled");
        $("#ApplicantsDropDownList").parent().removeClass("has-error");
        $("#SsnInput").parent().removeClass("has-error");
        $("#BirthdateInput").parent().removeClass("has-error");
        $("#BirthdateInput").parent().removeClass("has-error");
        $("#AddressOneInput").parent().removeClass("has-error");
        $("#CityInput").parent().removeClass("has-error");
        $("#HomePhoneInput").parent().removeClass("has-error");
        $("#WorkPhoneInput").parent().removeClass("has-error");
        $("#EmployerInput").parent().removeClass("has-error");
        $("#SsnInput").empty();
        $("#BirthdateInput").empty();
        $("#AddressOneInput").empty();
        $("#CityInput").empty();
        $("#ZipCodeInput").empty();
        $("#HomePhoneInput").empty();
        $("#WorkPhoneInput").empty();
        $("#EmployerInput").empty();
        $("#ApprovedNameSpan").empty();
        $("#ApprovedDateSpan").empty();
        $("#ApprovedLoanAmountSpan").empty();
        $("#ApprovedDueDateSpan").empty();
        $("#ApprovedFinanceChargeSpan").empty();
        $("#ApprovedPaymentAmountSpan").empty();
        $("#ApprovedAPRSpan").empty();
        $("#ApprovedTransferPaymentSourcespan").empty();
    }    
    /*
    * Hide the modal
    */
    var _hideModal = function (e) {
        e.preventDefault();
        
        if (window.location.pathname.split("/").pop().toLowerCase().indexOf("advancepayapplyforloanmobile.aspx") >= 0) {
            window.location.href = "connectfss-mobile://close";
        } else {
            $("#apply-for-advance-pay-modal").modal("hide");
        }
    }
    /*
    * Hide the modal and reload the page
    */
    var _hideModalWithReload = function (e) {
        e.preventDefault();
        if (window.location.pathname.split("/").pop().toLowerCase().indexOf("advancepayapplyforloanmobile.aspx") >= 0) {
            window.location.href = "connectfss-mobile://close";
        } else {
            $("#apply-for-advance-pay-modal").modal("hide");
            if (window.location.pathname.split("/").pop().toLowerCase().indexOf("advancepayapplymobile.aspx") >= 0) {
                window.location.href = "connectfss-mobile://close";
            } else {
                setTimeout(function () { self.location.href = window.location.pathname; }, 500); // reload the welcome/summary/dashboard page so as to reflect an update in the loan status
            }
        }
    }
    /*
    * Convert dates to readable string
    */
    var _convertFromStringDate = function (dateString) {       // 19550505
        var nativeString = dateString.substring(4, 6) + "/" + dateString.substring(6, 8) + "/" + dateString.substring(0, 4);
        return nativeString;
    }
    /*
    * Convert dates to readable string
    */
    var _convertFromNetDate = function (dateString) {       // 1955-05-05
        var nativeString = dateString.substring(5, 7) + "/" + dateString.substring(8, 10) + "/" + dateString.substring(0, 4);
        return nativeString;
    }
    /*
    * Mask ssn's
    */
    var _maskSSN = function (ssnString) {       
        var nativeString = "***-**-" + ssnString.substring(5, 9);
        return nativeString;
    }
 
    // INITIAL LOADING STUFF
    // INITIAL LOADING STUFF
    // INITIAL LOADING STUFF
    // INITIAL LOADING STUFF
    // INITIAL LOADING STUFF
    /* *
    * Called when qualified applicants data was successfully retrieved.
    *
     * @param {Object} reply - The advance pay qualified applicants reply.
    */
    var _qualifyingApplicantsDataSuccessHandler = function (reply) {
        $("#LoadingDiv").hide();
        //if reply comes back, but it is empty:
        if (reply === "undefined" || reply.length === 0) {
            $("#ErrorDiv").show("normal");
            $("#ErrorDangerDiv").text(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.dataLoadFailureMessage);
        } else {
            var advancePayData = JSON.parse(reply);
            // populate the drop-down with the jason reply:
            $("#ApplicantsDropDownList").empty();
            var selectDefault = document.createElement('option');
            selectDefault.value = "None";
            selectDefault.innerHTML = "-- Select --";
            $("#ApplicantsDropDownList").append(selectDefault);
            for (var i = 0; i < advancePayData.length; i++) {
                var opt = document.createElement('option');
                opt.value = advancePayData[i].AccountNumber;
                opt.innerHTML = advancePayData[i].AccountMemberName;
                $("#ApplicantsDropDownList").append(opt);
            }
     
            $("#StepOneDiv").show("normal");
        }
    };
    /* *
     * Called when qualified applicants data retrieval failed.
     *
     */
    var _qualifyingApplicantsDataFailureHandler = function () {
        _resetAll();
        $("#LoadingDiv").hide();
        $("#ErrorDiv").show("normal");
        $("#ErrorDangerDiv").text(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.dataLoadFailureMessage);
    };
 
    /*
     * Load qualifying applicant data on modal 'show'
     */
    var _loadQualifyingApplicantsData = function () {
        // call the controller
        $.ajax(
                {
                    cache: false,
                    context: this,
                    dataType: "json",
                    error: _qualifyingApplicantsDataFailureHandler,
                    success: _qualifyingApplicantsDataSuccessHandler,
                    type: "GET",
                    url: HomeBanking.BASE_URL + "api/AdvancePay/get-qualifying-accounts/"
                }
            );
    }
 
    // STEP ONE
    // STEP ONE
    // STEP ONE
    // STEP ONE
    // STEP ONE
    /*
    * Get loan terms success handler
    */
    var _getAccountDetailsSuccessHandler = function (reply) {
        $("#LoadingDiv").hide();
        //if reply comes back, but it is empty:
        if (reply === "undefined" || reply.length === 0) {
            $("#ErrorDiv").show("normal");
            $("#ErrorDangerDiv").text(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.dataLoadFailureMessage);   
        } else {
            var loanApplicantData = JSON.parse(reply);    // this should be an object with two properties: reply.IsMilitary (Bool) and reply.LoanApplicant (of class AdvancePayLoanApplicantModel)
            // if military, show the military div and get out of here.
            if (loanApplicantData.IsMilitary === true) {
                $("#MilitaryDiv").show("normal");
                $("#MilitaryHeadingDiv").text(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.militaryHeaderMessage);
                $("#MilitaryTermsDiv").html(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.militaryTermsMessage);
                return;
            }
            if (loanApplicantData.LoanApplicant !== null) {     // we have a LoanApplicant object, yeah!
                if (loanApplicantData.LoanApplicant.State === "failure") {  // server data validation failure
                    $("#ValidatorDiv").show("normal");
                    $("#ValidatorDiv").empty();
                    $("#ValidatorDiv").text("Sorry, some of the information you entered was not valid. Please try again.");
                    $("#StepOneDiv").show();
                    return;
                } else {
                    $("#StepTwoDiv").show("normal");
                    // Examine account info for page preparation
                    $("#AddressOneInput").val(loanApplicantData.LoanApplicant.Address_1);
                    $("#AddressTwoInput").val(loanApplicantData.LoanApplicant.Address_2);
                    $("#CityInput").val(loanApplicantData.LoanApplicant.City);
                    $("#StateDropDownList").val(loanApplicantData.LoanApplicant.State);
                    $("#ZipCodeInput").val(loanApplicantData.LoanApplicant.ZipCode);
                    $("#HomePhoneInput").val(loanApplicantData.LoanApplicant.HomePhone);
                    $("#WorkPhoneInput").val(loanApplicantData.LoanApplicant.WorkPhone);
                    if (loanApplicantData.LoanApplicant.IsPrimary === true) {
                        // primary account
                        $("#NameSpan").empty();
                        $("#NameSpan").html(loanApplicantData.LoanApplicant.FirstName + " " + loanApplicantData.LoanApplicant.LastName);
                        _applicantName = loanApplicantData.LoanApplicant.FirstName + " " + loanApplicantData.LoanApplicant.LastName;    // save for future use
                        $("#StepTwoSsnDiv").empty();
                        $("#StepTwoSsnDiv").html(_maskSSN(loanApplicantData.LoanApplicant.SSN));
                        _socialSecurityNumber = loanApplicantData.LoanApplicant.SSN;
                        $("#StepTwoBirthdateDiv").empty();
                        $("#StepTwoBirthdateDiv").html(_convertFromStringDate(loanApplicantData.LoanApplicant.BirthdateString));
                        _birthdateString = _convertFromStringDate(loanApplicantData.LoanApplicant.BirthdateString);
                    } else {
                        // cross account
                        $("#NameSpan").empty();
                        $("#NameSpan").html(loanApplicantData.LoanApplicant.FullName);
                        _applicantName = loanApplicantData.LoanApplicant.FullName;        // save for future use
                        // if it is NOT the primary account, hide the ssn and birthdate labels and show the form inputs:
                        $("#StepTwoSsnDiv").empty();
                        $("#StepTwoSsnDiv").hide();
                        $("#StepTwoBirthdateDiv").empty();
                        $("#StepTwoBirthdateDiv").hide();
                        $("#SsnInput").show();
                        $("#BirthdateInput").show();
                    }
                }
            }
        }
    }
    /*
    * Get loan terms failure handler
    */
    var _getAccountDetailsFailureHandler = function () {
        _resetAll();
        $("#LoadingDiv").hide();
        $("#ErrorDiv").show("normal");
        $("#ErrorDangerDiv").empty();
        $("#ErrorDangerDiv").text(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.dataLoadFailureMessage);   
    }
    /*
    * Validate Step One "next" button click
    */
    var _validateStepOne = function () {
        if ($("#ApplicantsDropDownList").val() === "None" || (!$("#MilitaryRadioYes").is(":checked") && !$("#MilitaryRadioNo").is(":checked"))) {
            $("#ValidatorDiv").show("normal");
            $("#ValidatorDiv").empty();
            $("#ValidatorDiv").html(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.stepOneValitatorMessage);
            // show validation errors client side:
            if ($("#ApplicantsDropDownList").val() === "None") {
                $("#ApplicantsDropDownList").parent().addClass("has-error");
                $("#ValidatorDiv").append("<br>&bull; Please select an applicant.");
            } else {
                $("#ApplicantsDropDownList").parent().removeClass("has-error");
            }
            if (!$("#MilitaryRadioYes").is(":checked") && !$("#MilitaryRadioNo").is(":checked")) {
                $("#ValidatorDiv").append("<br>&bull; Please select the military status of this applicant.");
            }  
        } else {
            _isMilitary = $("input:radio[name='MilitaryRadio']:checked").val();
            _selectedAccountNumber = $("#ApplicantsDropDownList").val();
            _applicantName = $("#ApplicantsDropDownList option:selected").text();
            // send to the webApi Controller
            $.ajax(
                {
                    cache: false,
                    context: this,
                    dataType: "json",
                    error: _getAccountDetailsFailureHandler,
                    success: _getAccountDetailsSuccessHandler,
                    type: "Post",
                    data: { militaryStatus: _isMilitary, accountNumber: _selectedAccountNumber, applicantName: _applicantName },
                    url: HomeBanking.BASE_URL + "api/AdvancePay/get-selected-account-details/"
                }
            );
            _resetAll();
        }
    }
 
    // STEP TWO
    // STEP TWO
    // STEP TWO
    // STEP TWO
    // STEP TWO
    /*
    * return to step one handler
    */
    var _returnToStepOne = function() {
        _resetAll();
        _loadQualifyingApplicantsData();
    }
    /*
    * Get loan terms success handler
    */
    var _getLoanTermsDataSuccessHandler = function (reply) {
        $("#LoadingDiv").hide();
        //if reply comes back, but it is empty:
        if (reply === "undefined" || reply.length === 0) {
            $("#ErrorDiv").show("normal");
            $("#ErrorDangerDiv").empty();
            $("#ErrorDangerDiv").text(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.dataLoadFailureMessage);   
        } else {
            var advancePayLoanDisclosureData = JSON.parse(reply);
            
            if (advancePayLoanDisclosureData.LoanTerms.indexOf("Data Failure") === 0) {     // server data validation failure
                $("#ValidatorDiv").show("normal");
                $("#ValidatorDiv").empty();
                $("#ValidatorDiv").text(advancePayLoanDisclosureData.LoanTerms);  // list of failures back from the server
                $("#StepTwoDiv").show();
                return;
            } else if (advancePayLoanDisclosureData.LoanTerms.toLowerCase() === "success") {
                // populate the LoanAmountsDropDownList with the jason reply by calculating from the maximum amount:
                var maximumAmount = advancePayLoanDisclosureData.MaximumLoanAmount;
                $("#LoanAmountsDropDownList").empty();
                var selectDef = document.createElement('option');
                selectDef.value = "None";
                selectDef.innerHTML = "-- Select --";
                $("#LoanAmountsDropDownList").append(selectDef);
                var maximumAmountOpt = document.createElement('option');
                maximumAmountOpt.value = maximumAmount;
                var financeChargeRate = HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.financeChargePercentage;
            
                var maximumAmountFinanceCharge = HomeBanking.Utilities.Currency.FormatCentsToDollars(maximumAmount * financeChargeRate);
                var maxDisplayString = HomeBanking.Utilities.Currency.FormatCentsToDollars(maximumAmount) + " with a " + maximumAmountFinanceCharge + " finance charge";
                maximumAmountOpt.innerHTML = maxDisplayString;
                $("#LoanAmountsDropDownList").append(maximumAmountOpt);
                // now, calculate the rest of the drop down options down TO $100:
                var nextLowestMultipleOfOneHundred;
                if ((maximumAmount / 100) > 100.00) {
                    nextLowestMultipleOfOneHundred = (parseInt(maximumAmount / 10000) * 100);        
                    // if the maximum amount in dollars is an even multiple of 100, then lower it by 100 so we don't get duplicates of the maximum amount in the drop down:
                    if ((maximumAmount / 100) % 100 === 0) {
                        nextLowestMultipleOfOneHundred -= 100;
                    }
                }
                for (var j = nextLowestMultipleOfOneHundred; j >= 100 ; j -= 100) {
                    var optz = document.createElement('option');
                    optz.value = j;
                    var financeCharge = HomeBanking.Utilities.Currency.FormatCentsToDollars((j * 100) * financeChargeRate);
                    optz.innerHTML = HomeBanking.Utilities.Currency.FormatCentsToDollars(j * 100) + " with a " + financeCharge + " finance charge";
                    $("#LoanAmountsDropDownList").append(optz);
                }
 
                // populate the Deposit suffix drop-down with the jason reply:
                $("#DepositSuffixDropDownList").empty();
                var selectDefault = document.createElement('option');
                selectDefault.value = "None";
                selectDefault.innerHTML = "-- Select --";
                $("#DepositSuffixDropDownList").append(selectDefault);
                for (var i = 0; i < advancePayLoanDisclosureData.DepositSuffixList.length; i++) {
                    var opt = document.createElement('option');
                    opt.value = advancePayLoanDisclosureData.DepositSuffixList[i].SuffixNumber;
                    opt.innerHTML = advancePayLoanDisclosureData.DepositSuffixList[i].SuffixName;
                    $("#DepositSuffixDropDownList").append(opt);
                }
                $("#StepTwoDiv").hide();
                $("#StepThreeDiv").show("normal");
                $("#DisclosureTermsDiv").empty();
                $("#DisclosureTermsDiv").html(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.termsAndConditionsMessage);  // terms are stored in the resource file
              
            } else if (advancePayLoanDisclosureData.LoanTerms.toLowerCase() === "failure") {
                $("#ErrorDiv").show("normal");
                $("#ErrorDangerDiv").empty();
                $("#ErrorDangerDiv").text(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.dataLoadFailureMessage);   
            }
        }
    }
    /*
    * Get loan terms failure handler
    */
    var _getLoanTermsDataFailureHandler = function () {
        _resetAll();
        $("#LoadingDiv").hide();
        $("#ErrorDiv").show("normal"); get - loan - terms
        $("#ErrorDangerDiv").empty();
        $("#ErrorDangerDiv").text(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.dataLoadFailureMessage);   
    }
    /*
    * Validate Step two "next" button click
    */
    var _validateStepTwo = function () {
        // for those that need regex checks:
        var ssnRegex = /^\d{3}-?\d{2}-?\d{4}$/;
        var birthdateRegex = /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]((?:19|20)\d\d)$/;   
        var zipRegex = /^\d{5}$/;
        var phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        // check if valid:
        if ($("#SsnInput").is(":visible") && $("#SsnInput").val() === "" || 
                $("#SsnInput").is(":visible") && ssnRegex.test($("#SsnInput").val()) === false || 
                $("#BirthdateInput").is(":visible") && $("#BirthdateInput").val() === "" ||
                $("#BirthdateInput").is(":visible") &&  birthdateRegex.test($("#BirthdateInput").val()) === false ||
                $("#AddressOneInput").val() === "" ||
                $("#CityInput").val() === "" ||
                $("#StateDropDownList").val() === "None" ||
                $("#ZipCodeInput").val() === "" ||
                $("#HomePhoneInput").val() === "" ||
                $("#WorkPhoneInput").val() === "" ||
                $("#EmployerInput").val() === "" ||
                zipRegex.test($("#ZipCodeInput").val()) === false ||
                phoneRegex.test($("#HomePhoneInput").val()) === false ||
                phoneRegex.test($("#WorkPhoneInput").val()) === false ) {
            $("#ValidatorDiv").empty();
            $("#ValidatorDiv").show("normal");
            $("#ValidatorDiv").html(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.stepOneValitatorMessage);
            // set validation warnings client side:
            if ($("#SsnInput").is(":visible") && $("#SsnInput").val() === "") {
                $("#SsnInput").parent().addClass("has-error");
                $("#ValidatorDiv").append("<br>&bull; Please enter the last four digits of the Social Security Number.");
            } else if ($("#SsnInput").is(":visible") && !ssnRegex.test($("#SsnInput").val())) {
                $("#SsnInput").parent().addClass("has-error");
                $("#ValidatorDiv").append("<br>&bull; Please enter a valid Social Security Number.");
            }
            else {
                 $("#SsnInput").parent().removeClass("has-error");
            }
            if ($("#BirthdateInput").is(":visible") && $("#BirthdateInput").val() === "") {
                $("#BirthdateInput").parent().addClass("has-error");
                $("#ValidatorDiv").append("<br>&bull; Please enter the birth date.");
            } else if ($("#BirthdateInput").is(":visible") && !birthdateRegex.test($("#BirthdateInput").val())) {
                $("#BirthdateInput").parent().addClass("has-error");
                $("#ValidatorDiv").append("<br>&bull; Please enter a valid birth date.");
            }
            else {
                 $("#BirthdateInput").parent().removeClass("has-error");
            }
            if ($("#AddressOneInput").val() === "") { $("#AddressOneInput").parent().addClass("has-error"); $("#ValidatorDiv").append("<br>&bull; Please enter the address."); } else { $("#AddressOneInput").parent().removeClass("has-error"); }
            if ($("#CityInput").val() === "") { $("#CityInput").parent().addClass("has-error"); $("#ValidatorDiv").append("<br>&bull; Please enter the city."); } else { $("#CityInput").parent().removeClass("has-error"); }
            if ($("#StateDropDownList").val() === "None") { $("#StateDropDownList").parent().addClass("has-error"); $("#ValidatorDiv").append("<br>&bull; Please select the state."); } else { $("#StateDropDownList").parent().removeClass("has-error"); }
            if ($("#ZipCodeInput").val() === "") {
                $("#ZipCodeInput").parent().addClass("has-error");
                $("#ValidatorDiv").append("<br>&bull; Please enter the zip code.");
            } else if (!zipRegex.test($("#ZipCodeInput").val())) {
                $("#ZipCodeInput").parent().addClass("has-error");
                $("#ValidatorDiv").append("<br>&bull; Please enter a valid zip code.");
            } else {
                 $("#ZipCodeInput").parent().removeClass("has-error");
            }
 
            if ($("#HomePhoneInput").val() === "") {
                $("#HomePhoneInput").parent().addClass("has-error");
                $("#ValidatorDiv").append("<br>&bull; Please enter the home phone.");
            } else if (!phoneRegex.test($("#HomePhoneInput").val())) {
                $("#HomePhoneInput").parent().addClass("has-error");
                $("#ValidatorDiv").append("<br>&bull; Please enter a valid home phone.");
            } else {
                 $("#HomePhoneInput").parent().removeClass("has-error");
            }
            if ($("#WorkPhoneInput").val() === "") {
                $("#WorkPhoneInput").parent().addClass("has-error");
                $("#ValidatorDiv").append("<br>&bull; Please enter the work phone.");
            } else if (!phoneRegex.test($("#WorkPhoneInput").val())) {
                $("#WorkPhoneInput").parent().addClass("has-error");
                $("#ValidatorDiv").append("<br>&bull; Please enter a valid work phone.");
            }
            else {
                 $("#WorkPhoneInput").parent().removeClass("has-error");
            }
            if ($("#EmployerInput").val() === "") { $("#EmployerInput").parent().addClass("has-error"); $("#ValidatorDiv").append("<br>&bull; Please enter the employer."); } else { $("#EmployerInput").parent().removeClass("has-error"); }
        } else {
            // prepare data for submit:
            if ($("#SsnInput").is(':visible')) {
                _socialSecurityNumber = $("#SsnInput").val();
            }   // else ssn was previously set in step one
            if ($("#BirthdateInput").is(':visible')) {
                _birthdateString = $("#BirthdateInput").val();
            }   // else bd was previously set in step one 
            _address_1 =$("#AddressOneInput").val(),
            _address_2 = $("#AddressTwoInput").val(),
            _city = $("#CityInput").val(),
            _state = $("#StateDropDownList").val(),
            _zipCode = $("#ZipCodeInput").val(),
            _homePhone = $("#HomePhoneInput").val(),
            _workPhone = $("#WorkPhoneInput").val(),
            _employer = $("#EmployerInput").val(),
            $.ajax(
                {
                    cache: false,
                    context: this,
                    dataType: "json",
                    error: _getLoanTermsDataFailureHandler,
                    success: _getLoanTermsDataSuccessHandler,
                    type: "Post",
                    data: {
                        applicantName: _applicantName,
                        ssn: _socialSecurityNumber,
                        birthdate: _birthdateString,
                        address_1: _address_1,
                        address_2: _address_2,
                        city: _city,
                        state: _state,
                        zipCode: _zipCode,
                        homePhone: _homePhone,
                        workPhone: _workPhone,
                        employer: _employer,
                        militaryStatus: _isMilitary,
                        accountNumber: _selectedAccountNumber
                    },
                    url: HomeBanking.BASE_URL + "api/AdvancePay/get-loan-terms/"
                }
            );
            _resetAll();
        }
    }
 
 
    // STEP THREE
    // STEP THREE
    // STEP THREE
    // STEP THREE
    // STEP THREE
 
    var _checkAgreementTerms = function () {
        if ($("#AgreeToTermsCheckbox").is(":checked")) {
            $("#StepThreeSubmitButton").removeAttr("disabled");
        } else {
            $("#StepThreeSubmitButton").attr("disabled", "disabled");
        }
    }
    /*
   * loan submit success handler
   */
    var _submitLoanApplicationSuccessHandler = function (reply) {
        $("#LoadingDiv").hide();
        $("#ProcessingRequestDiv").hide();
        //if reply comes back, but it is empty:
        if (reply === "undefined" || reply.length === 0) {
            $("#ErrorDiv").show("normal");
            $("#ErrorDangerDiv").empty();
            $("#ErrorDangerDiv").text(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.dataLoadFailureMessage);  
        } else {
            var advancePayLoanDecisionMessageData = JSON.parse(reply);
            if (advancePayLoanDecisionMessageData.decisionMessage === "DataFailure") { // server data validation failure
                $("#ValidatorDiv").show("normal");
                $("#ValidatorDiv").empty();
                $("#ValidatorDiv").text("Sorry, some of the information you entered was not valid. Please try again.");
                $("#StepThreeDiv").show();
                return;
            } else {             
                $("#StepThreeDiv").hide();
                $("#ModalTitleLabel").text(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.modalTitleLabelApproved);
                // a valid decision message has been returned:
                if (advancePayLoanDecisionMessageData.decisionMessage.toLowerCase() === "approved") {
                    $("#DecisionMessageApprovedDiv").show("normal");
                    $("#ApprovedLoanNumberInfoSpan").empty();
                    $("#ApprovedDateSpan").empty();
                    $("#ApprovedLoanAmountSpan").empty();
                    $("#ApprovedDueDateSpan").empty();
                    $("#ApprovedFinanceChargeSpan").empty();
                    $("#ApprovedPaymentAmountSpan").empty();
                    $("#ApprovedAPRSpan").empty();
                    $("#ApprovedTransferPaymentSourcespan").empty();
                    $("#ApprovedLoanNumberInfoSpan").text(advancePayLoanDecisionMessageData.approvalInformation.LoanInformation);
                    $("#ApprovedDateSpan").text(_convertFromNetDate(advancePayLoanDecisionMessageData.approvalInformation.LoanDate));
                    $("#ApprovedLoanAmountSpan").html(HomeBanking.Utilities.Currency.FormatCentsToDollars(advancePayLoanDecisionMessageData.approvalInformation.LoanAmount) + " " + HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.decisionMessageApprovalLoanAmountExplanation);
                    $("#ApprovedDueDateSpan").text(_convertFromNetDate(advancePayLoanDecisionMessageData.approvalInformation.DueDate));
                    $("#ApprovedFinanceChargeSpan").html(HomeBanking.Utilities.Currency.FormatCentsToDollars(advancePayLoanDecisionMessageData.approvalInformation.FinanceCharge) + " " + HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.decisionMessageApprovalFinanceChargeExplanation);
                    $("#ApprovedPaymentAmountSpan").text(HomeBanking.Utilities.Currency.FormatCentsToDollars(advancePayLoanDecisionMessageData.approvalInformation.PaymentAmount));
                    $("#ApprovedAPRSpan").html(advancePayLoanDecisionMessageData.approvalInformation.AnnualPercentageRate + "%" + " " + HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.decisionMessageApprovalAPRExplanation);
                    $("#ApprovedTransferPaymentSourceSpan").text(advancePayLoanDecisionMessageData.approvalInformation.TransferPaymentSuffix);  
                    $("#DecisionMessageApprovedHeadingDiv").text(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.decisionMessageApprovedHeading);
                    $("#DecisionMessageApprovedFinePrintDiv").html(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.decisionMessageApprovedFinePrint);
                    $("#ApprovedApplicantNameSpan").text(_applicantName);
                    $("#DecisionMessageApprovedSubheadDiv").html(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.decisionMessageApprovedSubhead);
                } else if (advancePayLoanDecisionMessageData.decisionMessage.toLowerCase() === "denied") {
                    $("#DecisionMessageDeniedDiv").show("normal");
                    $("#DeniedChargeOffsSpan").empty();
                    $("#DeniedSkipGuardSpan").empty();
                    $("#DeniedConsumerDisputeSpan").empty();
                    $("#DeniedSocialGuardSpan").empty();
                    // show only the errors that are pertinant:
                    if (advancePayLoanDecisionMessageData.deniedInformation.HasChargeOff === true) {
                        $("#DeniedChargeOffsDiv").show();
                        $("#DeniedChargeOffsSpan").text(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.chargeOffMessage);
                    }
                    if (advancePayLoanDecisionMessageData.deniedInformation.HasSkipGuard === true) {
                        $("#DeniedSkipGuardDiv").show();
                        $("#DeniedSkipGuardSpan").text(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.skipGuardMessage);
                    }
                    if (advancePayLoanDecisionMessageData.deniedInformation.HasConsumerDispute === true) {
                        $("#DeniedConsumerDisputeDiv").show();
                        $("#DeniedConsumerDisputeSpan").text(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.consumerDisputeMessage);
                    }
                    if (advancePayLoanDecisionMessageData.deniedInformation.HasSocialGuard === true) {
                        $("#DeniedSocialGuardDiv").show();
                        $("#DeniedSocialGuardSpan").text(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.socialGuardMessage);
                    }
                    $("#DecisionMessageDeniedHeadingDiv").text(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.decisionMessageDeniedHeading);
                    var deniedSubheadMessage = HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.decisionMessageDeniedSubhead;
                    var regex = /\[LOAN_AMOUNT\]/;
                    deniedSubheadMessage = deniedSubheadMessage.replace(regex, ("$" + _amountSeeking));
                    $("#DecisionMessageDeniedSubheadDiv").html(deniedSubheadMessage);
                    $("#DecisionMessageDeniedNameDiv").text(_applicantName);
                    $("#DecisionMessageDeniedFinePrintDiv").html(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.decisionMessageDeniedFinePrint);
                } else if (advancePayLoanDecisionMessageData.decisionMessage.toLowerCase() === "failure") {
                    $("#DecisionMessageFailureDiv").show("normal");
                    $("#DecisionMessageFailureHeadingDiv").text(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.decisionMessageFailureHeading);
                    $("#DecisionMessageFailureNameDiv").text(_applicantName);
                    $("#DecisionMessageFailureFinePrintDiv").html(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.decisionMessageFailure);
                }
            }
        }
    }
    /*
    * Loan submit failure handler
    */
    var _submitLoanApplicationFailureHandler = function () {
        _resetAll();
        $("#LoadingDiv").hide();
        $("#ProcessingRequestDiv").hide();
        $("#ErrorDiv").show("normal");
        $("#ErrorDangerDiv").text(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.dataLoadFailureMessage);   
    }
    /*
    * Validate Step three "submit" button click
    */
    var _validateStepThree = function () {
        if ($("#DepositSuffixDropDownList").val() === "None" || $("#LoanAmountsDropDownList").val() === "None") {
            $("#ValidatorDiv").show("normal");
            $("#ValidatorDiv").empty();
            $("#ValidatorDiv").html(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.stepOneValitatorMessage);   
 
            // show validation errors client side:
            if ($("#LoanAmountsDropDownList").val() === "None") {
                $("#LoanAmountsDropDownList").parent().addClass("has-error");
                $("#ValidatorDiv").append("<br>&bull; Please select the desired loan amount.");
            } else {
                $("#LoanAmountsDropDownList").parent().removeClass("has-error");
            }
            if ($("#DepositSuffixDropDownList").val() === "None") {
                $("#DepositSuffixDropDownList").parent().addClass("has-error");
                $("#ValidatorDiv").append("<br>&bull; Please select a suffix to deposit the funds into.");
            } else {
                $("#DepositSuffixDropDownList").parent().removeClass("has-error");
            }
        } else {
            _amountSeeking = $("#LoanAmountsDropDownList").val();
            _selectedSuffix = $("#DepositSuffixDropDownList").val();
            $.ajax(
                {
                    cache: false,
                    context: this,
                    dataType: "json",
                    error: _submitLoanApplicationFailureHandler,
                    success: _submitLoanApplicationSuccessHandler,
                    type: "Post",
                    data: {
                        LoanAmount: _amountSeeking,
                        DepositSuffix: _selectedSuffix,
                        accountNumber: _selectedAccountNumber,
                        applicantName: _applicantName,
                        ssn: _socialSecurityNumber,
                        birthdate: _birthdateString,
                        address_1: _address_1,
                        address_2: _address_2,
                        city: _city,
                        state: _state,
                        zipCode: _zipCode,
                        homePhone: _homePhone,
                        workPhone: _workPhone,
                        employer: _employer
                    },
                    url: HomeBanking.BASE_URL + "api/AdvancePay/get-decision-message/"
                }
            );
            _resetAll();
            $("#ProcessingRequestDiv").show("normal");
            $("#ProcessingRequestDiv").text(HomeBanking.Controls.ApplyForAdvancePayLoan.Resources.processingRequestMessage);
        }
    }
 
    // END PRIVATE METHODS
    // END PRIVATE METHODS
    // END PRIVATE METHODS
    // END PRIVATE METHODS
    // END PRIVATE METHODS
 
    /* *
     * Public Interface
     */
    return {
        /* *
        * Initializes the Apply for Advance Pay loan module.
        * 
        * @param {Object} aoClientIds An object for mapping ASP.NET IDs to client IDs.
        */
        initialize: function (aoClientIDs) {
            $("#StepOneCancelButton").on("click", _hideModal);
            $("#StepTwoCancelButton").on("click", _hideModal);
            $("#StepThreeCancelButton").on("click", _hideModal);
            $("#StepOneNextButton").on("click", _validateStepOne);
            $("#StepTwoPreviousButton").on("click", _returnToStepOne);
            $("#StepTwoNextButton").on("click", _validateStepTwo);
            $("#MilitaryMessageCancelButton").on("click", _hideModal);
            $("#AgreeToTermsCheckbox").on("change", _checkAgreementTerms);
            $("#StepThreeSubmitButton").on("click", _validateStepThree);
            $("#StepFourCloseButton").on("click", _hideModal);
            $("#DecisionMessageApprovedCloseButton").on("click", _hideModalWithReload);
            $("#DecisionMessageDeniedCloseButton").on("click", _hideModalWithReload);
            $("#DecisionMessageFailureCloseButton").on("click", _hideModalWithReload);
            $("#ErrorMessageCancelButton").on("click", _hideModal);
        },
        setUpAndLoadData: function () {
            _resetAll();
            _loadQualifyingApplicantsData();  // This is called from Controls/AccountAccess/Summary/LoanSummary.ascx, AdvancePay/AdvancePayApplyForLoanMobile.aspx, and Assets\js\page-specific\accountaccess\dashboard-widgets\account-overview.js
        }
    };
}());   // end automatic function

/* ==========================================================
                     VALIDATION.JS
                       MILAN SETU

                     ENGLISH ONLY
                      9 FORM STEPS
                    TWO PDF TEMPLATES

                 UPDATED FORM STRUCTURE
                  WORK & CAREER ADDED
                  BAAN DETAILS REMOVED
========================================================== */


/* ==========================================================
                 VALIDATION CONFIGURATION
========================================================== */

const VALIDATION = {

    debug: false,

    mobileLength: 10,

    minimumIncome: 1,

    maximumImageSize: 5 * 1024 * 1024,

    supportedImageTypes: [

        "image/jpeg",

        "image/jpg",

        "image/png",

        "image/webp"

    ]

};


/* ==========================================================
                    VALIDATION STATE
========================================================== */

const VALIDATION_STATE = {

    initialized: false,

    currentStepValid: false,

    completeFormValid: false

};


/* ==========================================================
                    ERROR MESSAGES
========================================================== */

const VALIDATION_MESSAGES = {

    required: "This field is required.",

    name: "Please enter a valid name.",

    mobile: "Enter a valid 10-digit Indian mobile number.",

    income: "Enter a valid income.",

    date: "Please select a valid date.",

    futureDate: "Future date is not allowed.",

    number: "Only numeric values are allowed.",

    photo: "Please upload a profile photo.",

    imageType:
        "Only JPG, JPEG, PNG and WEBP images are allowed.",

    imageSize:
        "Image size must not exceed 5 MB.",

    time:
        "Please select a complete time of birth.",

    length:
        "The maximum character limit has been exceeded."

};


/* ==========================================================
                    INITIALIZATION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeValidation();

});


/* ==========================================================
                    INITIALIZE MODULE
========================================================== */

function initializeValidation() {

    VALIDATION_STATE.initialized = true;

    validationLog(
        "Validation Module Initialized"
    );

}


/* ==========================================================
                    DEBUG LOGGER
========================================================== */

function validationLog(message, data = "") {

    if (!VALIDATION.debug) {
        return;
    }

    console.group("[Validation]");

    console.log(message);

    if (data !== "") {
        console.log(data);
    }

    console.groupEnd();

}


/* ==========================================================
                    HELPER FUNCTIONS
========================================================== */


/* ==========================================================
                    GET ELEMENT
========================================================== */

function getField(id) {

    return document.getElementById(id);

}


/* ==========================================================
                    GET VALUE
========================================================== */

function getValue(id) {

    const element = getField(id);

    if (!element) {
        return "";
    }

    return String(element.value || "").trim();

}


/* ==========================================================
                    CHECK EMPTY
========================================================== */

function isEmpty(value) {

    return String(value ?? "").trim() === "";

}


/* ==========================================================
                    SHOW ALERT
========================================================== */

function validationMessage(message) {

    alert(message);

}


/* ==========================================================
                    EXPORT FUNCTIONS
========================================================== */

window.getValue = getValue;

window.getField = getField;

window.isEmpty = isEmpty;


/* ==========================================================
               COMMON VALIDATION FUNCTIONS
========================================================== */


/* ==========================================================
                    VALIDATE ANNUAL INCOME

                    DESCRIPTIVE TEXT
========================================================== */

function isValidIncome(value) {

    const incomeText =
        String(value ?? "").trim();

    if (incomeText === "") {
        return false;
    }

    /*
        Accepted examples:

        500000
        ₹5,00,000
        5 LPA
        5 Lakhs
        ₹50,000 per month

        This is a descriptive field.
    */

    if (incomeText.length > 25) {
        return false;
    }

    return /[\p{L}\p{N}]/u.test(incomeText);

}


/* ==========================================================
                    VALIDATE NUMERIC VALUE
========================================================== */

function isValidNumber(value) {

    const pattern = /^[0-9]+$/;

    return pattern.test(
        String(value ?? "").trim()
    );

}


/* ==========================================================
                    VALIDATE DATE

                    YYYY-MM-DD
========================================================== */

function isValidDate(value) {

    const dateString =
        String(value ?? "").trim();

    if (
        !/^\d{4}-\d{2}-\d{2}$/.test(dateString)
    ) {
        return false;
    }

    const parts = dateString.split("-");

    const year = Number(parts[0]);

    const month = Number(parts[1]);

    const day = Number(parts[2]);

    const selectedDate =
        new Date(year, month - 1, day);

    /*
        Reject invalid dates such as
        2026-02-30.
    */

    if (
        selectedDate.getFullYear() !== year ||
        selectedDate.getMonth() !== month - 1 ||
        selectedDate.getDate() !== day
    ) {
        return false;
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return selectedDate <= today;

}


/* ==========================================================
                    VALIDATE HEIGHT
========================================================== */

function isValidHeight(value) {

    return String(value ?? "").trim() !== "";

}


/* ==========================================================
                    VALIDATE MAX LENGTH
========================================================== */

function isValidLength(value, maxLength) {

    return (
        String(value ?? "").trim().length <= maxLength
    );

}


/* ==========================================================
                    VALIDATE PHOTO
========================================================== */

function isValidPhoto() {

    return Boolean(

        typeof biodata !== "undefined" &&

        biodata.photos &&

        biodata.photos.profilePhoto &&

        biodata.photos.profilePhoto.preview

    );

}


/* ==========================================================
                    VALIDATE IMAGE TYPE
========================================================== */

function isValidImageType(file) {

    if (!file) {
        return false;
    }

    return VALIDATION.supportedImageTypes.includes(
        file.type
    );

}


/* ==========================================================
                    VALIDATE IMAGE SIZE
========================================================== */

function isValidImageSize(file) {

    if (!file) {
        return false;
    }

    return (
        file.size > 0 &&
        file.size <= VALIDATION.maximumImageSize
    );

}


/* ==========================================================
                    VALIDATE REQUIRED FIELD
========================================================== */

function isRequired(id) {

    return !isEmpty(getValue(id));

}


/* ==========================================================
                    VALIDATE OPTIONAL FIELD LENGTH
========================================================== */

function validateOptionalLength(id, maxLength) {

    const field = getField(id);

    if (!field) {
        return true;
    }

    const value = getValue(id);

    if (isEmpty(value)) {

        clearError(id);

        return true;

    }

    if (!isValidLength(value, maxLength)) {

        showError(
            id,
            `Maximum ${maxLength} characters allowed.`
        );

        return false;

    }

    clearError(id);

    return true;

}


/* ==========================================================
                    VALIDATE MOBILE NUMBER

                    INDIAN MOBILE NUMBER
========================================================== */

function isValidMobile(value) {

    const mobile =
        String(value ?? "")
            .replace(/[\s()-]/g, "")
            .trim();

    /*
        Accept:

        9876543210
        +919876543210
        919876543210

        Indian mobile numbers begin with 6-9.
    */

    return /^(?:\+?91)?[6-9]\d{9}$/.test(mobile);

}


/* ==========================================================
                    EXPORT FUNCTIONS
========================================================== */

window.isValidIncome = isValidIncome;

window.isValidNumber = isValidNumber;

window.isValidDate = isValidDate;

window.isValidHeight = isValidHeight;

window.isValidPhoto = isValidPhoto;

window.isRequired = isRequired;

window.isValidMobile = isValidMobile;


/* ==========================================================
                    CHARACTER COUNTER
========================================================== */

function initializeCharacterCounter(
    id,
    maxLength,
    type = "characters"
) {

    const field =
        document.getElementById(id);

    const counter =
        document.getElementById(id + "Counter");

    if (!field || !counter) {
        return;
    }

    /*
        Prevent duplicate listeners.
    */

    if (
        field.dataset.characterCounterInitialized ===
        "true"
    ) {
        return;
    }

    field.dataset.characterCounterInitialized =
        "true";

    function updateCounter() {

        const remaining =
            maxLength - field.value.length;

        counter.textContent =
            remaining + " " + type + " remaining";

        if (remaining <= 10) {

            counter.classList.remove(
                "text-muted"
            );

            counter.classList.add(
                "text-danger"
            );

        } else {

            counter.classList.remove(
                "text-danger"
            );

            counter.classList.add(
                "text-muted"
            );

        }

    }

    field.addEventListener(
        "input",
        updateCounter
    );

    field.addEventListener(
        "change",
        updateCounter
    );

    updateCounter();

}


/* ==========================================================
                    ERROR DISPLAY FUNCTIONS
========================================================== */


/* ==========================================================
                    SHOW ERROR
========================================================== */

function showError(id, message) {

    const field = getField(id);

    if (!field) {
        return;
    }

    field.classList.remove("is-valid");

    field.classList.add("is-invalid");

    field.setAttribute(
        "aria-invalid",
        "true"
    );

    let error = field.nextElementSibling;

    if (
        !error ||
        !error.classList.contains("invalid-feedback")
    ) {

        error = document.createElement("div");

        error.className = "invalid-feedback";

        field.insertAdjacentElement(
            "afterend",
            error
        );

    }

    error.textContent = message;

    validationLog(
        "Field validation error",
        {
            field: id,
            message: message
        }
    );

}


/* ==========================================================
                    SHOW SUCCESS
========================================================== */

function showSuccess(id) {

    const field = getField(id);

    if (!field) {
        return;
    }

    field.classList.remove("is-invalid");

    field.classList.add("is-valid");

    field.removeAttribute("aria-invalid");

    const error = field.nextElementSibling;

    if (
        error &&
        error.classList.contains("invalid-feedback")
    ) {
        error.remove();
    }

}


/* ==========================================================
                    CLEAR ERROR
========================================================== */

function clearError(id) {

    const field = getField(id);

    if (!field) {
        return;
    }

    field.classList.remove("is-invalid");

    field.classList.remove("is-valid");

    field.removeAttribute("aria-invalid");

    const error = field.nextElementSibling;

    if (
        error &&
        error.classList.contains("invalid-feedback")
    ) {
        error.remove();
    }

}


/* ==========================================================
                    CLEAR ALL ERRORS
========================================================== */

function clearAllErrors() {

    const fields = document.querySelectorAll(
        "input, select, textarea"
    );

    fields.forEach(field => {

        field.classList.remove("is-invalid");

        field.classList.remove("is-valid");

        field.removeAttribute("aria-invalid");

        const error = field.nextElementSibling;

        if (
            error &&
            error.classList.contains("invalid-feedback")
        ) {
            error.remove();
        }

    });

}


/* ==========================================================
                    EXPORT FUNCTIONS
========================================================== */

window.showError = showError;

window.showSuccess = showSuccess;

window.clearError = clearError;

window.clearAllErrors = clearAllErrors;


/* ==========================================================
                    PERSONAL DETAILS VALIDATION

                    HTML FORM STEP 1
                       ABOUT ME
========================================================== */

function validatePersonal() {

    let valid = true;


    /* ======================================================
                    FULL NAME
                    REQUIRED
    ====================================================== */

    const fullName = getValue("fullName");

    if (isEmpty(fullName)) {

        showError(
            "fullName",
            "Full Name is required."
        );

        valid = false;

    } else if (
        !isValidLength(fullName, 20)
    ) {

        showError(
            "fullName",
            "Full Name cannot exceed 20 characters."
        );

        valid = false;

    } else {

        showSuccess("fullName");

    }


    /* ======================================================
                    DATE OF BIRTH
                    REQUIRED
    ====================================================== */

    const dob = getValue("dob");

    if (isEmpty(dob)) {

        showError(
            "dob",
            "Date of Birth is required."
        );

        valid = false;

    } else if (!isValidDate(dob)) {

        showError(
            "dob",
            "Please select a valid date that is not in the future."
        );

        valid = false;

    } else {

        showSuccess("dob");

    }


    /* ======================================================
                    TIME OF BIRTH
                    OPTIONAL

        If one part is entered,
        all three must be selected.
    ====================================================== */

    const birthHour =
        getValue("birthHour");

    const birthMinute =
        getValue("birthMinute");

    const birthPeriod =
        getValue("birthPeriod");

    if (
        birthHour ||
        birthMinute ||
        birthPeriod
    ) {

        if (
            !birthHour ||
            !birthMinute ||
            !birthPeriod
        ) {

            if (!birthHour) {

                showError(
                    "birthHour",
                    VALIDATION_MESSAGES.time
                );

            } else {
                clearError("birthHour");
            }

            if (!birthMinute) {

                showError(
                    "birthMinute",
                    VALIDATION_MESSAGES.time
                );

            } else {
                clearError("birthMinute");
            }

            if (!birthPeriod) {

                showError(
                    "birthPeriod",
                    VALIDATION_MESSAGES.time
                );

            } else {
                clearError("birthPeriod");
            }

            valid = false;

        } else {

            clearError("birthHour");

            clearError("birthMinute");

            clearError("birthPeriod");

        }

    } else {

        clearError("birthHour");

        clearError("birthMinute");

        clearError("birthPeriod");

    }


    /* ======================================================
                    PLACE OF BIRTH
                    OPTIONAL
    ====================================================== */

    if (
        !validateOptionalLength(
            "placeOfBirth",
            25
        )
    ) {
        valid = false;
    }


    /* ======================================================
                    RELIGION
                    OPTIONAL
    ====================================================== */

    if (
        !validateOptionalLength(
            "religion",
            20
        )
    ) {
        valid = false;
    }


    /* ======================================================
                    GOTRA
                    OPTIONAL
    ====================================================== */

    if (
        !validateOptionalLength(
            "gotra",
            20
        )
    ) {
        valid = false;
    }


    /* ======================================================
                    CASTE
                    OPTIONAL
    ====================================================== */

    clearError("caste");


    /* ======================================================
                    SUB CASTE
                    NEW FIELD
                    OPTIONAL
    ====================================================== */

    if (
        !validateOptionalLength(
            "subCaste",
            25
        )
    ) {
        valid = false;
    }


    /* ======================================================
                    RASHI
                    OPTIONAL
    ====================================================== */

    if (
        !validateOptionalLength(
            "rashi",
            20
        )
    ) {
        valid = false;
    }


    /* ======================================================
                    GAN
                    OPTIONAL
    ====================================================== */

    clearError("gan");


    /* ======================================================
                    MANGLIK STATUS
                    OPTIONAL
    ====================================================== */

    clearError("manglik");


    /* ======================================================
                    MARITAL STATUS
                    OPTIONAL
    ====================================================== */

    clearError("maritalStatus");


    /* ======================================================
                    DIET
                    OPTIONAL
    ====================================================== */

    clearError("diet");


    /* ======================================================
                    HEIGHT
                    OPTIONAL
    ====================================================== */

    if (
        !validateOptionalLength(
            "height",
            20
        )
    ) {
        valid = false;
    }


    /* ======================================================
                    COMPLEXION
                    OPTIONAL
    ====================================================== */

    if (
        !validateOptionalLength(
            "complexion",
            20
        )
    ) {
        valid = false;
    }


    /* ======================================================
                    NATIVE PLACE
                    OPTIONAL
    ====================================================== */

    if (
        !validateOptionalLength(
            "nativePlace",
            25
        )
    ) {
        valid = false;
    }


    /* ======================================================
                    LANGUAGE
                    OPTIONAL
    ====================================================== */

    if (
        !validateOptionalLength(
            "language",
            25
        )
    ) {
        valid = false;
    }


    /* ======================================================
                    HOBBIES
                    OPTIONAL
    ====================================================== */

    if (
        !validateOptionalLength(
            "hobbies",
            25
        )
    ) {
        valid = false;
    }


    /* ======================================================
                    OTHERS
                    OPTIONAL
    ====================================================== */

    if (
        !validateOptionalLength(
            "other",
            25
        )
    ) {
        valid = false;
    }

    return valid;

}


/* ==========================================================
                    EXPORT FUNCTION
========================================================== */

window.validatePersonal = validatePersonal;


/* ==========================================================
                    EDUCATION DETAILS VALIDATION

                    HTML FORM STEP 2
                  EDUCATION & SKILLS
========================================================== */

function validateEducation() {

    let valid = true;


    /* QUALIFICATION */

    if (
        !validateOptionalLength(
            "highestQualification",
            25
        )
    ) {
        valid = false;
    }


    /* COLLEGE */

    if (
        !validateOptionalLength(
            "college",
            25
        )
    ) {
        valid = false;
    }


    /* 12th BOARD */

    if (
        !validateOptionalLength(
            "Board12th",
            25
        )
    ) {
        valid = false;
    }


    /* 10th BOARD */

    if (
        !validateOptionalLength(
            "Board10th",
            25
        )
    ) {
        valid = false;
    }


    /* SPECIAL SKILL */

    if (
        !validateOptionalLength(
            "specialSkill",
            25
        )
    ) {
        valid = false;
    }


    /* EDUCATION OTHER */

    if (
        !validateOptionalLength(
            "educationOther",
            25
        )
    ) {
        valid = false;
    }

    return valid;

}


/* ==========================================================
                    EXPORT FUNCTION
========================================================== */

window.validateEducation = validateEducation;


/* ==========================================================
                    FAMILY DETAILS VALIDATION

                    HTML FORM STEP 3
                      ABOUT FAMILY
========================================================== */

function validateFamily() {

    let valid = true;


    /* FATHER'S NAME */

    if (
        !validateOptionalLength(
            "fatherName",
            25
        )
    ) {
        valid = false;
    }


    /* FATHER'S OCCUPATION */

    if (
        !validateOptionalLength(
            "fatherOccupation",
            25
        )
    ) {
        valid = false;
    }


    /* MOTHER'S NAME */

    if (
        !validateOptionalLength(
            "motherName",
            25
        )
    ) {
        valid = false;
    }


    /* MOTHER'S OCCUPATION */

    if (
        !validateOptionalLength(
            "motherOccupation",
            25
        )
    ) {
        valid = false;
    }


    /* SIBLINGS DETAILS */

    if (
        !validateOptionalLength(
            "siblingsDetails",
            40
        )
    ) {
        valid = false;
    }

    return valid;

}


/* ==========================================================
                    EXPORT FUNCTION
========================================================== */

window.validateFamily = validateFamily;


/* ==========================================================
                    WORK & CAREER VALIDATION

                    HTML FORM STEP 4
                  REPLACES DETAILS OF BAAN
========================================================== */

function validateWork() {

    let valid = true;


    /* ======================================================
                    PROFESSION
                    OPTIONAL
    ====================================================== */

    if (
        !validateOptionalLength(
            "profession",
            25
        )
    ) {
        valid = false;
    }


    /* ======================================================
                    DESIGNATION
                    OPTIONAL
    ====================================================== */

    if (
        !validateOptionalLength(
            "designation",
            25
        )
    ) {
        valid = false;
    }


    /* ======================================================
                    ORGANIZATION
                    OPTIONAL
    ====================================================== */

    if (
        !validateOptionalLength(
            "organization",
            25
        )
    ) {
        valid = false;
    }


    /* ======================================================
                    WORK PLACE
                    OPTIONAL
    ====================================================== */

    if (
        !validateOptionalLength(
            "workPlace",
            25
        )
    ) {
        valid = false;
    }


    /* ======================================================
                    ANNUAL INCOME
                    OPTIONAL

        Accepts descriptive values such as ₹5 LPA.
    ====================================================== */

    const income = getValue("income");

    if (isEmpty(income)) {

        clearError("income");

    } else if (
        !isValidLength(income, 25) ||
        !isValidIncome(income)
    ) {

        showError(
            "income",
            "Please enter a valid income within 25 characters."
        );

        valid = false;

    } else {

        clearError("income");

    }

    return valid;

}


/* ==========================================================
                    EXPORT FUNCTION
========================================================== */

window.validateWork = validateWork;


/* ==========================================================
                    PARTNER PREFERENCE VALIDATION

                    HTML FORM STEP 5
========================================================== */

function validatePartner() {

    let valid = true;


    /* PREFERRED QUALIFICATION */

    if (
        !validateOptionalLength(
            "preferredQualification",
            25
        )
    ) {
        valid = false;
    }


    /* PREFERRED PROFESSION */

    if (
        !validateOptionalLength(
            "preferredProfession",
            25
        )
    ) {
        valid = false;
    }


    /* PREFERRED LOCATION */

    if (
        !validateOptionalLength(
            "preferredLocation",
            25
        )
    ) {
        valid = false;
    }


    /* PREFERRED CASTE */

    if (
        !validateOptionalLength(
            "preferredCaste",
            25
        )
    ) {
        valid = false;
    }


    /* OTHERS */

    if (
        !validateOptionalLength(
            "otherExpectations",
            25
        )
    ) {
        valid = false;
    }

    return valid;

}


/* ==========================================================
                    EXPORT FUNCTION
========================================================== */

window.validatePartner = validatePartner;


/* ==========================================================
                    CONTACT DETAILS VALIDATION

                    HTML FORM STEP 6
                  CONTACT AND ADDRESS
========================================================== */

function validateContact() {

    let valid = true;



    /* ======================================================
                        MOBILE NUMBER
                        REQUIRED
                        NO FORMAT VALIDATION
    ====================================================== */

    const mobile = getValue("mobileNumber");

    if (isEmpty(mobile)) {

        showError(
            "mobileNumber",
            "Contact Number is required."
        );

        valid = false;

    } else {

        showSuccess("mobileNumber");

    }




    /* ======================================================
                        RELATION
                        REQUIRED
    ====================================================== */

    const relation = getValue("relation");

    if (isEmpty(relation)) {

        showError(
            "relation",
            "Relation is required."
        );

        valid = false;

    } else if (
        !isValidLength(relation, 25)
    ) {

        showError(
            "relation",
            "Relation cannot exceed 25 characters."
        );

        valid = false;

    } else {

        showSuccess("relation");

    }



    /* ======================================================
                    CURRENT ADDRESS
                    OPTIONAL
    ====================================================== */

    if (
        !validateOptionalLength(
            "currentAddress",
            75
        )
    ) {
        valid = false;
    }


    /* ======================================================
                    PERMANENT ADDRESS
                    OPTIONAL
    ====================================================== */

    if (
        !validateOptionalLength(
            "permanentAddress",
            75
        )
    ) {
        valid = false;
    }

    return valid;

}


/* ==========================================================
                    EXPORT FUNCTION
========================================================== */

window.validateContact = validateContact;


/* ==========================================================
                    DECLARATION VALIDATION

                   LEGACY COMPATIBILITY

              NOT A SEPARATE FORM STEP
========================================================== */

function validateDeclaration() {

    let valid = true;


    /*
        Declaration fields are no longer part
        of the active nine-step HTML form.

        Validate them only if they exist.
        Do not block the form because these
        legacy inputs are missing.
    */


    const declarationField =
        getField("declaration");

    if (declarationField) {

        if (
            isEmpty(getValue("declaration"))
        ) {

            showError(
                "declaration",
                "Declaration text is required."
            );

            valid = false;

        } else {

            clearError("declaration");

        }

    }


    if (
        !validateOptionalLength(
            "senderName",
            20
        )
    ) {
        valid = false;
    }


    const senderMobileField =
        getField("senderMobile");

    if (senderMobileField) {

        const senderMobile =
            getValue("senderMobile");

        if (
            !isEmpty(senderMobile) &&
            !isValidMobile(senderMobile)
        ) {

            showError(
                "senderMobile",
                VALIDATION_MESSAGES.mobile
            );

            valid = false;

        } else {

            clearError("senderMobile");

        }

    }

    return valid;

}


/* ==========================================================
                    EXPORT FUNCTION
========================================================== */

window.validateDeclaration = validateDeclaration;


/* ==========================================================
                    PHOTO VALIDATION

                    HTML FORM STEP 7
========================================================== */

function validatePhoto() {

    let valid = true;


    /* ======================================================
                    PROFILE PHOTO
                    REQUIRED
    ====================================================== */

    if (!isValidPhoto()) {

        showError(
            "profilePhotoUpload",
            VALIDATION_MESSAGES.photo
        );

        valid = false;

    } else {

        showSuccess(
            "profilePhotoUpload"
        );

    }


    /* ======================================================
                    IMAGE TYPE AND SIZE

        Restored images are accepted from biodata.
    ====================================================== */

    const photoInput =
        getField("profilePhotoUpload");

    const selectedFile =
        photoInput?.files?.[0];

    if (selectedFile) {

        if (
            !isValidImageType(selectedFile)
        ) {

            showError(
                "profilePhotoUpload",
                VALIDATION_MESSAGES.imageType
            );

            valid = false;

        } else if (
            !isValidImageSize(selectedFile)
        ) {

            showError(
                "profilePhotoUpload",
                VALIDATION_MESSAGES.imageSize
            );

            valid = false;

        }

    }

    return valid;

}


/* ==========================================================
                    EXPORT FUNCTION
========================================================== */

window.validatePhoto = validatePhoto;


/* ==========================================================
                    TEMPLATE VALIDATION

                    HTML FORM STEP 8
========================================================== */

function validateTemplate() {

    const selectedTemplate =
        document.querySelector(
            'input[name="biodataTemplate"]:checked'
        );

    const allowedTemplates =
        typeof FORM_CONFIG !== "undefined"
            ? FORM_CONFIG.allowedTemplates
            : ["template1", "template2"];

    if (
        !selectedTemplate ||
        !allowedTemplates.includes(
            selectedTemplate.value
        )
    ) {

        validationMessage(
            "Please select a valid biodata template."
        );

        return false;

    }

    return true;

}


/* ==========================================================
                    EXPORT FUNCTION
========================================================== */

window.validateTemplate = validateTemplate;


/* ==========================================================
                    CURRENT STEP VALIDATION

                    UPDATED 9-STEP MAPPING
========================================================== */

function validateCurrentStep(step) {

    let valid = true;

    switch (Number(step)) {

        /* STEP 1 - ABOUT ME */

        case 1:

            valid = validatePersonal();

            break;


        /* STEP 2 - EDUCATION & SKILLS */

        case 2:

            valid = validateEducation();

            break;


        /* STEP 3 - ABOUT FAMILY */

        case 3:

            valid = validateFamily();

            break;


        /* STEP 4 - WORK & CAREER */

        case 4:

            valid = validateWork();

            break;


        /* STEP 5 - PARTNER PREFERENCES */

        case 5:

            valid = validatePartner();

            break;


        /* STEP 6 - CONTACT & ADDRESS */

        case 6:

            valid = validateContact();

            break;


        /* STEP 7 - PROFILE PHOTO */

        case 7:

            valid = validatePhoto();

            break;


        /* STEP 8 - CHOOSE TEMPLATE */

        case 8:

            valid = validateTemplate();

            break;


        /* STEP 9 - REVIEW & CONFIRM */

        case 9:

            valid = true;

            break;


        default:

            valid = false;

            break;

    }


    VALIDATION_STATE.currentStepValid = valid;

    return valid;

}


/* ==========================================================
                    EXPORT FUNCTION
========================================================== */

window.validateCurrentStep = validateCurrentStep;


/* ==========================================================
                    COMPLETE FORM VALIDATION

                    ALL NINE STEPS
========================================================== */

function validateCompleteForm() {

    clearAllErrors();

    let valid = true;

    let firstInvalidStep = null;


    /* STEP 1 - ABOUT ME */

    if (!validatePersonal()) {

        valid = false;

        firstInvalidStep ??= 1;

    }


    /* STEP 2 - EDUCATION & SKILLS */

    if (!validateEducation()) {

        valid = false;

        firstInvalidStep ??= 2;

    }


    /* STEP 3 - ABOUT FAMILY */

    if (!validateFamily()) {

        valid = false;

        firstInvalidStep ??= 3;

    }


    /* STEP 4 - WORK & CAREER */

    if (!validateWork()) {

        valid = false;

        firstInvalidStep ??= 4;

    }


    /* STEP 5 - PARTNER PREFERENCES */

    if (!validatePartner()) {

        valid = false;

        firstInvalidStep ??= 5;

    }


    /* STEP 6 - CONTACT & ADDRESS */

    if (!validateContact()) {

        valid = false;

        firstInvalidStep ??= 6;

    }


    /* STEP 7 - PHOTO UPLOAD */

    if (!validatePhoto()) {

        valid = false;

        firstInvalidStep ??= 7;

    }


    /* STEP 8 - TEMPLATE SELECTION */

    if (!validateTemplate()) {

        valid = false;

        firstInvalidStep ??= 8;

    }


    VALIDATION_STATE.completeFormValid =
        valid;


    if (!valid) {

        validationMessage(
            "Please complete all required fields " +
            "and correct invalid information."
        );


        /*
            Open the first invalid step so
            the user can correct its fields.
        */

        if (
            firstInvalidStep !== null &&
            typeof showStep === "function"
        ) {

            showStep(firstInvalidStep);

        }

    }

    return valid;

}


/* ==========================================================
                    EXPORT FUNCTION
========================================================== */

window.validateCompleteForm =
    validateCompleteForm;


/* ==========================================================
                    LIVE VALIDATION
========================================================== */


/* ==========================================================
                    ATTACH LIVE VALIDATION
========================================================== */

function initializeLiveValidation() {

    const fields = document.querySelectorAll(
        "#multiStepForm input, " +
        "#multiStepForm select, " +
        "#multiStepForm textarea"
    );


    fields.forEach(field => {

        if (
            field.dataset.liveValidationInitialized ===
            "true"
        ) {
            return;
        }


        field.dataset.liveValidationInitialized =
            "true";


        field.addEventListener(
            "keyup",
            validateField
        );


        field.addEventListener(
            "input",
            validateField
        );


        field.addEventListener(
            "change",
            validateField
        );


        field.addEventListener(
            "blur",
            validateField
        );

    });

}


/* ==========================================================
                    VALIDATE SINGLE FIELD
========================================================== */

function validateField(event) {

    const id = event.target.id;

    switch (id) {

        /* ==================================================
                    PERSONAL
                    STEP 1
        ================================================== */

        case "fullName":
        case "dob":
        case "birthHour":
        case "birthMinute":
        case "birthPeriod":
        case "placeOfBirth":
        case "religion":
        case "gotra":
        case "caste":
        case "subCaste":
        case "rashi":
        case "gan":
        case "manglik":
        case "maritalStatus":
        case "diet":
        case "height":
        case "complexion":
        case "nativePlace":
        case "language":
        case "hobbies":
        case "other":

            validatePersonal();

            break;


        /* ==================================================
                    EDUCATION & SKILLS
                    STEP 2
        ================================================== */

        case "highestQualification":
        case "college":
        case "Board10th":
        case "Board12th":
        case "specialSkill":
        case "educationOther":

            validateEducation();

            break;


        /* ==================================================
                    FAMILY
                    STEP 3
        ================================================== */

        case "fatherName":
        case "fatherOccupation":
        case "motherName":
        case "motherOccupation":
        case "siblingsDetails":

            validateFamily();

            break;


        /* ==================================================
                    WORK & CAREER
                    STEP 4
        ================================================== */

        case "profession":
        case "designation":
        case "organization":
        case "workPlace":
        case "income":

            validateWork();

            break;


        /* ==================================================
                    PARTNER
                    STEP 5
        ================================================== */

        case "preferredQualification":
        case "preferredProfession":
        case "preferredLocation":
        case "preferredCaste":
        case "otherExpectations":

            validatePartner();

            break;


        /* ==================================================
                    CONTACT & ADDRESS
                    STEP 6
        ================================================== */

        case "mobileNumber":
        case "relation":
        case "currentAddress":
        case "permanentAddress":

            validateContact();

            break;


        /* ==================================================
                    PHOTO
                    STEP 7
        ================================================== */

        case "profilePhotoUpload":

            /*
                gallery.js processes the photo
                asynchronously.

                Do not validate immediately on
                change before processing finishes.
            */

            if (
                event.type !== "change"
            ) {

                validatePhoto();

            }

            break;


        /* ==================================================
                    DECLARATION
                    LEGACY COMPATIBILITY
        ================================================== */

        case "declaration":
        case "senderName":
        case "senderMobile":

            validateDeclaration();

            break;


        default:

            break;

    }

}


/* ==========================================================
                    INITIALIZE LIVE VALIDATION
                    AND CHARACTER COUNTERS
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    function() {

        initializeLiveValidation();


        /* ==================================================
                    PERSONAL COUNTERS
                    STEP 1
        ================================================== */

        initializeCharacterCounter(
            "fullName",
            20
        );

        initializeCharacterCounter(
            "placeOfBirth",
            25
        );

        initializeCharacterCounter(
            "religion",
            20
        );

        initializeCharacterCounter(
            "gotra",
            20
        );


        initializeCharacterCounter(
            "caste",
            25
        );


        initializeCharacterCounter(
            "subCaste",
            25
        );

        initializeCharacterCounter(
            "rashi",
            20
        );

        initializeCharacterCounter(
            "height",
            20
        );

        initializeCharacterCounter(
            "complexion",
            20
        );

        initializeCharacterCounter(
            "nativePlace",
            25
        );

        initializeCharacterCounter(
            "language",
            25
        );

        initializeCharacterCounter(
            "hobbies",
            25
        );

        initializeCharacterCounter(
            "other",
            25
        );


        /* ==================================================
                    EDUCATION & SKILLS COUNTERS
                    STEP 2
        ================================================== */

        initializeCharacterCounter(
            "highestQualification",
            25
        );

        initializeCharacterCounter(
            "college",
            25
        );

        initializeCharacterCounter(
            "Board10th",
            25
        );

        initializeCharacterCounter(
            "Board12th",
            25
        );

        initializeCharacterCounter(
            "specialSkill",
            25
        );

        initializeCharacterCounter(
            "educationOther",
            25
        );


        /* ==================================================
                    FAMILY COUNTERS
                    STEP 3
        ================================================== */

        initializeCharacterCounter(
            "fatherName",
            25
        );

        initializeCharacterCounter(
            "fatherOccupation",
            25
        );

        initializeCharacterCounter(
            "motherName",
            25
        );

        initializeCharacterCounter(
            "motherOccupation",
            25
        );

        initializeCharacterCounter(
            "siblingsDetails",
            40
        );


        /* ==================================================
                    WORK & CAREER COUNTERS
                    STEP 4
        ================================================== */

        initializeCharacterCounter(
            "profession",
            25
        );

        initializeCharacterCounter(
            "designation",
            25
        );

        initializeCharacterCounter(
            "organization",
            25
        );

        initializeCharacterCounter(
            "workPlace",
            25
        );

        initializeCharacterCounter(
            "income",
            25
        );


        /* ==================================================
                    PARTNER COUNTERS
                    STEP 5
        ================================================== */

        initializeCharacterCounter(
            "preferredQualification",
            25
        );

        initializeCharacterCounter(
            "preferredProfession",
            25
        );

        initializeCharacterCounter(
            "preferredLocation",
            25
        );

        initializeCharacterCounter(
            "preferredCaste",
            25
        );

        initializeCharacterCounter(
            "otherExpectations",
            25
        );


        /* ==================================================
                    CONTACT & ADDRESS COUNTERS
                    STEP 6
        ================================================== */

        initializeCharacterCounter(
            "mobileNumber",
            15
        );

        initializeCharacterCounter(
            "relation",
            25
        );

        initializeCharacterCounter(
            "currentAddress",
            75
        );

        initializeCharacterCounter(
            "permanentAddress",
            75
        );


        /* ==================================================
                    LEGACY DECLARATION COUNTERS
                    OPTIONAL
        ================================================== */

        initializeCharacterCounter(
            "senderName",
            20
        );

        initializeCharacterCounter(
            "senderMobile",
            15
        );

    }

);


/* ==========================================================
                    END OF VALIDATION.JS
========================================================== */

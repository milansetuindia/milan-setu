
/* ==========================================================
                        STORAGE.JS
                       MILAN SETU

                     ENGLISH ONLY
                   TWO PDF TEMPLATES

                 WORK & CAREER SUPPORTED
                   UPDATED 9-STEP FORM

                       VERSION 3.0
========================================================== */


/* ==========================================================
                    STORAGE CONFIGURATION
========================================================== */

const STORAGE = {

    version: "3.0.0",

    debug: false,

    storageKey: "matrimonial_biodata",


    allowedTemplates: [
        "template1",
        "template2",
        "template3",
        "template4"
    ],


    defaultTemplate: "template1",

    defaultPhoto:
        "assets/images/defaults/default-profile.png"

};


/* ==========================================================
                    STORAGE CONSTANTS
========================================================== */

const STORAGE_CONSTANTS = {

    LOCAL_STORAGE: STORAGE.storageKey,

    DRAFT_FILE: "matrimonial_biodata.json"

};


/* ==========================================================
                    STORAGE MODULE
========================================================== */

const STORAGE_MODULE = {

    name: "Storage Module",

    version: "3.0.0",

    initialized: false,

    restoring: false,

    resetting: false

};


/* ==========================================================
                    INITIALIZATION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeStorageModule();

    initializeStorage();

});


function initializeStorageModule() {

    STORAGE_MODULE.initialized = true;

    storageSummary();

}


function initializeStorage() {

    if (loadBiodata()) {

        restoreForm();

    }

    initializeAutoSave();

    initializeExportButton();

    initializeImportButton();

    initializeClearButton();

    storageLog("Storage Initialized");

}


/* ==========================================================
                    DEBUG LOGGER
========================================================== */

function storageLog(message, data = "") {

    if (!STORAGE.debug) {
        return;
    }

    console.group("[Storage]");

    console.log(message);

    if (data !== "") {
        console.log(data);
    }

    console.groupEnd();

}


/* ==========================================================
                    STORAGE AVAILABILITY
========================================================== */

function isStorageAvailable() {

    try {

        const key = "__storage_test__";

        localStorage.setItem(key, key);

        localStorage.removeItem(key);

        return true;

    } catch (error) {

        console.error(
            "Local Storage Unavailable",
            error
        );

        return false;

    }

}


/* ==========================================================
                    GET STORAGE VALUE
========================================================== */

function getStorage(key) {

    if (!isStorageAvailable()) {
        return null;
    }

    try {

        return localStorage.getItem(key);

    } catch (error) {

        console.error(
            "Storage Read Failed",
            error
        );

        return null;

    }

}


/* ==========================================================
                    SET STORAGE VALUE
========================================================== */

function setStorage(key, value) {

    if (!isStorageAvailable()) {
        return false;
    }

    try {

        localStorage.setItem(key, value);

        return true;

    } catch (error) {

        console.error(
            "Storage Save Failed",
            error
        );

        return false;

    }

}


/* ==========================================================
                    REMOVE STORAGE VALUE
========================================================== */

function removeStorage(key) {

    try {

        localStorage.removeItem(key);

        return true;

    } catch (error) {

        console.error(
            "Storage Remove Failed",
            error
        );

        return false;

    }

}


/* ==========================================================
                    VALID TEMPLATE
========================================================== */

function getValidTemplate(templateId) {

    if (
        STORAGE.allowedTemplates.includes(templateId)
    ) {

        return templateId;

    }

    return STORAGE.defaultTemplate;

}


/* ==========================================================
                    NORMALIZE BIODATA OBJECT

            SAME STRUCTURE FOR BOTH PDF TEMPLATES

                  UPDATED 9-STEP FORM

             REMOVE OLD BAAN DATA STRUCTURE
========================================================== */

function normalizeBiodata(data = {}) {

    const source =
        data &&
        typeof data === "object" &&
        !Array.isArray(data)
            ? data
            : {};


    const section = value =>
        value &&
        typeof value === "object" &&
        !Array.isArray(value)
            ? { ...value }
            : {};


    /* ======================================================
                    SOURCE SECTIONS
    ====================================================== */

    const personal = section(source.personal);

    const education = section(source.education);

    const work = section(source.work);

    const family = section(source.family);

    const partner = section(source.partner);

    const contact = section(source.contact);

    const declaration = section(source.declaration);

    const photos = section(source.photos);


    /* ======================================================
                    PERSONAL DETAILS

                    STEP 1 - ABOUT ME
    ====================================================== */

    const normalizedPersonal = {

        fullName:
            personal.fullName || "",

        dob:
            personal.dob || "",

        timeOfBirth:
            personal.timeOfBirth || "",

        placeOfBirth:
            personal.placeOfBirth || "",

        religion:
            personal.religion || "",

        gotra:
            personal.gotra || "",

        caste:
            personal.caste || "",

        subCaste:
            personal.subCaste || "",

        rashi:
            personal.rashi || "",

        gan:
            personal.gan || "",

        manglik:
            personal.manglik || "",

        maritalStatus:
            personal.maritalStatus || "",

        diet:
            personal.diet || "",

        height:
            personal.height || "",

        complexion:
            personal.complexion || "",

        nativePlace:
            personal.nativePlace || "",

        language:
            personal.language || "",

        hobbies:
            personal.hobbies || "",

        other:
            personal.other || ""

    };


    /* ======================================================
                    EDUCATION & SKILLS

                    STEP 2 - SIX FIELDS
    ====================================================== */

    const normalizedEducation = {

        highestQualification:
            education.highestQualification || "",

        college:
            education.college || "",

        Board12th:
            education.Board12th || "",

        Board10th:
            education.Board10th || "",

        specialSkill:
            education.specialSkill || "",

        educationOther:
            education.educationOther || ""

    };


    /* ======================================================
                    WORK & CAREER

                    STEP 4 - FIVE FIELDS

                    REPLACES DETAILS OF BAAN
    ====================================================== */

    const normalizedWork = {

        profession:
            work.profession ||
            education.profession ||
            "",

        designation:
            work.designation || "",

        organization:
            work.organization || "",

        workPlace:
            work.workPlace || "",

        income:
            work.income ||
            education.income ||
            ""

    };


    /* ======================================================
                    ABOUT FAMILY

                    STEP 3 - FIVE FIELDS
    ====================================================== */

    const normalizedFamily = {

        fatherName:
            family.fatherName || "",

        fatherOccupation:
            family.fatherOccupation || "",

        motherName:
            family.motherName || "",

        motherOccupation:
            family.motherOccupation || "",

        siblingsDetails:
            family.siblingsDetails || ""

    };


    /* ======================================================
                    PARTNER'S PREFERENCES

                    STEP 5 - FIVE FIELDS
    ====================================================== */

    const normalizedPartner = {

        preferredQualification:
            partner.preferredQualification || "",

        preferredProfession:
            partner.preferredProfession || "",

        preferredLocation:
            partner.preferredLocation || "",

        preferredCaste:
            partner.preferredCaste || "",

        otherExpectations:
            partner.otherExpectations || ""

    };


    /* ======================================================
                    CONTACT DETAILS AND ADDRESS

                    STEP 6
    ====================================================== */

    const normalizedContact = {

        mobileNumber:
            contact.mobileNumber || "",

        relation:
            contact.relation || "",

        currentAddress:
            contact.currentAddress || "",

        permanentAddress:
            contact.permanentAddress || ""

    };


    /* ======================================================
                    DECLARATION

                    KEPT FOR BACKWARD COMPATIBILITY

                    NOT A SEPARATE FORM STEP
    ====================================================== */

    const normalizedDeclaration = {

        declaration:
            declaration.declaration || "",

        senderName:
            declaration.senderName || "",

        senderMobile:
            declaration.senderMobile || ""

    };


    /* ======================================================
                    PROFILE PHOTO

                    STEP 7
    ====================================================== */

    const normalizedPhotos = {};

    if (
        photos.profilePhoto &&
        typeof photos.profilePhoto === "object" &&
        typeof photos.profilePhoto.preview === "string" &&
        photos.profilePhoto.preview.startsWith(
            "data:image/"
        )
    ) {

        normalizedPhotos.profilePhoto = {

            preview:
                photos.profilePhoto.preview

        };

    }


    /* ======================================================
                    RETURN NORMALIZED DATA

                    OLD BAAN SECTION REMOVED
    ====================================================== */

    return {

        personal: normalizedPersonal,

        education: normalizedEducation,

        work: normalizedWork,

        family: normalizedFamily,

        partner: normalizedPartner,

        contact: normalizedContact,

        declaration: normalizedDeclaration,

        photos: normalizedPhotos,

        template:
            getValidTemplate(source.template)

    };

}


/* ==========================================================
                    APPLY BIODATA DATA
========================================================== */

function applyBiodataData(data) {

    const normalized =
        normalizeBiodata(data);

    biodata.personal =
        normalized.personal;

    biodata.education =
        normalized.education;

    biodata.work =
        normalized.work;

    biodata.family =
        normalized.family;

    biodata.partner =
        normalized.partner;

    biodata.contact =
        normalized.contact;

    biodata.declaration =
        normalized.declaration;

    biodata.photos =
        normalized.photos;

    biodata.template =
        normalized.template;

    // Remove obsolete Baan data from older sessions.

    if (
        Object.prototype.hasOwnProperty.call(
            biodata,
            "baan"
        )
    ) {

        delete biodata.baan;

    }

}


/* ==========================================================
                    SAVE BIODATA
========================================================== */

function saveBiodata() {

    try {

        /* Do not save during restore or reset */

        if (
            STORAGE_MODULE.restoring ||
            STORAGE_MODULE.resetting
        ) {

            return false;

        }


        biodata.template =
            getValidTemplate(
                biodata.template
            );


        const normalized =
            normalizeBiodata(biodata);


        const json =
            JSON.stringify(normalized);


        const success =
            setStorage(
                STORAGE.storageKey,
                json
            );


        if (!success) {

            console.error(
                "Unable to save biodata. " +
                "Browser storage may be full."
            );

            return false;

        }


        storageLog("Biodata Saved");

        return true;

    } catch (error) {

        console.error(
            "Save Biodata Failed",
            error
        );

        return false;

    }

}


/* ==========================================================
                    GET SAVED BIODATA
========================================================== */

function getSavedBiodata() {

    return getStorage(
        STORAGE.storageKey
    );

}


/* ==========================================================
                    CHECK SAVED BIODATA
========================================================== */

function hasSavedBiodata() {

    return getSavedBiodata() !== null;

}


/* ==========================================================
                    STORAGE INFORMATION
========================================================== */

function storageInfo() {

    storageLog(
        "Storage Information",
        {

            key:
                STORAGE.storageKey,

            hasData:
                hasSavedBiodata(),

            template:
                biodata.template

        }
    );

}


/* ==========================================================
                    AUTO SAVE INITIALIZATION
========================================================== */

function initializeAutoSave() {

    const form =
        document.getElementById(
            "multiStepForm"
        );


    if (!form) {
        return;
    }


    if (
        form.dataset.autoSaveInitialized ===
        "true"
    ) {

        return;

    }


    form.dataset.autoSaveInitialized =
        "true";


    form.addEventListener(
        "input",
        autoSaveBiodata
    );


    form.addEventListener(
        "change",
        autoSaveBiodata
    );

}


/* ==========================================================
                    AUTO SAVE BIODATA

                 UPDATED 9-STEP STRUCTURE

                  ALL NEW FIELDS INCLUDED
========================================================== */

function autoSaveBiodata() {

    try {

        if (
            STORAGE_MODULE.restoring ||
            STORAGE_MODULE.resetting
        ) {

            return false;

        }


        /* ==================================================
                    STEP 1 - ABOUT ME
        ================================================== */

        if (
            typeof savePersonalData === "function"
        ) {

            savePersonalData();

        }


        /* ==================================================
                    STEP 2 - EDUCATION & SKILLS
        ================================================== */

        if (
            typeof saveEducationData === "function"
        ) {

            saveEducationData();

        }


        /* ==================================================
                    STEP 3 - ABOUT FAMILY
        ================================================== */

        if (
            typeof saveFamilyData === "function"
        ) {

            saveFamilyData();

        }


        /* ==================================================
                    STEP 4 - WORK & CAREER
        ================================================== */

        if (
            typeof saveWorkData === "function"
        ) {

            saveWorkData();

        }


        /* ==================================================
                    STEP 5 - PARTNER PREFERENCES
        ================================================== */

        if (
            typeof savePartnerData === "function"
        ) {

            savePartnerData();

        }


        /* ==================================================
                    STEP 6 - CONTACT AND ADDRESS
        ================================================== */

        if (
            typeof saveContactData === "function"
        ) {

            saveContactData();

        }


        /* ==================================================
                    STEP 7 - PROFILE PHOTO

                    HANDLED BY GALLERY.JS
        ================================================== */


        /* ==================================================
                    LEGACY DECLARATION

                    NO SEPARATE STEP
        ================================================== */

        if (
            typeof saveDeclarationData === "function"
        ) {

            saveDeclarationData();

        }


        /* ==================================================
                    STEP 8 - CHOOSE TEMPLATE
        ================================================== */

        const selectedTemplate =
            document.querySelector(
                'input[name="biodataTemplate"]:checked'
            );


        if (selectedTemplate) {

            biodata.template =
                getValidTemplate(
                    selectedTemplate.value
                );

        }


        /* ==================================================
                    STEP 9 - REVIEW & CONFIRM

                    SAVE COMPLETE BIODATA
        ================================================== */

        return saveBiodata();

    } catch (error) {

        console.error(
            "Auto Save Failed",
            error
        );

        return false;

    }

}


/* ==========================================================
                    LOAD BIODATA
========================================================== */

function loadBiodata() {

    try {

        const savedData =
            getStorage(
                STORAGE.storageKey
            );


        if (!savedData) {

            storageLog(
                "No Saved Biodata Found"
            );

            return false;

        }


        const parsedData =
            JSON.parse(savedData);


        if (
            !parsedData ||
            typeof parsedData !== "object" ||
            Array.isArray(parsedData)
        ) {

            throw new Error(
                "Invalid saved biodata structure."
            );

        }


        applyBiodataData(
            parsedData
        );


        storageLog(
            "Biodata Loaded Successfully"
        );

        return true;

    } catch (error) {

        console.error(
            "Load Biodata Failed",
            error
        );

        return false;

    }

}


/* ==========================================================
                    CHECK SAVED BIODATA
========================================================== */

function checkSavedBiodata() {

    if (loadBiodata()) {

        storageLog(
            "Saved Biodata Available"
        );

        return true;

    }


    storageLog("Starting Fresh");

    return false;

}


/* ==========================================================
                    RESTORE COMPLETE FORM

                     ENGLISH ONLY
                  TWO PDF TEMPLATES

                   UPDATED 9 STEPS
========================================================== */

function restoreForm() {

    STORAGE_MODULE.restoring = true;

    try {

        /* STEP 1 - ABOUT ME */

        restoreSection(
            biodata.personal
        );


        /* STEP 2 - EDUCATION & SKILLS */

        restoreSection(
            biodata.education
        );


        /* STEP 3 - ABOUT FAMILY */

        restoreSection(
            biodata.family
        );


        /* STEP 4 - WORK & CAREER */

        restoreSection(
            biodata.work
        );


        /* STEP 5 - PARTNER PREFERENCES */

        restoreSection(
            biodata.partner
        );


        /* STEP 6 - CONTACT AND ADDRESS */

        restoreSection(
            biodata.contact
        );


        /* LEGACY DECLARATION */

        restoreSection(
            biodata.declaration
        );


        /* STEP 7 - PROFILE PHOTO */

        restorePhotos();


        /* STEP 8 - TEMPLATE SELECTION */

        biodata.template =
            getValidTemplate(
                biodata.template
            );


        const selectedTemplate =
            document.querySelector(
                'input[name="biodataTemplate"]' +
                `[value="${biodata.template}"]`
            );


        if (selectedTemplate) {

            selectedTemplate.checked = true;

        }


        if (
            typeof updateSelectedTemplateCard ===
            "function"
        ) {

            updateSelectedTemplateCard();

        }


        /* ==================================================
                    REFRESH CHARACTER COUNTERS
        ================================================== */

        const form =
            document.getElementById(
                "multiStepForm"
            );


        if (form) {

            form.querySelectorAll(
                "input, select, textarea"
            ).forEach(element => {

                if (
                    element.id &&
                    document.getElementById(
                        element.id + "Counter"
                    )
                ) {

                    element.dispatchEvent(
                        new Event("input", {
                            bubbles: false
                        })
                    );

                }

            });

        }


        /* ==================================================
                    RESTORE FIRST STEP
        ================================================== */

        if (
            typeof currentStep !== "undefined"
        ) {

            currentStep = 1;

            if (
                typeof showStep === "function"
            ) {

                showStep(currentStep);

            }

        }


        storageLog(
            "Form Restored Successfully"
        );

    } catch (error) {

        console.error(
            "Restore Form Failed",
            error
        );

    } finally {

        STORAGE_MODULE.restoring = false;

    }

}


/* ==========================================================
                    RESTORE FORM SECTION

                    ALL FORM FIELDS
========================================================== */

function restoreSection(section) {

    if (
        !section ||
        typeof section !== "object"
    ) {

        return;

    }


    /* ======================================================
                    RESTORE TIME OF BIRTH

                    HH:MM AM/PM
    ====================================================== */

    if (section.timeOfBirth) {

        const timeString =
            String(
                section.timeOfBirth
            ).trim();


        const match =
            timeString.match(
                /^(\d{1,2}):(\d{1,2})(?:\s+(AM|PM))?$/i
            );


        if (match) {

            const hour =
                document.getElementById(
                    "birthHour"
                );

            const minute =
                document.getElementById(
                    "birthMinute"
                );

            const period =
                document.getElementById(
                    "birthPeriod"
                );


            if (hour) {

                hour.value =
                    String(Number(match[1]));

            }


            if (minute) {

                minute.value =
                    match[2].padStart(2, "0");

            }


            if (period) {

                period.value =
                    (match[3] || "")
                        .toUpperCase();

            }

        }

    }


    /* ======================================================
                    RESTORE REMAINING INPUTS
    ====================================================== */

    Object.entries(section).forEach(
        ([id, value]) => {

            if (id === "timeOfBirth") {

                return;

            }


            const element =
                document.getElementById(id);


            if (!element) {

                return;

            }


            if (
                element.tagName !== "INPUT" &&
                element.tagName !== "SELECT" &&
                element.tagName !== "TEXTAREA"
            ) {

                return;

            }


            if (element.type === "file") {

                return;

            }


            if (element.type === "checkbox") {

                element.checked =
                    value === true ||
                    value === element.value;

                return;

            }


            if (element.type === "radio") {

                element.checked =
                    String(element.value) ===
                    String(value);

                return;

            }


            /* Preserve blank legacy declarations */

            if (
                id === "declaration" &&
                isEmptyStorageValue(value)
            ) {

                return;

            }


            element.value =
                value === null ||
                value === undefined
                    ? ""
                    : String(value);

        }
    );

}


/* ==========================================================
                    RESTORE PHOTO
========================================================== */

function restorePhotos() {

    const photoData =
        biodata.photos?.profilePhoto?.preview;


    const image =
        document.getElementById(
            "previewProfilePhoto"
        );


    /* ======================================================
                    DEFAULT PHOTO
    ====================================================== */

    if (!photoData) {

        if (image) {

            image.src =
                STORAGE.defaultPhoto;

        }


        if (
            typeof GALLERY_STATE !== "undefined"
        ) {

            GALLERY_STATE.profilePhoto = null;

        }

        return;

    }


    /* ======================================================
                    RESTORE UPLOADED PHOTO
    ====================================================== */

    if (image) {

        image.src = photoData;

    }


    /* ======================================================
                    SYNCHRONIZE GALLERY
    ====================================================== */

    if (
        typeof GALLERY_STATE !== "undefined"
    ) {

        GALLERY_STATE.profilePhoto =
            photoData;

    }

}


/* ==========================================================
                    EMPTY STORAGE VALUE HELPER
========================================================== */

function isEmptyStorageValue(value) {

    return (

        value === null ||

        value === undefined ||

        String(value).trim() === ""

    );

}


/* ==========================================================
                    CLEAR STORAGE
========================================================== */

function clearStorage() {

    const success =
        removeStorage(
            STORAGE.storageKey
        );


    if (success) {

        storageLog(
            "Application Storage Cleared"
        );

    }

    return success;

}


/* ==========================================================
                    EXPORT DRAFT

                    JSON FILE DOWNLOAD
========================================================== */

function exportDraft() {

    try {

        /* Save latest form values */

        if (!autoSaveBiodata()) {

            throw new Error(
                "Unable to save current biodata."
            );

        }


        const jsonData =
            JSON.stringify(
                normalizeBiodata(biodata),
                null,
                4
            );


        const blob =
            new Blob(
                [jsonData],
                {
                    type: "application/json"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            STORAGE_CONSTANTS.DRAFT_FILE;


        document.body.appendChild(link);

        link.click();

        link.remove();


        setTimeout(() => {

            URL.revokeObjectURL(url);

        }, 1000);


        storageLog(
            "Draft Exported Successfully"
        );

        return true;

    } catch (error) {

        console.error(
            "Export Draft Failed",
            error
        );

        alert(
            "Unable to export biodata draft."
        );

        return false;

    }

}


/* ==========================================================
                    INITIALIZE EXPORT BUTTON
========================================================== */

function initializeExportButton() {

    const button =
        document.getElementById(
            "exportDraftBtn"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        exportDraft
    );

}


/* ==========================================================
                    IMPORT DRAFT
========================================================== */

function importDraft(event) {

    const input =
        event.target;


    const file =
        input.files?.[0];


    if (!file) {
        return;
    }


    /* Only JSON files allowed */

    if (
        file.type !== "application/json" &&
        !file.name.toLowerCase().endsWith(".json")
    ) {

        alert(
            "Please select a valid JSON file."
        );

        input.value = "";

        return;

    }


    const reader =
        new FileReader();


    reader.onload = function(e) {

        const previousData =
            normalizeBiodata(biodata);

        try {

            const importedData =
                JSON.parse(
                    e.target.result
                );


            if (
                !importedData ||
                typeof importedData !== "object" ||
                Array.isArray(importedData)
            ) {

                throw new Error(
                    "Invalid biodata structure"
                );

            }


            /* Normalize imported data */

            const normalized =
                normalizeBiodata(importedData);


            /* Prevent intermediate autosaves */

            STORAGE_MODULE.restoring = true;

            try {

                resetBiodataForm();

                applyBiodataData(normalized);


                if (
                    typeof GALLERY_STATE !== "undefined"
                ) {

                    GALLERY_STATE.profilePhoto = null;

                }


                resetPhotoPreviews();

                restoreForm();

            } finally {

                STORAGE_MODULE.restoring = false;

            }


            /* Save imported data */

            if (!saveBiodata()) {

                throw new Error(
                    "Imported biodata could not be saved."
                );

            }


            /* Synchronize gallery storage */

            if (
                typeof saveGallery === "function"
            ) {

                saveGallery();

            }


            storageLog(
                "Draft Imported Successfully"
            );


            alert(
                "Draft imported successfully."
            );

        } catch (error) {

            console.error(
                "Import Draft Failed",
                error
            );


            /* Restore previous data */

            STORAGE_MODULE.restoring = true;

            try {

                applyBiodataData(previousData);

                resetBiodataForm();

                restoreForm();

            } finally {

                STORAGE_MODULE.restoring = false;

            }


            alert(
                "Unable to import biodata draft. " +
                "Please check the JSON file."
            );

        } finally {

            input.value = "";

        }

    };


    reader.onerror = function() {

        alert(
            "Unable to read the selected file."
        );

        input.value = "";

    };


    reader.readAsText(file);

}


/* ==========================================================
                    INITIALIZE IMPORT BUTTON
========================================================== */

function initializeImportButton() {

    const input =
        document.getElementById(
            "importDraftInput"
        );


    if (!input) {
        return;
    }


    input.addEventListener(
        "change",
        importDraft
    );

}


/* ==========================================================
                    RESET FORM ELEMENTS
========================================================== */

function resetBiodataForm() {

    const form =
        document.getElementById(
            "multiStepForm"
        );


    if (!form) {
        return;
    }


    /*
        multiStepForm is a DIV.

        Do not use form.reset().
    */

    const fields =
        form.querySelectorAll(
            "input, select, textarea"
        );


    fields.forEach(field => {

        if (field.type === "file") {

            field.value = "";

        } else if (
            field.type === "checkbox" ||
            field.type === "radio"
        ) {

            field.checked =
                field.defaultChecked;

        } else {

            field.value =
                field.defaultValue;

        }


        field.classList.remove(
            "is-invalid"
        );


        field.classList.remove(
            "is-valid"
        );


        field.removeAttribute(
            "aria-invalid"
        );

    });


    /* Clear validation errors */

    if (
        typeof clearAllErrors === "function"
    ) {

        clearAllErrors();

    }


    /* Reset photo filename */

    const photoFileName =
        document.getElementById(
            "profilePhotoFileName"
        );


    if (photoFileName) {

        photoFileName.textContent =
            "No file chosen";

        delete photoFileName.dataset.selected;

    }

}


/* ==========================================================
                    RESET PROFILE PHOTO PREVIEWS
========================================================== */

function resetPhotoPreviews() {

    const image =
        document.getElementById(
            "previewProfilePhoto"
        );


    if (image) {

        image.src =
            STORAGE.defaultPhoto;

    }


    /* Reset PDF photo */

    const pdfPhoto =
        document.getElementById(
            "previewPhoto"
        );


    if (pdfPhoto) {

        pdfPhoto.src =
            STORAGE.defaultPhoto;

    }


    /* Refresh gallery review */

    if (
        typeof refreshGalleryReview === "function"
    ) {

        refreshGalleryReview();

    }

}


/* ==========================================================
                    CLEAR DRAFT

               CLEAR BIODATA AND FORM VALUES
========================================================== */

function clearDraft() {

    STORAGE_MODULE.resetting = true;

    try {

        /* Remove biodata storage */

        if (!clearStorage()) {

            alert(
                "Unable to clear saved biodata."
            );

            return false;

        }


        /* Reset data object */

        if (
            typeof resetFormData === "function"
        ) {

            resetFormData();

        } else {

            applyBiodataData({});

        }


        /* Reset HTML form */

        resetBiodataForm();


        /* Clear gallery state */

        if (
            typeof GALLERY_STATE !== "undefined"
        ) {

            GALLERY_STATE.profilePhoto = null;

        }


        if (
            typeof GALLERY_CONFIG !== "undefined" &&
            GALLERY_CONFIG.storageKey
        ) {

            removeStorage(
                GALLERY_CONFIG.storageKey
            );

        }


        biodata.photos = {};


        /* Restore default photo */

        resetPhotoPreviews();


        /* Reset selected template */

        biodata.template =
            STORAGE.defaultTemplate;


        const defaultTemplate =
            document.querySelector(
                'input[name="biodataTemplate"]' +
                '[value="template1"]'
            );


        if (defaultTemplate) {

            defaultTemplate.checked = true;

        }


        if (
            typeof updateSelectedTemplateCard ===
            "function"
        ) {

            updateSelectedTemplateCard();

        }


        /* Reset current step */

        if (
            typeof currentStep !== "undefined"
        ) {

            currentStep = 1;

            if (
                typeof showStep === "function"
            ) {

                showStep(currentStep);

            }

        }


        /* Refresh character counters */

        const form =
            document.getElementById(
                "multiStepForm"
            );


        if (form) {

            form.querySelectorAll(
                "input, select, textarea"
            ).forEach(field => {

                field.dispatchEvent(
                    new Event("input", {
                        bubbles: false
                    })
                );

            });

        }


        /*
            IMPORTANT:

            Keep payment recovery information.

            Do not clear:

            jv_pending_paid_pdf_v1
            downloadToken

            These belong to payment.js.
        */


        storageLog(
            "Draft Cleared Successfully"
        );

        return true;

    } catch (error) {

        console.error(
            "Clear Draft Failed",
            error
        );

        return false;

    } finally {

        STORAGE_MODULE.resetting = false;

    }

}


/* ==========================================================
                    INITIALIZE CLEAR BUTTON
========================================================== */

function initializeClearButton() {

    const button =
        document.getElementById(
            "clearDraftBtn"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Are you sure you want to clear " +
                    "the saved draft?"
                );


            if (!confirmed) {
                return;
            }


            clearDraft();

        }
    );

}


/* ==========================================================
                    STORAGE SUMMARY
========================================================== */

function storageSummary() {

    storageLog(
        "Storage Module",
        {

            version:
                STORAGE_MODULE.version,

            storageKey:
                STORAGE.storageKey,

            initialized:
                STORAGE_MODULE.initialized

        }
    );

}


/* ==========================================================
                    ERROR HANDLER
========================================================== */

function storageErrorHandler(error) {

    console.error(
        "[Storage Error]",
        error
    );

}


/* ==========================================================
                    END OF STORAGE.JS
========================================================== */

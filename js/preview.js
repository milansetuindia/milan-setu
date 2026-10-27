
/* ==========================================================
                        PREVIEW.JS
                       MILAN SETU

                      ENGLISH ONLY
                    TWO PDF TEMPLATES

                  SAME BIODATA INFORMATION
                 WORK & CAREER SUPPORTED

                  UPDATED 9-STEP FORM
========================================================== */


/* ==========================================================
                    PDF VALUE FORMAT
                  NO HINDI TRANSLATION
========================================================== */

function formatPDFValue(field, value) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return "";

    }

    return String(value).trim();

}


/* ==========================================================
                    DATE FORMAT
                YYYY-MM-DD TO DD-MM-YYYY
========================================================== */

function formatDOB(dateString) {

    if (!dateString) {

        return "";

    }

    const parts = String(dateString).split("-");

    if (parts.length !== 3) {

        return String(dateString);

    }

    const [year, month, day] = parts;

    return `${day}-${month}-${year}`;

}


/* ==========================================================
                    SAFE PREVIEW TEXT
========================================================== */

function setPreviewText(id, value) {

    const element =
        document.getElementById(id);

    if (!element) {

        return;

    }

    element.textContent =
        value === null || value === undefined
            ? ""
            : String(value);

}


/* ==========================================================
                    TEMPLATE SELECTION
========================================================== */


function getSelectedPreviewTemplate() {

    const selectedTemplate =
        biodata.template || "template1";

    if (
        [
            "template1",
            "template2",
            "template3",
            "template4"
        ].includes(selectedTemplate)
    ) {

        return selectedTemplate;

    }

    return "template1";
}



/* ==========================================================
                    RENDER PDF PREVIEW
========================================================== */

function renderPreviewContainer() {

    const selectedTemplate =
        getSelectedPreviewTemplate();

    const templateConfigurations =
        typeof TEMPLATE_CONFIG !== "undefined"
            ? TEMPLATE_CONFIG
            : null;

    if (!templateConfigurations) {

        console.error(
            "TEMPLATE_CONFIG is not defined."
        );

        return;

    }

    const config =
        templateConfigurations[selectedTemplate] ||
        templateConfigurations.template1;

    if (!config) {

        console.error(
            "Template configuration missing."
        );

        return;

    }


    /* ======================================================
                    TEMPLATE BACKGROUND
    ====================================================== */

    const templateImage =
        document.querySelector(".pdf-template");

    if (templateImage) {

        if (
            templateImage.getAttribute("src") !==
            config.image
        ) {

            templateImage.src = config.image;

        }

    }


    /* ======================================================
                    ABOUT ME
                    PERSONAL DETAILS
    ====================================================== */

    setPreviewText(
        "previewName",
        biodata.personal?.fullName
    );


    setPreviewText(
        "previewDOB",
        formatDOB(
            biodata.personal?.dob
        )
    );


    setPreviewText(
        "previewTime",
        biodata.personal?.timeOfBirth
    );


    setPreviewText(
        "previewPlace",
        biodata.personal?.placeOfBirth
    );


    setPreviewText(
        "previewReligion",
        biodata.personal?.religion
    );


    setPreviewText(
        "previewGotra",
        biodata.personal?.gotra
    );


    setPreviewText(
        "previewCaste",
        formatPDFValue(
            "caste",
            biodata.personal?.caste
        )
    );


    /* ======================================================
                    SUB CASTE
                    NEW FIELD
    ====================================================== */

    setPreviewText(
        "previewSubCaste",
        biodata.personal?.subCaste
    );


    /* ======================================================
                    RASHI
    ====================================================== */

    setPreviewText(
        "previewRashi",
        biodata.personal?.rashi
    );


    /* ======================================================
                    GAN
    ====================================================== */

    setPreviewText(
        "previewGan",
        formatPDFValue(
            "gan",
            biodata.personal?.gan
        )
    );


    /* ======================================================
                    MANGLIK STATUS
    ====================================================== */

    setPreviewText(
        "previewManglik",
        formatPDFValue(
            "manglik",
            biodata.personal?.manglik
        )
    );


    /* ======================================================
                    MARITAL STATUS
    ====================================================== */

    setPreviewText(
        "previewMaritalStatus",
        formatPDFValue(
            "maritalStatus",
            biodata.personal?.maritalStatus
        )
    );


    /* ======================================================
                    DIET
    ====================================================== */

    setPreviewText(
        "previewDiet",
        formatPDFValue(
            "diet",
            biodata.personal?.diet
        )
    );


    /* ======================================================
                    HEIGHT
    ====================================================== */

    setPreviewText(
        "previewHeight",
        biodata.personal?.height
    );


    /* ======================================================
                    COMPLEXION
    ====================================================== */

    setPreviewText(
        "previewComplexion",
        biodata.personal?.complexion
    );


    /* ======================================================
                    NATIVE PLACE

                    OPTIONAL FIELD
    ====================================================== */

    setPreviewText(
        "previewNativePlace",
        biodata.personal?.nativePlace
    );


    /* ======================================================
                    LANGUAGE

        Person's spoken language,
        not the website interface language.
    ====================================================== */

    setPreviewText(
        "previewLanguage",
        biodata.personal?.language
    );


    /* ======================================================
                    HOBBIES
    ====================================================== */

    setPreviewText(
        "previewHobbies",
        biodata.personal?.hobbies
    );


    /* ======================================================
                    OTHERS
    ====================================================== */

    setPreviewText(
        "previewOther",
        biodata.personal?.other
    );



    /* ======================================================
                    EDUCATION & SKILLS

                    SIX FIELDS
    ====================================================== */

    /* Qualification */

    setPreviewText(
        "previewHighestQualification",
        biodata.education?.highestQualification
    );


    /* College */

    setPreviewText(
        "previewCollege",
        biodata.education?.college
    );


    /* 12th Board */

    setPreviewText(
        "previewBoard12th",
        biodata.education?.Board12th
    );


    /* 10th Board */

    setPreviewText(
        "previewBoard10th",
        biodata.education?.Board10th
    );


    /* Special Skill */

    setPreviewText(
        "previewSpecialSkill",
        biodata.education?.specialSkill
    );


    /* Education Other */

    setPreviewText(
        "previewEducationOther",
        biodata.education?.educationOther
    );



    /* ======================================================
                    WORK & CAREER

                    STEP 4

                    REPLACES DETAILS OF BAAN
    ====================================================== */

    /* Profession */

    setPreviewText(
        "previewProfession",
        biodata.work?.profession
    );


    /* Designation */

    setPreviewText(
        "previewDesignation",
        biodata.work?.designation
    );


    /* Organization */

    setPreviewText(
        "previewOrganization",
        biodata.work?.organization
    );


    /* Work Place */

    setPreviewText(
        "previewWorkPlace",
        biodata.work?.workPlace
    );


    /* Annual Income */

    setPreviewText(
        "previewIncome",
        biodata.work?.income
    );



    /* ======================================================
                    ABOUT FAMILY
                    FAMILY DETAILS
    ====================================================== */

    /* Father's Name */

    setPreviewText(
        "previewFatherName",
        biodata.family?.fatherName
    );


    /* Father's Occupation */

    setPreviewText(
        "previewFatherOccupation",
        biodata.family?.fatherOccupation
    );


    /* Mother's Name */

    setPreviewText(
        "previewMotherName",
        biodata.family?.motherName
    );


    /* Mother's Occupation */

    setPreviewText(
        "previewMotherOccupation",
        biodata.family?.motherOccupation
    );


    /* Siblings Details */

    setPreviewText(
        "previewSiblingsDetails",
        biodata.family?.siblingsDetails
    );



    /* ======================================================
                    PARTNER'S PREFERENCES
    ====================================================== */

    /* Preferred Qualification */

    setPreviewText(
        "previewPartnerQualification",
        biodata.partner?.preferredQualification
    );


    /* Preferred Profession */

    setPreviewText(
        "previewPartnerProfession",
        biodata.partner?.preferredProfession
    );


    /* Preferred Location */

    setPreviewText(
        "previewPartnerLocation",
        biodata.partner?.preferredLocation
    );


    /* Preferred Caste */

    setPreviewText(
        "previewPartnerCaste",
        formatPDFValue(
            "preferredCaste",
            biodata.partner?.preferredCaste
        )
    );


    /* Other Expectations */

    setPreviewText(
        "previewPartnerOther",
        biodata.partner?.otherExpectations
    );



    /* ======================================================
                    CONTACT DETAILS

                    CONTACT NUMBER + RELATION
    ====================================================== */

    /* Contact Number */

    setPreviewText(
        "previewMobile",
        biodata.contact?.mobileNumber
    );


    /* Relation */

    setPreviewText(
        "previewRelation",
        biodata.contact?.relation
    );



    /* ======================================================
                    ADDRESS
    ====================================================== */

    /* Current Address */

    setPreviewText(
        "previewCurrentAddress",
        biodata.contact?.currentAddress
    );


    /* Permanent Address */

    setPreviewText(
        "previewPermanentAddress",
        biodata.contact?.permanentAddress
    );



    /* ======================================================
                    DECLARATION & CONSENT
                    SENDER DETAILS

                    KEPT FOR COMPATIBILITY
    ====================================================== */

    setPreviewText(
        "previewSenderName",
        biodata.declaration?.senderName
    );


    setPreviewText(
        "previewSenderMobile",
        biodata.declaration?.senderMobile
    );



    /* ======================================================
                    PROFILE PHOTO
    ====================================================== */

    const photo =
        document.getElementById("previewPhoto");

    if (photo) {

        const photoSource =
            biodata.photos?.profilePhoto?.preview ||
            "assets/images/defaults/default-profile.png";

        if (
            photo.getAttribute("src") !==
            photoSource
        ) {

            photo.src = photoSource;

        }

        photo.alt = "Profile Photo";

    }



    /* ======================================================
                    APPLY TEMPLATE POSITIONS
    ====================================================== */

    applyPositions(
        config.positions,
        selectedTemplate
    );

}



/* ==========================================================
                    APPLY TEMPLATE POSITIONS
========================================================== */

function applyPositions(
    positions,
    selectedTemplate = "template1"
) {

    if (!positions) {

        console.error(
            "Template positions not found."
        );

        return;

    }


    const previewPage =
        document.querySelector(".preview-page");

    if (!previewPage) {

        console.error(
            "Preview page not found."
        );

        return;

    }



    /* ======================================================
                    RESET ALL PREVIEW FIELD STYLES

                    BEFORE APPLYING NEW TEMPLATE
    ====================================================== */

    const previewElements =
        previewPage.querySelectorAll(
            '[id^="preview"]'
        );


    /*
        Only these legacy sender fields are excluded
        from template positioning. All current biodata
        fields are supported.

        Fields without positions are hidden automatically.
    */

    const removedPreviewFields = new Set([

        "previewSenderName",

        "previewSenderMobile"

    ]);


    previewElements.forEach(element => {

        const position = positions[element.id];


        if (
            !position ||
            removedPreviewFields.has(element.id)
        ) {

            element.style.display = "none";

            return;

        }


        element.style.display = "block";

        element.style.position = "absolute";

        element.style.left = "";

        element.style.top = "";

        element.style.width = "";

        element.style.height = "";

        element.style.removeProperty("font-size");

        element.style.removeProperty("font-weight");

        element.style.fontFamily = "";

        element.style.fontStyle = "";

        element.style.color = "";

        element.style.textAlign = "";

        element.style.textShadow = "";

        element.style.textTransform = "";

        element.style.lineHeight = "";

        element.style.whiteSpace = "";

        element.style.wordBreak = "";

        element.style.overflowWrap = "";

        element.style.overflow = "";

        element.style.textOverflow = "";

        element.style.webkitLineClamp = "";

        element.style.webkitBoxOrient = "";

        element.style.borderRadius = "";

        element.style.objectFit = "";

        element.style.objectPosition = "";

    });



    /* ======================================================
                    APPLY POSITION VALUES
    ====================================================== */

    Object.entries(positions).forEach(
        ([id, position]) => {

            const element =
                document.getElementById(id);


            if (
                !element ||
                !previewPage.contains(element)
            ) {

                return;

            }


            /* ==================================================
                    SKIP LEGACY FIELDS
            ================================================== */

            if (
                removedPreviewFields.has(id)
            ) {

                element.style.display = "none";

                return;

            }


            /* ==================================================
                    VALIDATE POSITION
            ================================================== */

            if (
                !position ||
                !Number.isFinite(
                    Number(position.left)
                ) ||
                !Number.isFinite(
                    Number(position.top)
                )
            ) {

                element.style.display = "none";

                return;

            }


            element.style.display = "block";

            element.style.position = "absolute";

            element.style.left =
                position.left + "px";

            element.style.top =
                position.top + "px";


            /* ==================================================
                    WIDTH
            ================================================== */

            if (
                position.width !== undefined
            ) {

                element.style.width =
                    position.width + "px";

            }


            /* ==================================================
                    HEIGHT
            ================================================== */

            if (
                position.height !== undefined
            ) {

                element.style.height =
                    position.height + "px";

            }


            /* ==================================================
                    FONT SIZE
            ================================================== */

            if (
                position.fontSize !== undefined
            ) {

                element.style.setProperty(
                    "font-size",
                    position.fontSize + "px",
                    "important"
                );

            }


            /* ==================================================
                    FONT WEIGHT
            ================================================== */

            if (
                position.fontWeight !== undefined
            ) {

                element.style.setProperty(
                    "font-weight",
                    position.fontWeight,
                    "important"
                );

            }


            /* ==================================================
                    LINE HEIGHT
            ================================================== */

            element.style.lineHeight =
                position.lineHeight !== undefined
                    ? String(position.lineHeight)
                    : "1.3";


            /* ==================================================
                    MULTILINE FIELDS
            ================================================== */

            if (position.multiline) {

                element.style.whiteSpace = "normal";

                element.style.wordBreak =
                    "break-word";

                element.style.overflowWrap =
                    "break-word";

                element.style.overflow = "hidden";

                if (position.height) {

                    element.style.height =
                        position.height + "px";

                }

            } else {

                element.style.whiteSpace = "nowrap";

                element.style.overflow = "visible";

                element.style.webkitLineClamp = "";

                element.style.webkitBoxOrient = "";

            }



            /* ==================================================
                    PROFILE PHOTO

                    TEMPLATE-SPECIFIC SHAPE
            ================================================== */

            if (id === "previewPhoto") {

                element.style.objectFit =
                    position.objectFit || "cover";

                element.style.objectPosition =
                    position.objectPosition || "center";

                element.style.borderRadius =
                    position.borderRadius !== undefined
                        ? String(position.borderRadius)
                        : "0";

                element.style.display = "block";

                return;

            }



            /* ==================================================
                    NAME STYLING
            ================================================== */

            if (id === "previewName") {

                element.style.fontFamily =
                    "'Playfair Display', Georgia, serif";

                element.style.color =
                    "#003153";

                element.style.textAlign =
                    "left";

                element.style.textTransform =
                    "uppercase";


                if (
                    selectedTemplate === "template1"
                ) {

                    element.style.fontStyle =
                        "italic";

                    element.style.textShadow =
                        "0 1px 0 #fff, " +
                        "0 2px 3px rgba(0,0,0,0.35)";

                } else {

                    element.style.fontStyle =
                        "normal";

                    element.style.textShadow =
                        "none";

                }

            } else {

                element.style.fontFamily =
                    "'Poppins', sans-serif";

                element.style.fontStyle =
                    "normal";

                element.style.color =
                    "#111111";

                element.style.textTransform =
                    "none";

                element.style.textShadow =
                    "none";

            }


            /* ==================================================
                    OPTIONAL TEXT STYLING

                    READ FROM POSITIONS.JS
            ================================================== */

            if (position.fontFamily) {

                element.style.fontFamily =
                    position.fontFamily;

            }


            if (position.color) {

                element.style.color =
                    position.color;

            }


            if (position.textAlign) {

                element.style.textAlign =
                    position.textAlign;

            }


            if (
                position.fontStyle !== undefined
            ) {

                element.style.fontStyle =
                    position.fontStyle;

            }


            if (
                position.textTransform !== undefined
            ) {

                element.style.textTransform =
                    position.textTransform;

            }

        }
    );

}


/* ==========================================================
                    END OF PREVIEW.JS
========================================================== */



// Specify the class names for the target elements (replace with actual class names from the target webpage)
var imageClass = "img.form-control.img-fluid.bg-light.border-0"; // Class name of CAPTCHA image
var inputClass = "input#captchaStr.form-control.form-control-sm"; // Class name of input box
var buttonClass = "button#submitBtn.btn.btn-sm.btn-primary.float-end"; // Class name of the submit button



// Function to solve CAPTCHA using OCR
async function solveCaptcha() {
    try {
        // Locate the CAPTCHA image on the webpage
        const captchaImage = document.querySelector(imageClass);
        if (!captchaImage) {
            console.error("CAPTCHA image not found.");
            return;
        }

        console.log("CAPTCHA image found. Extracting text...");

        // Use Tesseract.js to extract text from the image
        const { data: { text } } = await Tesseract.recognize(captchaImage.src, 'eng');
        const captchaText = text.trim(); // Trim whitespace for clean input
        console.log("Extracted CAPTCHA text:", captchaText);

        // Locate the input box and submit button
        const inputBox = document.querySelector(inputClass);
        const submitButton = document.querySelector(buttonClass);

        if (inputBox && submitButton) {
            // Fill the input box with the extracted text and submit the form
            inputBox.value = captchaText;
            submitButton.click();
            console.log("CAPTCHA solved and form submitted.");
        } else {
            console.error("Input box or submit button not found.");
        }
    } catch (error) {
        console.error("An error occurred while solving CAPTCHA:", error);
    }
}

// Execute the CAPTCHA solving function when the content script loads
solveCaptcha();
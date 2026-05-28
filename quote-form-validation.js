(function () {
  const forms = document.querySelectorAll(".quote-form, .site-quote-form");

  if (!forms.length) {
    return;
  }

  const submissionEndpoint = "https://formsubmit.co/ajax/Nmoreland51@gmail.com";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const messages = {
    "Full Name": {
      required: "Please enter your name so we know who to contact."
    },
    "Email Address": {
      required: "Please provide your email so we can send your quote.",
      invalid: "Please enter a valid email address (example: yourname@email.com)."
    },
    "Phone Number": {
      required: "Please provide your phone number so we can follow up about your request.",
      invalid: "Please enter a valid phone number (example: (555) 123-4567)."
    },
    "Service Type": {
      required: "Please select the service you need help with."
    },
    "Project Details or Phone Issue": {
      required: "Please tell us what needs to be fixed, cleaned up, or organized."
    }
  };

  function getField(control) {
    return control.closest(".form-field, .quote-field") || control.parentElement;
  }

  function getErrorId(control) {
    return `${control.id || control.name.replace(/\s+/g, "-").toLowerCase()}-error`;
  }

  function getErrorElement(control) {
    const field = getField(control);
    const errorId = getErrorId(control);
    let error = field.querySelector(`#${CSS.escape(errorId)}`);

    if (!error) {
      error = document.createElement("p");
      error.className = "field-error";
      error.id = errorId;
      error.setAttribute("aria-live", "polite");
      control.insertAdjacentElement("afterend", error);
    }

    control.setAttribute("aria-describedby", errorId);
    return error;
  }

  function showError(control, message) {
    const field = getField(control);
    const error = getErrorElement(control);

    field.classList.add("has-error");
    control.setAttribute("aria-invalid", "true");
    error.textContent = message;
  }

  function clearError(control) {
    const field = getField(control);
    const error = field.querySelector(`#${CSS.escape(getErrorId(control))}`);

    field.classList.remove("has-error");
    control.removeAttribute("aria-invalid");

    if (error) {
      error.textContent = "";
    }
  }

  function getSuccessElement(form) {
    let success = form.querySelector(".form-success");

    if (!success) {
      success = document.createElement("div");
      success.className = "form-success";
      success.id = `${form.id || "quote-form"}-success`;
      success.setAttribute("role", "status");
      success.setAttribute("aria-live", "polite");
      success.setAttribute("tabindex", "-1");
      success.hidden = true;

      const heading = form.querySelector(".form-heading, .quote-form-heading");
      if (heading) {
        heading.insertAdjacentElement("afterend", success);
      } else {
        form.prepend(success);
      }
    }

    return success;
  }

  function getFailureElement(form) {
    let failure = form.querySelector(".form-failure");

    if (!failure) {
      failure = document.createElement("p");
      failure.className = "form-failure";
      failure.id = `${form.id || "quote-form"}-failure`;
      failure.setAttribute("role", "alert");
      failure.hidden = true;

      const heading = form.querySelector(".form-heading, .quote-form-heading");
      if (heading) {
        heading.insertAdjacentElement("afterend", failure);
      } else {
        form.prepend(failure);
      }
    }

    return failure;
  }

  function showSuccess(form) {
    const success = getSuccessElement(form);
    const submitAgain = document.createElement("button");

    success.replaceChildren();
    success.hidden = false;
    form.classList.add("is-success");

    const title = document.createElement("strong");
    title.textContent = "Quote Request Submitted!";

    const message = document.createElement("span");
    message.textContent = " Thank you for reaching out to FixIt & Flow. Your request has been received, and we will follow up soon with the next steps.";

    submitAgain.type = "button";
    submitAgain.className = "form-success-button";
    submitAgain.textContent = "Submit Another Request";
    submitAgain.addEventListener("click", () => {
      clearSuccess(form);

      const firstControl = form.querySelector("input:not([type='hidden']):not([type='radio']), select, textarea");
      if (firstControl) {
        firstControl.focus();
      }
    });

    success.append(title, message, submitAgain);
    success.focus();
  }

  function clearSuccess(form) {
    const success = getSuccessElement(form);

    form.classList.remove("is-success");
    success.hidden = true;
    success.replaceChildren();
  }

  function showFailure(form) {
    const failure = getFailureElement(form);

    failure.hidden = false;
    failure.textContent = "Sorry, your request could not be sent right now. Please try again or email Nmoreland51@gmail.com directly.";
  }

  function clearFailure(form) {
    const failure = getFailureElement(form);

    failure.hidden = true;
    failure.textContent = "";
  }

  function setSubmitting(form, isSubmitting) {
    const submitButton = form.querySelector("button[type='submit']");

    if (!submitButton) {
      return;
    }

    if (!submitButton.dataset.originalText) {
      submitButton.dataset.originalText = submitButton.textContent;
    }

    submitButton.disabled = isSubmitting;
    submitButton.textContent = isSubmitting ? "Sending..." : submitButton.dataset.originalText;
  }

  function getPayload(form) {
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const customerEmail = payload["Email Address"] || "";

    payload.name = payload["Full Name"] || "";
    payload.email = customerEmail;
    payload.phone = payload["Phone Number"] || "";
    payload.message = payload["Project Details or Phone Issue"] || "";
    payload._replyto = customerEmail;
    payload._subject = "New FixIt & Flow quote request";
    payload._template = "table";
    payload._captcha = "false";

    return payload;
  }

  async function sendForm(form) {
    const response = await fetch(submissionEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(getPayload(form))
    });

    if (!response.ok) {
      throw new Error("Form submission failed.");
    }

    return response.json();
  }

  function isValidPhone(value) {
    const digitsOnly = value.replace(/\D/g, "");
    return digitsOnly.length >= 10;
  }

  function validateControl(control) {
    const value = control.value.trim();
    const fieldMessages = messages[control.name] || {};

    if (control.required && !value) {
      showError(control, fieldMessages.required || "Please complete this required field.");
      return false;
    }

    if (control.type === "email" && value && !emailPattern.test(value)) {
      showError(control, fieldMessages.invalid || "Please enter a valid email address.");
      return false;
    }

    if (control.type === "tel" && value && !isValidPhone(value)) {
      showError(control, fieldMessages.invalid || "Please enter a valid phone number.");
      return false;
    }

    clearError(control);
    return true;
  }

  forms.forEach((form) => {
    const controls = Array.from(form.querySelectorAll("input, select, textarea"))
      .filter((control) => control.type !== "radio" && control.type !== "hidden");

    form.setAttribute("novalidate", "");

    controls.forEach((control) => {
      control.addEventListener("input", () => {
        clearSuccess(form);
        clearFailure(form);

        if (control.closest(".has-error")) {
          validateControl(control);
        }
      });

      control.addEventListener("change", () => {
        clearSuccess(form);
        clearFailure(form);

        if (control.closest(".has-error")) {
          validateControl(control);
        }
      });
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      let firstInvalid = null;

      controls.forEach((control) => {
        const isValid = validateControl(control);

        if (!isValid && !firstInvalid) {
          firstInvalid = control;
        }
      });

      if (firstInvalid) {
        clearSuccess(form);
        clearFailure(form);
        firstInvalid.focus();
        return;
      }

      try {
        clearFailure(form);
        setSubmitting(form, true);
        await sendForm(form);
        controls.forEach(clearError);
        form.reset();
        showSuccess(form);
      } catch (error) {
        showFailure(form);
      } finally {
        setSubmitting(form, false);
      }
    });
  });
})();

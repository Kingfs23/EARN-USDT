const emailInput = document.getElementById("email");
const statusMessage = document.getElementById("status-message");
const authPanel = document.getElementById("auth-panel");
const authSubmit = document.getElementById("auth-submit");
const actionButtons = document.querySelectorAll("[data-auth-action]");

let currentAction = "signup";

function setMessage(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.style.color = isError ? "rgba(255, 154, 154, 0.92)" : "rgba(206, 247, 219, 0.82)";
}

function setCurrentAction(action) {
  currentAction = action;
  authSubmit.textContent = action === "signup" ? "Create" : "Login";
  emailInput.placeholder =
    action === "signup" ? "Enter email to create account" : "Enter email to login";
}

async function simulateAuth(action, email) {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 450);
  });

  return {
    ok: true,
    action,
    email,
    message:
      action === "signup"
        ? `Signup request prepared for ${email}.`
        : `Login request prepared for ${email}.`,
  };
}

actionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setCurrentAction(button.dataset.authAction);
    emailInput.focus();
    setMessage(
      button.dataset.authAction === "signup"
        ? "Enter your email to prepare a signup flow."
        : "Enter your email to prepare a login flow."
    );
  });
});

authPanel.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();

  if (!email) {
    setMessage("Please enter your email address.", true);
    emailInput.focus();
    return;
  }

  authSubmit.disabled = true;
  authSubmit.textContent = "Please wait";

  try {
    const data = await simulateAuth(currentAction, email);
    setMessage(data.message);
  } catch (error) {
    setMessage(error.message || "Something went wrong.", true);
  } finally {
    authSubmit.disabled = false;
    authSubmit.textContent = currentAction === "signup" ? "Create" : "Login";
  }
});

setMessage("Static version ready for local preview, GitHub upload, and Vercel hosting.");

export function getCurrentPage(formGroups) {
  let currentPage;

  for (const page of formGroups) {
    if (!page.classList.contains("disabled")) {
      currentPage = page;
      break;
    }
  }

  return currentPage;
}

export function getTargetPage(formGroups, targetPageNumber) {
  let targetPage;

  for (const page of formGroups) {
    if (page.dataset.page === `${targetPageNumber}`) {
      targetPage = page;
      break;
    }
  }

  return targetPage;
}

export function setFormName(formNameSpans, currentPage) {
  for (const formNameSpan of formNameSpans) {
    formNameSpan.textContent = currentPage.dataset.name;
  }
}

export function toggleDisabled(elements, toggle) {
  for (const element of elements) {
    if (toggle) {
      element.setAttribute("disabled", "disabled");
    } else {
      element.removeAttribute("disabled");
    }
  }
}

export function handleLastPage(submitBtns, nextBtns, mainEl, toggle) {
  const [mobileSubmitBtn, desktopSubmitBtn] = submitBtns;
  const [mobileNexttBtn, desktopNextBtn] = nextBtns;

  if (toggle) {
    mobileNexttBtn.classList.add("disabled");
    desktopNextBtn.classList.add("disabled");

    mobileSubmitBtn.classList.remove("disabled");
    desktopSubmitBtn.classList.remove("disabled");

    main.style.backgroundColor = `var(--tertiary-color)`;
    return;
  }

  mobileNexttBtn.classList.remove("disabled");
  desktopNextBtn.classList.remove("disabled");

  mobileSubmitBtn.classList.add("disabled");
  desktopSubmitBtn.classList.add("disabled");

  mainEl.style.backgroundColor = `var(--primary-color)`;
}

export function createPageProgressBtn(pageLength, currentPage = 1) {
  const res = [];
  for (let i = 1; i <= pageLength; i++) {
    const button = document.createElement("button");
    button.dataset.pageNumber = i;

    if (i == currentPage) {
      button.classList.add("selected");
    }

    res.push(button);
  }
  return res;
}

export function highlightPageProgressBtn(buttons, targetPage) {
  for (const button of buttons) {
    button.classList.remove("selected");
    if (button.dataset.pageNumber == targetPage) {
      button.classList.add("selected");
    }
  }
}

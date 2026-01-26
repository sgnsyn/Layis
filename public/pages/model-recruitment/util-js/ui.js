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

export function setFormName(formNameSpans, currentPage){
    for (const formNameSpan of formNameSpans) {
      formNameSpan.textContent = currentPage.dataset.name;
    }
}

export function toggleDisabled(elements, toggle){
  for(const element of elements){
    if(toggle){
      element.setAttribute("disabled", "disabled")
    }else{
      element.removeAttribute("disabled")
    }
  }
}

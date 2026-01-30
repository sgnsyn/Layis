import {
  createPageProgressBtn,
  getCurrentPage,
  getTargetPage,
  handleLastPage,
  highlightPageProgressBtn,
  setFormName,
  toggleDisabled,
} from "./util-js/ui.js";

const formNameSpans = document.getElementsByClassName("form-name");
const mainEl = document.getElementById("main");

const desktopBackBtn = document.getElementById("back-btn-desktop");
const desktopNextBtn = document.getElementById("next-btn-desktop");
const mobileBackBtn = document.getElementById("back-btn-mobile");
const mobileNextBtn = document.getElementById("next-btn-mobile");

const desktopPageIndicator = document.getElementById("desktop-pages-indicator");
const mobilePageIndicator = document.getElementById("mobile-pages-indicator");

const desktopSubmitButton = document.getElementById("submit-btn-desktop");
const mobileSubmitButton = document.getElementById("submit-btn-mobile");

const backButtons = [mobileBackBtn, desktopSubmitButton];
const nextButtons = [mobileNextBtn, desktopNextBtn];
const submitButtons = [mobileSubmitButton, desktopSubmitButton];

const formGroups = document.getElementsByClassName("form-group");
const pageLength = formGroups.length;

function nextBtnHandler() {
  const currentPage = getCurrentPage(formGroups);
  const currentPageNumber = parseInt(currentPage.dataset.page);
  const targetPageNumber = currentPageNumber + 1;

  switch (targetPageNumber) {
    case pageLength + 1:
      return;
    case pageLength:
      toggleDisabled(nextButtons, true);
      handleLastPage(submitButtons, nextButtons, mainEl, true);
      break;
    case 2:
      toggleDisabled(backButtons, false);
  }

  const targetPage = getTargetPage(formGroups, targetPageNumber);
  if (currentPage && targetPage) {
    pageChangeHandler(currentPage, targetPage, targetPageNumber);
  }
}

function backBtnHandler() {
  const currentPage = getCurrentPage(formGroups);
  const currentPageNumber = parseInt(currentPage.dataset.page);
  const targetPageNumber = currentPageNumber - 1;

  switch (targetPageNumber) {
    case 0:
      return;
    case 1:
      toggleDisabled(backButtons, true);
      break;
    case pageLength - 1:
      toggleDisabled(nextButtons, false);
      handleLastPage(submitButtons, nextButtons, mainEl, false);
  }

  const targetPage = getTargetPage(formGroups, targetPageNumber);

  if (currentPage && targetPage) {
    pageChangeHandler(currentPage, targetPage, targetPageNumber);
  }
}

function navBtnHandler(event) {
  const btn = event.target;
  const targetPageNumber = parseInt(btn.dataset.pageNumber);

  if (targetPageNumber == pageLength) {
    handleLastPage(submitButtons, nextButtons, mainEl, true);
    toggleDisabled(nextButtons, true);
    toggleDisabled(backButtons, false);
  } else if (targetPageNumber == 1) {
    toggleDisabled(backButtons, true);
    toggleDisabled(nextButtons, false);
    handleLastPage(submitButtons, nextButtons, mainEl, false);
  } else if (2 <= targetPageNumber && targetPageNumber <= pageLength - 1) {
    toggleDisabled(backButtons, false);
    toggleDisabled(nextButtons, false);
    handleLastPage(submitButtons, nextButtons, mainEl, false);
  }

  const currentPage = getCurrentPage(formGroups);
  const targetPage = getTargetPage(formGroups, targetPageNumber);

  if (currentPage && targetPage) {
    pageChangeHandler(currentPage, targetPage, targetPageNumber);
  }
}

function pageChangeHandler(currentPage, targetPage, targetPageNumber) {
  currentPage.classList.add("disabled");
  targetPage.classList.remove("disabled");

  const mobileButtons = mobilePageIndicator.querySelectorAll("button");
  if (mobileButtons) {
    highlightPageProgressBtn(mobileButtons, targetPageNumber);
  }

  const desktopButton = desktopPageIndicator.querySelectorAll("button");
  if (desktopButton) {
    highlightPageProgressBtn(desktopButton, targetPageNumber);
  }

  setFormName(formNameSpans, targetPage);
}

function initialize() {
  const currentPage = getCurrentPage(formGroups);
  if (currentPage) {
    setFormName(formNameSpans, currentPage);
  }

  const currentPageNumber = parseInt(currentPage.dataset.page);

  const mobilePageIndicatorBtn = createPageProgressBtn(
    pageLength,
    currentPageNumber,
  );
  const desktopPageIndicatorBtn = createPageProgressBtn(
    pageLength,
    currentPageNumber,
  );

  mobilePageIndicatorBtn.forEach((btn) => {
    btn.addEventListener("click", navBtnHandler);
  });

  desktopPageIndicatorBtn.forEach((btn) => {
    btn.addEventListener("click", navBtnHandler);
  });

  mobilePageIndicator.append(...mobilePageIndicatorBtn);
  desktopPageIndicator.append(...desktopPageIndicatorBtn);

  switch (currentPageNumber) {
    case pageLength:
      toggleDisabled(nextButtons, true);
      handleLastPage(submitButtons, nextButtons, mainEl, true);

      break;
    case 1:
      toggleDisabled(backButtons, true);
      break;
  }
}

desktopBackBtn.addEventListener("click", backBtnHandler);
desktopNextBtn.addEventListener("click", nextBtnHandler);

mobileBackBtn.addEventListener("click", backBtnHandler);
mobileNextBtn.addEventListener("click", nextBtnHandler);

window.addEventListener("load", initialize);

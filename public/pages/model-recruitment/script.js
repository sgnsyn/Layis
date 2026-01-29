import {
    createPageProgressBtn,
  getCurrentPage,
  getTargetPage,
  highlightPageProgressBtn,
  setFormName,
  toggleDisabled,
} from "./util-js/ui.js";

const formNameSpans = document.getElementsByClassName("form-name");

const desktopBackBtn = document.getElementById("back-btn-desktop");
const desktopNextBtn = document.getElementById("next-btn-desktop");
const mobileBackBtn = document.getElementById("back-btn-mobile");
const mobileNextBtn = document.getElementById("next-btn-mobile");

const desktopPageIndicator = document.getElementById("desktop-pages-indicator")
const mobilePageIndicator = document.getElementById("mobile-pages-indicator")

const desktopSubmitButton = document.getElementById("submit-btn-desktop")
const mobileSubmitButton = document.getElementById("submit-btn-mobile")


const formGroups = document.getElementsByClassName("form-group");
const pageLength = formGroups.length;


function nextBtnHandler() {
  const currentPage = getCurrentPage(formGroups);
  const currentPageNumber = parseInt(currentPage.dataset.page);
  const targetPageNumber = parseInt(currentPageNumber) + 1;

  switch (targetPageNumber) {
    case pageLength + 1:
      return;
    case pageLength:
      toggleDisabled([mobileNextBtn, desktopNextBtn], true);
      break;
    case 2:
      toggleDisabled([desktopBackBtn, mobileBackBtn], false);
  }

  const targetPage = getTargetPage(formGroups, targetPageNumber);
  if (currentPage && targetPage) {
    currentPage.classList.add("disabled");
    targetPage.classList.remove("disabled");

    const mobileButtons = mobilePageIndicator.querySelectorAll("button")
    if(mobileButtons){
      highlightPageProgressBtn(mobileButtons, targetPageNumber)
    }

    const desktopButton = desktopPageIndicator.querySelectorAll("button")
    if(desktopButton ){
      highlightPageProgressBtn(desktopButton , targetPageNumber)
    }

    setFormName(formNameSpans, targetPage);
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
      toggleDisabled([desktopBackBtn, mobileBackBtn], true);
      break;
    case pageLength - 1:
      toggleDisabled([mobileNextBtn, desktopNextBtn], false);
  }

  const targetPage = getTargetPage(formGroups, targetPageNumber);

  if (currentPage && targetPage) {
    currentPage.classList.add("disabled");
    targetPage.classList.remove("disabled");

    const mobileButtons = mobilePageIndicator.querySelectorAll("button")
    if(mobileButtons){
      highlightPageProgressBtn(mobileButtons, targetPageNumber)
    }

    const desktopButton = desktopPageIndicator.querySelectorAll("button")
    if(desktopButton ){
      highlightPageProgressBtn(desktopButton , targetPageNumber)
    }

    setFormName(formNameSpans, targetPage);
  }
}

function initialize() {
  const currentPage = getCurrentPage(formGroups);
  if (currentPage) {
    setFormName(formNameSpans, currentPage);
  }

  const currentPageNumber = parseInt(currentPage.dataset.page);

  const mobilePageIndicatorBtn = createPageProgressBtn(pageLength, currentPageNumber) 
  const desktopPageIndicatorBtn = createPageProgressBtn(pageLength, currentPageNumber) 

  mobilePageIndicator.append(...mobilePageIndicatorBtn)
  desktopPageIndicator.append(...desktopPageIndicatorBtn)

  switch (currentPageNumber) {
    case pageLength:
      toggleDisabled([mobileNextBtn, desktopNextBtn], true);
      break;
    case 1:
      toggleDisabled([desktopBackBtn, mobileBackBtn], true);
      break;
  }
}

desktopBackBtn.addEventListener("click", backBtnHandler);
desktopNextBtn.addEventListener("click", nextBtnHandler);

mobileBackBtn.addEventListener("click", backBtnHandler);
mobileNextBtn.addEventListener("click", nextBtnHandler);

window.addEventListener("load", initialize);

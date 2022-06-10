import "./scss/main.scss";

const rootElem = document.querySelector("#frame");
const container = document.querySelector("#container");

const appRect = rootElem.getBoundingClientRect();
const elRect = container.getBoundingClientRect();

const rect = {};

const computePosition = (el) => {
  const rootRect = rootElem.getBoundingClientRect();
  const elemRect = el.getBoundingClientRect();

  rect.top = elemRect.top - rootRect.top;
  rect.left = elRect.left;
  rect.width = elRect.width;
  rect.height = elRect.height;
  rect.appWidth = appRect.width;
  rect.appHeight = appRect.height;
};

document.querySelectorAll("#container").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    !el.hasAttribute("card-open") ? el.setAttribute("card-active", true) : "";
    computePosition(el);
    //preset
    el.style.top = rect.top + "px";
    el.style.left = rect.left + "px";
    el.style.width = rect.appWidth + "px";
    el.style.height = rect.appHeight + "px";
    //post set
    setTimeout(() => {
      el.style.top = 0;
      el.style.left = 0;
      el.style.width = rect.appWidth + "px";
      el.style.height = rect.appHeight + "px";
      el.classList.add("p-fixed");
    }, 0);
  });
});

document.querySelectorAll("#closebtn").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    //preset
    const parentElement = e.target.parentNode.parentNode.parentNode.parentNode;
    parentElement.style.top = 0;
    parentElement.style.left = 0;
    parentElement.style.width = rect.appWidth + "px";
    parentElement.style.height = rect.appHeight + "px";
    //post set
    setTimeout(() => {
      parentElement.style.top = rect.top + "px";
      parentElement.style.left = rect.left + "px";
      parentElement.style.width = rect.width + "px";
      parentElement.style.height = rect.height + "px";
      parentElement.removeAttribute("card-active");

      //
    }, 0);
    //remove fixed: but we really dont have to do this
    setTimeout(() => {
      parentElement.classList.remove("p-fixed");
    }, 300);
  });
});

import { BODY, WRAPPER } from "./constants.js";

export const blockScroll = (currPos) => {
    BODY.classList.add('scroll-block');
    WRAPPER.style.top=`${-currPos}px`;
}

export const unblockScroll = (currPos) => {
    BODY.classList.remove('scroll-block');
    WRAPPER.style.top=`0px`;
    window.scroll({
      top: currPos,
      behavior: "instant",
    })
}
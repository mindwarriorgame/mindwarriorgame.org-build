const FAQ_MENU_ITEM_ELTS = document.querySelectorAll("#sidebar li[data-target]");
const CONTENT_ELT = document.querySelector(".content");

class ActiveMenuItemUpdater {
    constructor() {
        this.activeMenuItemElt = null;
    }

    setActiveQuestion(menuItemElt, highlightContent = true) {
        if (this.activeMenuItemElt) {
            this.activeMenuItemElt.classList.remove("active");
        }
        menuItemElt.classList.add("active");
        this.activeMenuItemElt = menuItemElt;
        if (highlightContent) {
            const contentElt = this._mapMenuEltToContentElt(menuItemElt);
            if (!contentElt) {
                console.error("Failed to find content element for menu item", menuItemElt);
                return;
            }
            contentElt.classList.add("active");
            console.log(contentElt);
            setTimeout(() => {
                contentElt.classList.remove("active");
            }, 2000);
        }
    }

    startListenContentScrolling() {
        if (this._onContentScrollCallback) {
            return;
        }
        this._onContentScrollCallback = this._syncActiveMenuItemWithContentScroll.bind(this);
        CONTENT_ELT.addEventListener("scroll", this._onContentScrollCallback);
    }

    stopListenFaqContentScrolling() {
        CONTENT_ELT.removeEventListener("scroll", this._onContentScrollCallback);
        this._onContentScrollCallback = null;
    }

    _syncActiveMenuItemWithContentScroll() {
        for (let idx = 0; idx < FAQ_MENU_ITEM_ELTS.length; idx++) {
            const faqMenuItemElt = FAQ_MENU_ITEM_ELTS[idx];
            const targetQuestionElt = this._mapMenuEltToContentElt(faqMenuItemElt);

            const nextQuestionElt = idx < FAQ_MENU_ITEM_ELTS.length - 1 ? FAQ_MENU_ITEM_ELTS[idx + 1] : undefined;
            const nextTargetElement = this._mapMenuEltToContentElt(nextQuestionElt);

            if (targetQuestionElt) {
                const targetRect = targetQuestionElt.getBoundingClientRect();
                const isTargetCandidate = targetRect.top >= 0 && targetRect.top <= 150;
                const isTargetAboveViewport = targetRect.top < 0;

                const nextRect = nextTargetElement ? nextTargetElement.getBoundingClientRect() : undefined;
                const isNextFarBeyond = nextRect && nextRect.top > 150;

                if (isTargetCandidate || (isTargetAboveViewport && isNextFarBeyond)) {
                    this.setActiveQuestion(faqMenuItemElt, false);
                    break;
                }
            } else {
                console.error("Failed to calculate activeQuestion, not found", faqMenuItemElt);
            }
        }
    }

    _mapMenuEltToContentElt(menuElt) {
        if (!menuElt) {
            return undefined;
        }
        const targetQuestionSelector = '#smooth-' + menuElt.getAttribute("data-target");
        return CONTENT_ELT.querySelector(targetQuestionSelector);
    }
}

const activeMenuItemUpdater = new ActiveMenuItemUpdater();

function initFaqQuestionsLinks() {
    FAQ_MENU_ITEM_ELTS.forEach((question) => {
        const targetId = question.getAttribute("data-target");
        question.querySelector('a').addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.hash = targetId;
        });
    });
}

function onAnchorChanged(anchor) {
    const questionMenuItemElt = document.querySelector(`#sidebar li[data-target="${anchor.split('#').join('')}"]`);
    if (!questionMenuItemElt) {
        console.log("Cannot find FAQ question", anchor);
        return;
    }

    const targetQuestionSelector = '#smooth-' + anchor.substring(1) + " h3";
    document.querySelector(targetQuestionSelector).scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
    activeMenuItemUpdater.setActiveQuestion(questionMenuItemElt);

    activeMenuItemUpdater.stopListenFaqContentScrolling();
    setTimeout(() => {
        activeMenuItemUpdater.startListenContentScrolling();
    }, 2000);
}

function watchAnchorChanges() {
    let lastProcessedAnchor = "";
    setInterval(() => {
        if (window.location.hash !== lastProcessedAnchor) {
            lastProcessedAnchor = window.location.hash;

            onAnchorChanged(lastProcessedAnchor)
        }
    }, 100);
}

initFaqQuestionsLinks();
watchAnchorChanges();
activeMenuItemUpdater.startListenContentScrolling();
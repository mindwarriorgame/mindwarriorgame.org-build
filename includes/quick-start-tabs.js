document.addEventListener("DOMContentLoaded", () => {
    const hashTarget = window.location.hash ? window.location.hash.slice(1) : "";
    const tabGroups = document.querySelectorAll("[data-platform-tabs]");
    tabGroups.forEach((group) => {
        const panelFilter = group.getAttribute("data-target-panel-filter");
        const tabsContainer = group.querySelector(".platform-tabs");
        const panels = group.querySelectorAll("[data-platform-panel]");
        if (tabsContainer && panels.length > 0 && tabsContainer.parentElement !== group) {
            group.insertBefore(tabsContainer, panels[0]);
        }
        const tabs = group.querySelectorAll("[data-platform-tab]");

        const activate = (target) => {
            tabs.forEach((tab) => {
                const isActive = tab.dataset.platformTab === target;
                tab.classList.toggle("active", isActive);
                tab.setAttribute("aria-selected", isActive ? "true" : "false");
            });
            panels.forEach((panel) => {
                if (panel.getAttribute("data-target-panel-filter") !== panelFilter) {
                    return;
                }
                panel.classList.toggle("active", panel.dataset.platformPanel === target);
            });
        };

        tabs.forEach((tab) => {
            tab.addEventListener("click", () => activate(tab.dataset.platformTab));
        });

        const hasHashTarget = hashTarget && Array.from(tabs).some((tab) => tab.dataset.platformTab === hashTarget);
        const initial = hasHashTarget ? hashTarget : (group.dataset.defaultPlatform || "telegram");
        activate(initial);
    });
});

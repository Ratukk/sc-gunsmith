<script>
(function () {
  // 🌐 Global state variables
  window.selectedBarrelSlug = null;
  window.selectedSightSlug = null;
  window.selectedUnderbarrelSlug = null;
  window.currentBaseWeapon = null;
  window.originalWeaponSlug = null;
  window.cardOrder = 500;
  window.lastSelectedSlide = null;
  let openWrapper = null;
  let currentClonedCard = null;
  let previewImageLocked = false; // Prevent external overwrites

window.weaponImageMap = {
  "gallant-rifle": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6869e8a3e6fe2cab7b567048_gallant-assault-rifle.png",
  "p6-lr-sniper-rifle": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6869e8a3538ac2811876e094_p6-lr-sniper-rifle-small.png",

};

window.pokerIconMap = {
  "black-clubs-top": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6860a76f7a04ae7ac43cec22_Clover.png",
  "red-clubs-top": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6860bb843364a93449a5fd8f_red-clubt.png",
  "black-hearts-top": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6860bb8ef2ef31c08603c6d0_black-heart.png",
  "red-hearts-top": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6860b41cfd544882ddb14692_heart-card.png",
  "black-spades-top": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6860b4caed9b84496b1ca3f3_Spade3.png",
  "red-spades-top": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6860bb6c7a407c6099279740_red-spade.png",
  "black-diamonds-top": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6860bb8b743c9a4fef6be95e_black-diamond.png",
  "red-diamonds-top": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6860bb806a06e66f2b842ee8_red-diamond.png",
  "king-top": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6860b6a8d1702fd16c5bd9c5_king.png",
  "velocity-top": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6869ee4a7dfcde3985f83c84_velocity-icon-small.png",
  "fire-rate-plus-top": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/686ad4bb1811776d32230143_fire-rate-icon-plus-small.png",
  "fire-rate-minus-top": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/686ad4bbb3153765b642ff21_fire-rate-icon-minus-small.png",
  "ammo-plus-top": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/686ae0ed29ceb8ca04a8a712_ammo-icon-plus-small.png",
  "ammo-minus-top": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/686ae0ed920b2080ff64f515_ammo-icon-minus-small.png",

  "black-clubs-bottom": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6860a76f7a04ae7ac43cec22_Clover.png",
  "red-clubs-bottom": " https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6860bb843364a93449a5fd8f_red-clubt.png",
  "black-hearts-bottom": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6860bb8ef2ef31c08603c6d0_black-heart.png",
  "red-hearts-bottom": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6860b41cfd544882ddb14692_heart-card.png",
  "black-spades-bottom": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6860b4caed9b84496b1ca3f3_Spade3.png",
  "red-spades-bottom": " https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6860bb6c7a407c6099279740_red-spade.png",
  "black-diamonds-bottom": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6860bb8b743c9a4fef6be95e_black-diamond.png",
  "red-diamonds-bottom": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6860bb806a06e66f2b842ee8_red-diamond.png",
  "king-bottom": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6860b6a8d1702fd16c5bd9c5_king.png",
  "velocity-bottom": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6869ee4a7dfcde3985f83c84_velocity-icon-small.png",
  "fire-rate-plus-bottom": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/686ad4bb50fc0bc2499f8311_fire-rate-icon-plus-small-bottom.png",
  "fire-rate-minus-bottom": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/686ad4bbbea9eb31a6357319_fire-rate-icon-minus-small-bottom.png",
  "ammo-plus-bottom": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/686ae0edb9c3de9845829be8_ammo-icon-plus-small-bottom.png",
  "ammo-minus-bottom": "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/686ae0edb34956d69eb680b8_ammo-icon-minus-small-bottom.png",

};

window.updateShareButtonState = function () {
  const shareButton = document.querySelector(".share-loadout-btn");
  const loadoutSelected = window.lastSelectedLoadoutIndex !== null;

  if (!shareButton) return;

  if (loadoutSelected) {
    shareButton.style.pointerEvents = "auto";
    shareButton.style.filter = "none";
  } else {
    shareButton.style.pointerEvents = "none";
    shareButton.style.filter = "grayscale(100%) brightness(61%)";
  }
};

  // 🚫 Disable scroll while loading
  document.documentElement.style.overflow = 'hidden';

  window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    const fill = document.querySelector(".loading-bar-fill");
    if (!loader || !fill) {
      document.documentElement.style.overflow = '';
      return;
    }

    loader.style.transition = "opacity 0.6s ease";
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          loader.style.opacity = "0";
          loader.style.pointerEvents = "none";
          setTimeout(() => {
            loader.style.display = "none";
            document.documentElement.style.overflow = '';
          }, 700);
        }, 200);
      }
      fill.style.width = `${progress}%`;
    }, 100);
  });

document.addEventListener("DOMContentLoaded", function () {
  window.updateShareButtonState(); // ✅ Safe to call here

  const weaponImageMap = {}; // If needed locally
  const locationDivs = {
    ".weapon-barrel-wrapper": ".attachment-location-div",
    ".weapon-sight-wrapper": ".sight-location-div",
    ".weapon-underbarrel-wrapper": ".underbarrel-location-div"
  };

  const switcher = document.querySelector(".card-toggle-switch");
  if (switcher) {
    switcher.addEventListener("click", () => {
      switcher.classList.toggle("flipped");
    });
  }

  // ... any more logic that touches DOM should also go here
});
    
function getOriginalWeaponImageSrc() {
  const originalSlug = window.originalWeaponSlug;
  if (!originalSlug) {
    console.warn("⚠️ No original weapon slug found.");
    return "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6862021c6c19d845e357fffc_Black%20Diamond.png";
  }

  const src = weaponImageMap[originalSlug];
  if (!src) {
    console.warn(`⚠️ No image src found in map for slug: ${originalSlug}`);
    return "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6862021c6c19d845e357fffc_Black%20Diamond.png";
  }

  return src;
}

function updateWeaponImageInPreview() {
  const weaponImagePreview = document.querySelector("img.weapon-image-save");
  const imageSrc = getOriginalWeaponImageSrc();
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "attributes" && mutation.attributeName === "src") {
      console.warn("🧪 weaponImageSave src was changed externally:", mutation.target.src);
    }
    if (mutation.type === "childList") {
      console.warn("🧪 weaponImageSave DOM was altered:", mutation);
    }
  }
});

if (weaponImage) {
  observer.observe(weaponImage, {
    attributes: true,
    childList: true,
    subtree: false,
    attributeFilter: ["src"]
  });
}

  if (!weaponImagePreview) {
    console.warn("⚠️ Couldn't find weapon-image-save img element");
    return;
  }

  console.log("🖼️ Setting weaponImagePreview.src to:", imageSrc);

  // Prevent double-writes
  if (weaponImagePreview.src !== imageSrc) {
    console.log("🔄 Updating weaponImagePreview src manually");
    weaponImagePreview.src = imageSrc;
  } else {
    console.log("⚪ weaponImagePreview src already correct");
  }
}

function restoreHiddenWeaponCard() {
  if (window.lastSelectedWeaponCard) {
    console.log("🔁 Restoring hidden weapon card:", window.lastSelectedWeaponCard);
    window.lastSelectedWeaponCard.style.opacity = "1";
    window.lastSelectedWeaponCard.style.order = `${window.cardOrder++}`;
    window.lastSelectedWeaponCard.style.zIndex = "1";
    window.lastSelectedWeaponCard.querySelector(".swiper-slide-content")?.classList.remove("hovered");
    window.lastSelectedWeaponCard = null;
  }
}

function waitForWeaponImageAndUpdate(attempts = 0) {
  const imgEl = document.querySelector("img.weapon-image-save");

  if (imgEl) {
    console.log(`✅ Found weapon-image-save on attempt ${attempts}`);

    if (imgEl.complete && imgEl.naturalHeight !== 0) {
      console.log("🖼️ Image is already loaded");
      updateWeaponImageInPreview();
      updatePreviewCard();
    } else {
      console.log("⏳ Image found but not loaded, waiting...");
      imgEl.onload = () => {
        console.log("✅ Image has finished loading");
        updateWeaponImageInPreview();
        requestAnimationFrame(() => {
          updatePreviewCard();
        });
      };
    }
  } else {
    console.log(`Attempt ${attempts}: weapon-image-save img null`);
    if (attempts < 20) {
      setTimeout(() => waitForWeaponImageAndUpdate(attempts + 1), 150);
    } else {
      console.warn("⚠️ weapon-image-save img still not found after retries");
    }
  }
}

function updatePreviewCard() {
  const selectedSrc = getSelectedWeaponImage();
  const currentSrc = weaponImage.src;

  if (!selectedSrc || selectedSrc.includes("placeholder-image.png")) {
    console.warn("⛔ selected weapon image is still invalid or missing, preserving current image");
    return;
  }

  if (selectedSrc !== currentSrc) {
    console.log("🖼️ Updating weaponImage.src once to:", selectedSrc);
    weaponImage.src = selectedSrc;
    previewImageLocked = true; // 🛡️ Prevent external overwrites
  } else {
    console.log("⚪ weaponImagePreview src already correct");
  }
}

    function hideWrapper(wrapper, wrapperSelector) {
      wrapper.style.display = "none";
      wrapper.style.opacity = "0";
      wrapper.style.visibility = "hidden";
      wrapper.style.pointerEvents = "none";
      const loc = document.querySelector(locationDivs[wrapperSelector]);
      if (loc) loc.style.zIndex = "1";
    }

    function showWrapper(wrapper, wrapperSelector) {
      wrapper.style.display = "grid";
      wrapper.style.opacity = "1";
      wrapper.style.visibility = "visible";
      wrapper.style.pointerEvents = "auto";
      const loc = document.querySelector(locationDivs[wrapperSelector]);
      if (loc) loc.style.zIndex = "10";
    }

    function showMatchingElements(selector, attr, value, display = "block") {
      document.querySelectorAll(selector).forEach(el => {
        const attrVal = el.getAttribute(attr)?.trim();
        const matches = attrVal?.split(",").map(s => s.trim()).includes(value);
        el.style.display = matches ? display : "none";
        el.style.opacity = matches ? "1" : "0";
        el.style.visibility = matches ? "visible" : "hidden";
        el.style.pointerEvents = matches ? "auto" : "none";
      });
    }

    function updateIcon(type, item) {
      const iconArea = document.querySelector(`.selected-${type}-icon`);
      if (!iconArea || !item) return;
      const image = item.querySelector("img");
      if (!image) return;
      const clone = document.createElement("div");
      clone.className = item.className;
      clone.appendChild(image.cloneNode(true));
      clone.style.display = "block";
      clone.style.width = "100%";
      clone.style.height = "100%";
      clone.addEventListener("click", e => {
        e.preventDefault();
        resetSelection(type);
        if (type === "barrel" && window.originalWeaponSlug) updatePanels(window.originalWeaponSlug, true);
      });
      iconArea.innerHTML = "";
      iconArea.appendChild(clone);
    }

    function resetSelection(type) {
      const map = {
        barrel: { slug: window.selectedBarrelSlug, icon: ".selected-barrel-icon", clear: () => window.selectedBarrelSlug = null },
        sight: { slug: window.selectedSightSlug, icon: ".selected-sight-icon", clear: () => window.selectedSightSlug = null },
        underbarrel: { slug: window.selectedUnderbarrelSlug, icon: ".selected-underbarrel-icon", clear: () => window.selectedUnderbarrelSlug = null }
      };
      map[type].clear();
      const icon = document.querySelector(map[type].icon);
      if (icon) icon.innerHTML = "";

      if (type === "sight") showMatchingElements(".sight-attachment-item", "data-sight", "___no-match___");
      if (type === "underbarrel") showMatchingElements(".underbarrel-attachment-item", "data-underbarrel", "___no-match___");
    }

    function toggleWrapper(wrapperSelector) {
      const wrapper = document.querySelector(wrapperSelector);
      if (!wrapper) return;
      if (openWrapper && openWrapper !== wrapper) {
        const prev = Object.keys(locationDivs).find(key => document.querySelector(key) === openWrapper);
        hideWrapper(openWrapper, prev);
      }
      const isVisible = wrapper.style.visibility === "visible";
      if (isVisible) {
        hideWrapper(wrapper, wrapperSelector);
        openWrapper = null;
      } else {
        showWrapper(wrapper, wrapperSelector);
        openWrapper = wrapper;
      }
    }

    function handleButtonClick(selector, dataAttr, type) {
      document.querySelectorAll(`${selector} [${dataAttr}]`).forEach(button => {
        const item = button.closest(selector);
        const tooltip = item.querySelector(`.weapon-${type}-tooltip`);
        button.addEventListener("mouseenter", () => {
          document.querySelectorAll(`${selector} .weapon-${type}-tooltip`).forEach(t => {
            t.style.visibility = "hidden";
            t.style.opacity = "0";
            t.style.display = "none";
          });
          if (tooltip) {
            tooltip.style.visibility = "visible";
            tooltip.style.opacity = "1";
            tooltip.style.display = "block";
          }
        });

        button.addEventListener("click", e => {
          e.preventDefault();
          const newSlug = button.getAttribute(dataAttr)?.trim();
          if (!newSlug) return;
          if (type === "barrel") window.selectedBarrelSlug = newSlug;
          if (type === "sight") window.selectedSightSlug = newSlug;
          if (type === "underbarrel") window.selectedUnderbarrelSlug = newSlug;
          updateIcon(type, item);
          if (type === "barrel") updatePanels(newSlug, true);
          if (type === "sight") showMatchingElements(".sight-attachment-item", "data-sight", newSlug);
          if (type === "underbarrel") showMatchingElements(".underbarrel-attachment-item", "data-underbarrel", newSlug);

          const wrapper = document.querySelector(`.weapon-${type}-wrapper`);
          if (wrapper) {
            hideWrapper(wrapper, `.weapon-${type}-wrapper`);
            openWrapper = null;
          }
        });
      });
    }

function updatePanels(slug, isAttachment = false) {
  const isNewWeapon = !isAttachment && slug !== window.currentBaseWeapon;
  if (isNewWeapon) {
    window.currentBaseWeapon = slug;
    window.originalWeaponSlug = slug;
    resetSelection("barrel");
    resetSelection("sight");
    resetSelection("underbarrel");
    [".weapon-barrel-wrapper", ".weapon-sight-wrapper", ".weapon-underbarrel-wrapper"].forEach(sel => {
      const wrap = document.querySelector(sel);
      if (wrap) hideWrapper(wrap, sel);
    });
  }

  showMatchingElements(".weapon-info", "data-weapon", slug);
  showMatchingElements(".damage-overview", "data-weapon", slug);
  showMatchingElements(".weapon-damage-panel", "data-slug", slug);
  showMatchingElements(".weapon-choice-info-item", "data-weapon", slug, "flex");

  if (!isAttachment) {
    showMatchingElements(".weapon-barrel-item", "data-parent-weapon", slug);
    showMatchingElements(".weapon-sight-item", "data-weapon", slug);
    showMatchingElements(".weapon-underbarrel-item", "data-weapon", slug);
  }
}

    const firstWeapon = document.querySelector(".swiper-slide [data-weapon]");
    if (firstWeapon) {
      const initialSlug = firstWeapon.getAttribute("data-weapon")?.trim();
      if (initialSlug) updatePanels(initialSlug, false);
    }

    document.querySelectorAll(".swiper-slide [data-weapon]").forEach(button => {
      button.addEventListener("click", e => {
        e.preventDefault();
        const slug = button.getAttribute("data-weapon")?.trim();
       if (!slug) return;
updatePanels(slug, false);
      });
    });

document.querySelectorAll(".swiper-slide [data-weapon]").forEach(button => {
  const slug = button.getAttribute("data-weapon")?.trim();
  if (!slug) return;
  const slide = button.closest(".swiper-slide");
  if (!slide) return;
  const img = slide.querySelector(".link-block-2 img"); // Update selector here to match your actual image container
  if (!img) return;
  weaponImageMap[slug] = img.src;
});

    handleButtonClick(".weapon-barrel-item", "data-attachment", "barrel");
    handleButtonClick(".weapon-sight-item", "data-sight", "sight");
    handleButtonClick(".weapon-underbarrel-item", "data-underbarrel", "underbarrel");

    document.querySelector(".toggle-image-barrel")?.addEventListener("click", () => toggleWrapper(".weapon-barrel-wrapper"));
    document.querySelector(".toggle-image-sight")?.addEventListener("click", () => toggleWrapper(".weapon-sight-wrapper"));
    document.querySelector(".toggle-image-underbarrel")?.addEventListener("click", () => toggleWrapper(".weapon-underbarrel-wrapper"));

document.querySelectorAll(".swiper-slide").forEach(slide => {
  const content = slide.querySelector(".swiper-slide-content");

  slide.addEventListener("mouseenter", () => {
    if (slide !== window.lastSelectedSlide) content?.classList.add("hovered");
  });

  slide.addEventListener("mouseleave", () => {
    content?.classList.remove("hovered");
  });

  slide.addEventListener("click", () => {
    if (window.isProgrammaticLoadoutClick) {
      console.log("⏭️ Skipping swiper animation due to programmatic loadout selection");
      return;
    }

    // ✅ Restore previously selected loadout card
    if (window.lastSelectedSlide?.classList.contains("loadout-slide")) {
      console.log("🔁 Switching from loadout to regular weapon — restoring swiper card");

     // ✅ Just restore styles — the card was never removed from DOM
if (typeof window.lastSelectedLoadoutIndex === "number") {
  const index = window.lastSelectedLoadoutIndex;
  const loadoutCard = document.querySelector(`.loadout-slide[data-loadout-index="${index}"]`);
  if (loadoutCard) {
    console.log("🎯 Restoring loadout card visibility");
    loadoutCard.style.opacity = "1";
    loadoutCard.style.order = `${window.cardOrder++}`;
    loadoutCard.style.zIndex = "1";
  }
}

      window.lastSelectedLoadoutIndex = null;
      window.lastSelectedSlide = null;
      window.currentClonedCard = null;

      // Remove loadout floating card
      document.querySelectorAll(".weapon-choice-card .floating-card").forEach(card => card.remove());
    }

    if (window.lastSelectedSlide === slide) return;

    // Restore previous slide
    if (window.lastSelectedSlide) {
      window.lastSelectedSlide.style.opacity = "1";
      window.lastSelectedSlide.style.order = `${window.cardOrder++}`;
      window.lastSelectedSlide.style.zIndex = "1";
      window.lastSelectedSlide.querySelector(".swiper-slide-content")?.classList.remove("hovered");
    }

    document.querySelectorAll(".weapon-choice-card .floating-card").forEach(card => {
      console.log("🧼 Cleaning up old floating card:", card);
      card.remove();
    });

    const newClone = content.cloneNode(true);
    newClone.classList.add("floating-card");
    newClone.style.zIndex = "50";
    newClone.style.opacity = "0";
    newClone.style.transform = "translateX(-50%) translateY(-20px)";
    newClone.style.transition = "all 0.3s ease";

    const weaponChoiceDiv = document.querySelector(".weapon-choice-card");
    weaponChoiceDiv.appendChild(newClone);
    newClone.offsetHeight;
    newClone.style.opacity = "1";
    newClone.style.transform = "translateX(-50%) translateY(0)";

    slide.style.opacity = "0";
    slide.style.order = "-1";
    slide.style.zIndex = "1";
    content?.classList.remove("hovered");

    window.lastSelectedWeaponCard = slide;
    window.currentClonedCard = newClone;
    window.lastSelectedSlide = slide;
  });
});

    // 💾 Save Loadout Panel Logic
    const savePanel = document.querySelector(".confirm-save-loadout");
    const openBtn = document.querySelector("[data-open-save-panel]");
    const cancelBtn = document.querySelector("[data-cancel-save-loadout]");
    const confirmBtn = document.querySelector("[data-confirm-save-loadout]");
    const input = document.querySelector("[data-save-loadout-name]");
    const nameTop = document.querySelector("[data-live-name-top]");
    const nameBottom = document.querySelector("[data-live-name-bottom]");
    const weaponImage = document.querySelector(".weapon-image-save");

    const diamondImages = {
      barrel: {
        white: document.querySelector(".white-diamond-barrel"),
        black: document.querySelector(".black-diamond-barrel")
      },
      sight: {
        white: document.querySelector(".white-diamond-sight"),
        black: document.querySelector(".black-diamond-sight")
      },
      underbarrel: {
        white: document.querySelector(".white-diamond-underbarrel"),
        black: document.querySelector(".black-diamond-underbarrel")
      }
    };

    const topIcons = document.querySelectorAll(".loadout-poker-customization-top img");
    const bottomIcons = document.querySelectorAll(".loadout-poker-customization-bottom img");

    const topIconButtons = document.querySelectorAll('[data-set-top-icon]');
    const bottomIconButtons = document.querySelectorAll('[data-set-bottom-icon]');
    const borderSwatches = document.querySelectorAll('[data-border-color]');

    let currentLoadout = {
      name: "",
      weapon: null,
      barrel: null,
      sight: null,
      underbarrel: null,
      topIcon: null,
      bottomIcon: null,
      borderColor: null
    };

function getSelectedWeaponImage() {
  const previewImg = document.querySelector(".weapon-image-save");
  return previewImg?.src || "";
}

    function updateDiamonds() {
      ["barrel", "sight", "underbarrel"].forEach(key => {
        const has = currentLoadout[key];
        if (diamondImages[key]) {
          diamondImages[key].white.style.display = has ? "block" : "none";
          diamondImages[key].black.style.display = has ? "none" : "block";
        }
      });
    }

    function updateIcons() {
      topIcons.forEach(icon => {
        icon.style.display = icon.classList.contains(currentLoadout.topIcon) ? "block" : "none";
      });
      bottomIcons.forEach(icon => {
        icon.style.display = icon.classList.contains(currentLoadout.bottomIcon) ? "block" : "none";
      });
    }

function updateBorderColor() {
  const border = document.querySelector(".loadout-card-border");
  if (border) {
    if (currentLoadout.borderColor) {
      border.style.borderColor = currentLoadout.borderColor;
    } else {
      border.style.borderColor = "transparent";
    }
  }
}

 

    topIconButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const icon = btn.getAttribute("data-set-top-icon");
        currentLoadout.topIcon = currentLoadout.topIcon === icon ? null : icon;
        topIconButtons.forEach(b => b.classList.remove("active"));
        if (currentLoadout.topIcon) btn.classList.add("active");
        updateIcons();
      });
    });

    bottomIconButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const icon = btn.getAttribute("data-set-bottom-icon");
        currentLoadout.bottomIcon = currentLoadout.bottomIcon === icon ? null : icon;
        bottomIconButtons.forEach(b => b.classList.remove("active"));
        if (currentLoadout.bottomIcon) btn.classList.add("active");
        updateIcons();
      });
    });

    borderSwatches.forEach(btn => {
      btn.addEventListener("click", () => {
        const color = btn.getAttribute("data-border-color");
        currentLoadout.borderColor = currentLoadout.borderColor === color ? null : color;
        borderSwatches.forEach(b => b.classList.remove("active"));
        if (currentLoadout.borderColor) btn.classList.add("active");
        updateBorderColor();
      });
    });

openBtn?.addEventListener("click", () => {
previewImageLocked = false; // 🔓 Allow 1 update when panel is opened
  currentLoadout.weapon = window.currentBaseWeapon || null;
  currentLoadout.barrel = window.selectedBarrelSlug || null;
  currentLoadout.sight = window.selectedSightSlug || null;
  currentLoadout.underbarrel = window.selectedUnderbarrelSlug || null;
 

  // Clear input + names
  input.value = "";
  nameTop.textContent = "";
  nameBottom.textContent = "";

  // Update diamonds based on current attachment state
  updateDiamonds(); // ✅ This is what was missing
  
  // Show the save panel
  savePanel.style.display = "flex";

  // Start the image load retry loop
  waitForWeaponImageAndUpdate();
});

    cancelBtn?.addEventListener("click", () => savePanel.style.display = "none");

    input?.addEventListener("input", () => {
      const val = input.value || "";
      nameTop.textContent = val;
      nameBottom.textContent = val;
    });

    confirmBtn?.addEventListener("click", () => {
  const name = input.value?.trim() || "Unnamed Loadout";
  currentLoadout.name = name;
  // Save to localStorage
  let saved = JSON.parse(localStorage.getItem("savedLoadouts") || "[]");
  saved.push({ ...currentLoadout });
  localStorage.setItem("savedLoadouts", JSON.stringify(saved));
  savePanel.style.display = "none";

  // Optionally clear input
  input.value = "";
  
  // You can add a console log for confirmation:
  console.log("Loadout saved:", currentLoadout);
  
});

const deleteBtn = document.querySelector(".delete-loadout-btn");
const deleteMenu = document.querySelector(".delete-loadout-menu");
const deleteList = document.querySelector(".loadout-delete-list");
const cancelDeleteBtn = document.querySelector(".cancel-delete-loadout");

function openDeleteMenu() {
  const saved = JSON.parse(localStorage.getItem("savedLoadouts") || "[]");

  deleteList.innerHTML = ""; // Clear old list

  if (saved.length === 0) {
    deleteList.innerHTML = "<p>No loadouts to delete.</p>";
    return;
  }

  saved.forEach((loadout, index) => {
    const item = document.createElement("div");
    item.className = "delete-loadout-item";
    item.innerHTML = `
      <span>${loadout.name || "Unnamed Loadout"}</span>
      <button data-delete-index="${index}" class="confirm-delete-btn"/button>
    `;
    deleteList.appendChild(item);
  });

  deleteMenu.style.display = "flex";
}

function closeDeleteMenu() {
  deleteMenu.style.display = "none";
}

deleteBtn?.addEventListener("click", openDeleteMenu);
cancelDeleteBtn?.addEventListener("click", closeDeleteMenu);

deleteList?.addEventListener("click", (e) => {
  if (e.target.classList.contains("confirm-delete-btn")) {
    const index = parseInt(e.target.getAttribute("data-delete-index"));
    let saved = JSON.parse(localStorage.getItem("savedLoadouts") || "[]");
    if (index >= 0 && index < saved.length) {
      saved.splice(index, 1);
      localStorage.setItem("savedLoadouts", JSON.stringify(saved));
      console.log(`🗑️ Deleted loadout at index ${index}`);
      openDeleteMenu(); // Refresh list
      if (typeof loadLoadouts === "function") loadLoadouts(); // optional
    }
  }
});
});
})();
</script>

<script>
const nameTopEl = document.querySelector("[data-live-name-top]");
const nameBottomEl = document.querySelector("[data-live-name-bottom]");
const nameInput = document.querySelector("[data-save-loadout-name]");

function resizeByCharacterCount(el, inputEl, threshold = 10, smallSize = 9, largeSize = 13) {
  if (!el || !inputEl) return;

  inputEl.addEventListener("input", () => {
    // Limit max characters to 33
    if (inputEl.value.length > 33) {
      inputEl.value = inputEl.value.substring(0, 33);
    }

    const length = inputEl.value.length;
    if (length > threshold) {
      el.style.fontSize = `${smallSize}px`;
    } else {
      el.style.fontSize = `${largeSize}px`;
    }
  });

  // Initial call
  if (inputEl.value.length > threshold) {
    el.style.fontSize = `${smallSize}px`;
  } else {
    el.style.fontSize = `${largeSize}px`;
  }
}

// Run for both top and bottom text elements
resizeByCharacterCount(nameTopEl, nameInput);
resizeByCharacterCount(nameBottomEl, nameInput);
</script>

<script>
(function () {
  // Get container for loadout swiper slides
  const loadoutWrapper = document.querySelector(".loadout-swiper-wrapper");

function createLoadoutCard(loadout, index) {
  const div = document.createElement("div");
  div.className = "loadout-slide";
  div.setAttribute("data-loadout-index", index);

  div.innerHTML = `
    <div class="loadout-slide-content">
      <div class="loadout-slide-border" style="border: 0.5px solid ${loadout.borderColor || 'transparent'}"></div>
      <div class="loadout-slide-diamonds">
        <img src="https://cdn.prod.website-files.com/68390e8290cb63217295e99d/686ae4fb1811776d32297278_barrel-mod-on-small.png" class="slide-white-diamond-barrel" style="display:${loadout.barrel ? 'block' : 'none'}" />
        <img src="https://cdn.prod.website-files.com/68390e8290cb63217295e99d/686ae4fb7f5de30652e51c24_barrel-mod-off-small.png" class="slide-black-diamond-barrel" style="display:${loadout.barrel ? 'none' : 'block'}" />
        <img src="https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6862020f529c87a4a9791d6d_White%20Diamond.png" class="slide-white-diamond-sight" style="display:${loadout.sight ? 'block' : 'none'}" />
        <img src="https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6862021c6c19d845e357fffc_Black%20Diamond.png" class="slide-black-diamond-sight" style="display:${loadout.sight ? 'none' : 'block'}" />
        <img src="https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6862020f529c87a4a9791d6d_White%20Diamond.png" class="slide-white-diamond-underbarrel" style="display:${loadout.underbarrel ? 'block' : 'none'}" />
        <img src="https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6862021c6c19d845e357fffc_Black%20Diamond.png" class="slide-black-diamond-underbarrel" style="display:${loadout.underbarrel ? 'none' : 'block'}" />
      </div>
      <div class="loadout-slide-backdrop"></div>
      <a href="#" class="loadout-slide-link-block w-inline-block">
        <img src="${getWeaponImage(loadout.weapon)}" alt="Weapon Image" class="loadout-slide-image" loading="lazy" />
      </a>
      <div class="loadout-slide-name-bottom">${loadout.name || "Unnamed Loadout"}</div>
      <div class="loadout-slide-name-top">${loadout.name || "Unnamed Loadout"}</div>
      <div class="slide-poker-customization-top">${renderPokerIcons(loadout.topIcon, "top")}</div>
      <div class="slide-poker-customization-bottom">${renderPokerIcons(loadout.bottomIcon, "bottom")}</div>
    </div>
  `;

// Add hover interaction to new card
div.addEventListener("mouseenter", () => {
  const content = div.querySelector(".loadout-slide-content");
  if (div !== window.lastSelectedSlide) content?.classList.add("hovered");
});

div.addEventListener("mouseleave", () => {
  const content = div.querySelector(".loadout-slide-content");
  content?.classList.remove("hovered");
});

div.addEventListener("click", (e) => {
  e.preventDefault();
  window.isProgrammaticLoadoutClick = true;

// Add hover interaction to new card
div.addEventListener("mouseenter", () => {
  const content = div.querySelector(".loadout-slide-content");
  if (div !== window.lastSelectedSlide) content?.classList.add("hovered");
});

div.addEventListener("mouseleave", () => {
  const content = div.querySelector(".loadout-slide-content");
  content?.classList.remove("hovered");
});

  const weaponCardBtn = document.querySelector(`.swiper-slide [data-weapon="${loadout.weapon}"]`);
  if (weaponCardBtn) {
    const slide = weaponCardBtn.closest(".swiper-slide");
    if (slide) {
      window.lastSelectedWeaponCard = slide;
      console.log("🎯 Set lastSelectedWeaponCard from loadout:", slide);
    }
    weaponCardBtn.click();
  }

  setTimeout(() => {
    window.isProgrammaticLoadoutClick = false;
  }, 100);

  // Restore previous slide (if any)
  if (window.lastSelectedSlide) {
    window.lastSelectedSlide.style.opacity = "1";
    window.lastSelectedSlide.style.order = `${window.cardOrder++}`;
    window.lastSelectedSlide.style.zIndex = "1";
    window.lastSelectedSlide.querySelector(".swiper-slide-content")?.classList.remove("hovered");
  }

  // Remove old floating cards
  document.querySelectorAll(".weapon-choice-card .floating-card").forEach(card => {
    console.log("🔥 Removing leftover floating card:", card);
    card.remove();
  });

  // ✅ Reinsert swiper card if hidden
  if (window.lastSelectedWeaponCard) {
    const weaponCard = window.lastSelectedWeaponCard;
    const swiperWrapper = document.querySelector(".swiper-wrapper");
    if (weaponCard && swiperWrapper && !swiperWrapper.contains(weaponCard)) {
      console.log("🔁 Reinserting previous weapon card into swiper");
      swiperWrapper.appendChild(weaponCard);
    }
    weaponCard.style.opacity = "1";
    weaponCard.style.order = `${window.cardOrder++}`;
    weaponCard.style.zIndex = "1";
    weaponCard.querySelector(".swiper-slide-content")?.classList.remove("hovered");
    window.lastSelectedWeaponCard = null;
  }

  const cloneContent = div.querySelector(".loadout-slide-content").cloneNode(true);
  cloneContent.classList.add("floating-card");
  cloneContent.style.zIndex = "50";
  cloneContent.style.opacity = "0";
  cloneContent.style.transform = "translateX(-50%) translateY(60px)";
  cloneContent.style.transition = "all 0.3s ease";

  const weaponChoiceDiv = document.querySelector(".weapon-choice-card");
  weaponChoiceDiv.appendChild(cloneContent);
  cloneContent.offsetHeight;
  cloneContent.style.opacity = "1";
  cloneContent.style.transform = "translateX(-50%) translateY(0)";

  div.style.opacity = "0";
  div.style.order = "-1";
  div.style.zIndex = "1";

  // ✅ Save state
  window.lastSelectedLoadoutIndex = index;
  window.currentClonedCard = cloneContent;
  window.lastSelectedSlide = div;

  applyLoadout(loadout);
});

  // 🧠 Responsive font size
  const nameTop = div.querySelector(".loadout-slide-name-top");
  const nameBottom = div.querySelector(".loadout-slide-name-bottom");
  [nameTop, nameBottom].forEach(el => {
    const name = el.textContent.trim();
    el.style.fontSize = name.length < 12 ? "13px" : "9px";
  });

  return div;
}

  // Helper to get weapon image src from slug (from your existing weaponImageMap)
  function getWeaponImage(weaponSlug) {
    if (!weaponSlug) return "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6862021c6c19d845e357fffc_Black%20Diamond.png";
    return window.weaponImageMap && window.weaponImageMap[weaponSlug]
      ? window.weaponImageMap[weaponSlug]
      : "https://cdn.prod.website-files.com/68390e8290cb63217295e99d/6862021c6c19d845e357fffc_Black%20Diamond.png";
  }

  // Helper to render poker icon img tags with display toggling based on current icon class
  function renderPokerIcons(iconClass, position) {
  if (!iconClass) return "";

  const iconKey = iconClass; // like 'black-hearts-top'
  const imageUrl = pokerIconMap[iconKey];

  if (!imageUrl) return "";

  return `<img src="${imageUrl}" alt="${iconKey}" class="active-poker-icon-${position}" loading="lazy" />`;
}

  // Load all saved loadouts from localStorage and render them
  function loadLoadouts() {
    const saved = JSON.parse(localStorage.getItem("savedLoadouts") || "[]");
    loadoutWrapper.innerHTML = ""; // clear existing
  window.updateShareButtonState();

    if (!saved.length) {
      loadoutWrapper.innerHTML = `<div class="no-loadouts">No loadouts saved yet.</div>`;
      return;
    }

    saved.forEach((loadout, index) => {
      const card = createLoadoutCard(loadout, index);
      loadoutWrapper.appendChild(card);
    });
  }

// ✅ DETECT & PREVIEW SHARED LOADOUT
const urlParams = new URLSearchParams(window.location.search);
const sharedRaw = urlParams.get("data");
const sharedFlag = urlParams.get("sharedLoadout");

if (sharedRaw && sharedFlag === "1") {
  try {
    const loadoutData = JSON.parse(decodeURIComponent(sharedRaw));
    const saveMenu = document.querySelector(".save-share-loadout-menu");
    const saveCardContainer = document.querySelector(".save-share-slide-content");

    if (loadoutData && saveMenu && saveCardContainer) {
      const card = createLoadoutCard(loadoutData, 999);
      saveCardContainer.innerHTML = "";
      saveCardContainer.appendChild(card);
      saveMenu.style.display = "flex";
      saveMenu.classList.add("active");
      console.log("✅ Shared loadout loaded & preview shown:", loadoutData);
    }
  } catch (e) {
    console.warn("❌ Failed to parse shared loadout:", e);
  }
}

// =============================
// SHARE LOADOUT UI
// =============================
(function () {
  const shareBtn = document.querySelector(".share-loadout-btn");
  const shareMenu = document.querySelector(".share-loadout-menu");
  const shareInner = document.querySelector(".share-loadout-inner");
  const cancelShare = document.querySelector(".cancel-share-loadout");
  const confirmShare = document.querySelector(".confirm-share-btn");
  const shareCardContainer = document.querySelector(".share-slide-content");

  const saveMenu = document.querySelector(".save-share-loadout-menu");
  const cancelSave = document.querySelector(".cancel-save-share-loadout");
  const confirmSave = document.querySelector(".confirm-save-share-btn");
  const saveCardContainer = document.querySelector(".save-share-slide-content");

  // 🔓 OPEN share menu with card preview
  if (shareBtn && shareMenu && shareCardContainer) {
    shareBtn.addEventListener("click", () => {
      shareMenu.classList.add("show");

      const loadouts = JSON.parse(localStorage.getItem("savedLoadouts") || "[]");
      const index = window.lastSelectedLoadoutIndex;

      if (loadouts[index]) {
        const card = createLoadoutCard(loadouts[index], index);
        shareCardContainer.innerHTML = "";
        shareCardContainer.appendChild(card);
      }
    });
  }

  // ❌ CANCEL share
  if (cancelShare) {
    cancelShare.addEventListener("click", () => {
      shareMenu.classList.remove("show");
    });
  }

  // ✅ CONFIRM share: generate & copy URL
  if (confirmShare) {
    confirmShare.addEventListener("click", () => {
      const loadouts = JSON.parse(localStorage.getItem("savedLoadouts") || "[]");
      const index = window.lastSelectedLoadoutIndex;
      if (!loadouts[index]) return;

      const data = encodeURIComponent(JSON.stringify(loadouts[index]));
      const url = `${window.location.origin}${window.location.pathname}?sharedLoadout=1&data=${data}`;

      navigator.clipboard.writeText(url).then(() => {
        alert("🔗 Shareable link copied to clipboard!");
      });

      shareMenu.classList.remove("show");
    });
  }

  // 🔄 CHECK FOR SHARED LOADOUT ON PAGE LOAD
    const urlParams = new URLSearchParams(window.location.search);
    const isShared = urlParams.get("sharedLoadout");
    const raw = urlParams.get("data");

    if (isShared && raw) {
      try {
        const loadout = JSON.parse(decodeURIComponent(raw));
        if (!loadout || !loadout.weapon) throw new Error("Invalid loadout data");

        saveMenu?.classList.add("show");
        if (saveCardContainer) {
          const card = createLoadoutCard(loadout, 999); // temporary index
          saveCardContainer.innerHTML = "";
          saveCardContainer.appendChild(card);
        }

        // Save if user confirms
              confirmSave?.addEventListener("click", () => {
          const saved = JSON.parse(localStorage.getItem("savedLoadouts") || "[]");
          saved.push(loadout);
          localStorage.setItem("savedLoadouts", JSON.stringify(saved));
          saveMenu.classList.remove("show");
          alert("✅ Loadout saved!");
          if (typeof loadLoadouts === "function") loadLoadouts();
 
  const url = new URL(window.location.href);
  url.searchParams.delete("sharedLoadout");
  url.searchParams.delete("data");
  window.history.replaceState({}, "", url.pathname + url.search);
  console.log("✅ Cleared shared loadout from URL after saving.");

  if (saveMenu) {
    saveMenu.classList.add("animate-out");

    // Wait for the animation to finish before fully hiding
    setTimeout(() => {
      saveMenu.classList.remove("show", "active", "animate-out");
      saveMenu.style.display = "none";
      console.log("✅ Animated and closed save confirmation panel.");
    }, 400); // match the transition duration in CSS
  }
});
        // Cancel sharing
        cancelSave?.addEventListener("click", () => {
          saveMenu.classList.remove("show");
        });
      } catch (err) {
        console.warn("❌ Failed to import shared loadout:", err);
      }
    }
})();

function tryClickAttachment(selector, wrapperSelector, maxAttempts = 20, delay = 100) {
  let attempts = 0;

  function isWrapperVisible(wrapperSelector) {
    const wrapper = document.querySelector(wrapperSelector);
    if (!wrapper) return false;
    const style = window.getComputedStyle(wrapper);
    return style.visibility === "visible" && style.display !== "none" && style.opacity !== "0";
  }

  function tryFind() {
    const wrapperVisible = isWrapperVisible(wrapperSelector);
    if (!wrapperVisible) {
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(tryFind, delay);
      } else {
        console.warn("⚠️ Wrapper never became visible:", wrapperSelector);
      }
      return;
    }

    const item = document.querySelector(selector);
    if (!item) {
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(tryFind, delay);
      } else {
        console.warn("⚠️ Failed to find attachment after retries:", selector);
      }
      return;
    }

    // ✅ Click the correct inner link block
    const linkBlock = item.querySelector("a[class^='link-block']");
    if (linkBlock) {
      linkBlock.click();
      console.log("✅ Clicked attachment:", selector);
    } else {
      console.warn("⚠️ No clickable link block inside:", selector);
    }
  }

  tryFind();
}

function applyLoadout(loadout) {
  if (!loadout || !loadout.weapon) return;

  console.log("🎯 Applying loadout (via click simulation):", loadout);

  // Simulate clicking the weapon card
  const weaponCardBtn = document.querySelector(`.swiper-slide [data-weapon="${loadout.weapon}"]`);
  if (weaponCardBtn) {
    weaponCardBtn.click();
  } else {
    console.warn("⚠️ Could not find weapon card for:", loadout.weapon);
  }

// ⏳ Wait for weapon panel animation, then simulate attachment clicks
setTimeout(() => {
  simulateAttachmentClicks(loadout);
}, 500);

  // Global state sync
  window.currentBaseWeapon = loadout.weapon;
  window.originalWeaponSlug = loadout.weapon;
  window.selectedBarrelSlug = loadout.barrel;
  window.selectedSightSlug = loadout.sight;
  window.selectedUnderbarrelSlug = loadout.underbarrel;

  // Cosmetic sync
  if (typeof updateIcons === "function") updateIcons();
  if (typeof updateBorderColor === "function") updateBorderColor();
  if (typeof updateDiamonds === "function") updateDiamonds();

  console.log("✅ Loadout fully applied.");
}

function simulateAttachmentClicks(loadout) {
  // === BARREL ===
  if (loadout.barrel) {
    setTimeout(() => {
      document.querySelector(".toggle-image-barrel")?.click();
      setTimeout(() => {
        const btn = document.querySelector(`.weapon-barrel-item [data-attachment="${loadout.barrel}"]`);
        if (btn) {
          btn.click();
        } else {
          console.warn("❌ Barrel not found:", loadout.barrel);
        }
      }, 300);
    }, 200);
  } else {
if (!loadout.barrel) {
  setTimeout(() => clickDeselectIcon("barrel"), 200);
}
}

  // === SIGHT ===
  if (loadout.sight) {
    setTimeout(() => {
      document.querySelector(".toggle-image-sight")?.click();
      setTimeout(() => {
        const btn = document.querySelector(`.weapon-sight-item [data-sight="${loadout.sight}"]`);
        if (btn) {
          btn.click();
        } else {
          console.warn("❌ Sight not found:", loadout.sight);
        }
      }, 300);
    }, 800);
  } else {
if (!loadout.sight) {
  setTimeout(() => clickDeselectIcon("sight"), 800);
}
}


  // === UNDERBARREL ===
  if (loadout.underbarrel) {
    setTimeout(() => {
      document.querySelector(".toggle-image-underbarrel")?.click();
      setTimeout(() => {
        const btn = document.querySelector(`.weapon-underbarrel-item [data-underbarrel="${loadout.underbarrel}"]`);
        if (btn) {
          btn.click();
        } else {
          console.warn("❌ Underbarrel not found:", loadout.underbarrel);
        }
      }, 300);
    }, 1400);
  } else {
if (!loadout.underbarrel) {
  setTimeout(() => clickDeselectIcon("underbarrel"), 1400);
}
}
}

function clickDeselectIcon(type) {
  const icon = document.querySelector(`.selected-${type}-icon`);
  const clickable = icon?.querySelector("div"); // the cloned clickable wrapper
  if (clickable) {
    clickable.click();
    console.log(`🔄 Deselected ${type} by clicking inside icon container`);
  } else {
    console.warn(`⚠️ No clickable clone found for ${type} deselect`);
  }
}

// 🔁 Utility: Populate the shared loadout preview card
function updateSharePreviewCard(loadoutData, targetContainer) {
  if (!loadoutData || !targetContainer) return;

  const nameTop = targetContainer.querySelector("[data-live-name-top]");
  const nameBottom = targetContainer.querySelector("[data-live-name-bottom]");
  const weaponImg = targetContainer.querySelector(".loadout-weapon-img");

  const topIcon = targetContainer.querySelector(".loadout-poker-customization-top img");
  const bottomIcon = targetContainer.querySelector(".loadout-poker-customization-bottom img");

  const barrelDiamond = targetContainer.querySelector('[data-slot="barrel"]');
  const sightDiamond = targetContainer.querySelector('[data-slot="sight"]');
  const underbarrelDiamond = targetContainer.querySelector('[data-slot="underbarrel"]');

  nameTop.textContent = loadoutData.name || "Shared Loadout";
  nameBottom.textContent = loadoutData.name || "Shared Loadout";

  weaponImg.src = window.weaponImageMap[loadoutData.weapon] || "";

  if (topIcon) topIcon.src = window.pokerIconMap[loadoutData.topIcon] || "";
  if (bottomIcon) bottomIcon.src = window.pokerIconMap[loadoutData.bottomIcon] || "";

  barrelDiamond.classList.toggle("active", !!loadoutData.barrel);
  sightDiamond.classList.toggle("active", !!loadoutData.sight);
  underbarrelDiamond.classList.toggle("active", !!loadoutData.underbarrel);
}

document.addEventListener("DOMContentLoaded", () => {
  // 🔄 Load existing local loadouts
  loadLoadouts();

  // 🔗 DOM element references
  const shareMenu = document.querySelector(".share-loadout-menu");
  const shareInner = document.querySelector(".share-loadout-inner");
  const saveShareMenu = document.querySelector(".save-share-loadout-menu");
  const saveShareInner = document.querySelector(".save-share-loadout-inner");

  const shareBtn = document.querySelector(".share-loadout-btn");
  const cancelShareBtn = document.querySelector(".cancel-share-loadout");
  const cancelSaveShareBtn = document.querySelector(".cancel-save-share-loadout");

  const toggleBtn = document.querySelector("[data-toggle-loadouts]");
  const cardSwitcher = document.querySelector(".card-toggle-switch");

  // 🟢 Share Modal Open
  if (shareBtn && shareMenu) {
    shareBtn.addEventListener("click", () => {
      shareMenu.style.display = "flex";
      shareMenu.classList.add("active"); // Optional: triggers your backdrop/centering CSS
    });
  }

  // 🔴 Share Modal Close
  if (cancelShareBtn && shareMenu) {
    cancelShareBtn.addEventListener("click", () => {
      shareMenu.style.display = "none";
      shareMenu.classList.remove("active");
    });
  }

  // 🔴 Cancel receiving shared loadout
  if (cancelSaveShareBtn && saveShareMenu) {
    cancelSaveShareBtn.addEventListener("click", () => {
// Show
saveShareMenu.classList.add("active");

// Hide
saveShareMenu.classList.remove("active");
    });
  }

  // 🔄 Toggle between card swiper & loadout cards
  if (toggleBtn && cardSwitcher) {
    toggleBtn.addEventListener("click", () => {
      const weaponSwiper = document.querySelector(".swiper-wrapper");
      const loadoutSwiper = document.querySelector(".loadout-swiper");

      if (!weaponSwiper || !loadoutSwiper) return;

      const showingLoadouts = loadoutSwiper.style.display === "flex";

      // Flip animation
      cardSwitcher.classList.toggle("flipped", !showingLoadouts);

      // Toggle visibility
      loadoutSwiper.style.display = showingLoadouts ? "none" : "flex";
      weaponSwiper.style.display = showingLoadouts ? "flex" : "none";

      // Animate loadout cards in
      if (!showingLoadouts) {
        const cards = loadoutSwiper.querySelectorAll(".loadout-slide");
        cards.forEach((card, i) => {
          card.classList.remove("animate-in");
          setTimeout(() => {
            card.classList.add("animate-in");
            card.addEventListener("animationend", () => {
              card.classList.remove("animate-in");
            });
          }, i * 80);
        });
      }
    });
  }
});
})();
</script>
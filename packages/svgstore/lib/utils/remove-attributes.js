/**
 * Utility to remove specific attributes from all
 * child nodes of a given node.
 */

"use strict";

function removeAttributes(el, attrs) {
  let localAttrs = attrs;

  if (localAttrs === true) {
    localAttrs = ["style"];
  }

  if (!localAttrs || !localAttrs.length) {
    return el;
  }

  const els = el.find("*");

  els.each((i, _el) => {
    localAttrs.forEach((attr) => {
      els.eq(i).removeAttr(attr);
    });
  });

  return el;
}

module.exports = removeAttributes;

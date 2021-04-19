export function CssUtilities() {
  function getRootElementFontSize() {
    return parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
  }

  function convertRem(value) {
    return value * getRootElementFontSize();
  }

  return {
    convertRem: convertRem
  };
}

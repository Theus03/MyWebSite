/**
 * jsdom também não implementa IntersectionObserver — usado pelo FadeUp para
 * disparar a animação quando o elemento entra na viewport. Mock inerte:
 * suficiente pra montar/desmontar sem erro, os testes não dependem do disparo real.
 */
if (typeof window !== "undefined" && !window.IntersectionObserver) {
  window.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };
}

/**
 * jsdom não implementa window.matchMedia — o FadeUp (packages/ui) depende dele
 * para checar `prefers-reduced-motion`. Polyfill mínimo compartilhado por todo pacote.
 */
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = function matchMedia(query) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: function () {},
      removeListener: function () {},
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () {
        return false;
      },
    };
  };
}

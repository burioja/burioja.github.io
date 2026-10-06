(function () {
  var LEGAL = window.LEGAL;
  var LANGS = [
    { code: "en", label: "English" },
    { code: "ko", label: "한국어" },
    { code: "ja", label: "日本語" },
    { code: "es", label: "Español" },
    { code: "pt", label: "Português" },
    { code: "id", label: "Indonesia" },
    { code: "tr", label: "Türkçe" },
    { code: "zh", label: "中文" }
  ];

  function lang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q && LEGAL.langs.indexOf(q) >= 0) return q;
    return "en";
  }

  function withLang(href) {
    var code = lang();
    return href + (href.indexOf("?") >= 0 ? "&" : "?") + "lang=" + code;
  }

  function setLang(code) {
    var url = new URL(location.href);
    url.searchParams.set("lang", code);
    history.replaceState(null, "", url);
    render();
  }

  function renderNav() {
    var doc = document.body.getAttribute("data-doc");
    var code = lang();
    var links = [
      ["index.html", "home", { en: "Home", ko: "홈", ja: "ホーム", es: "Inicio", pt: "Início", id: "Beranda", tr: "Ana sayfa", zh: "首页" }],
      ["privacy.html", "privacy", LEGAL.titles.privacy],
      ["terms.html", "terms", LEGAL.titles.terms],
      ["ugc.html", "ugc", LEGAL.titles.ugc]
    ];
    var nav = document.getElementById("nav");
    nav.innerHTML = "";
    links.forEach(function (item) {
      var a = document.createElement("a");
      a.href = withLang(item[0]);
      a.textContent = item[2][code] || item[2].en;
      if (item[1] === doc) a.className = "active";
      nav.appendChild(a);
    });

    var bar = document.getElementById("langs");
    bar.innerHTML = "";
    LANGS.forEach(function (item) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = item.label;
      if (item.code === code) b.setAttribute("aria-current", "true");
      b.addEventListener("click", function () { setLang(item.code); });
      bar.appendChild(b);
    });
  }

  function render() {
    var code = lang();
    var doc = document.body.getAttribute("data-doc");
    document.documentElement.lang = code === "zh" ? "zh-Hans" : code;
    renderNav();

    if (doc === "home") {
      document.getElementById("privacy-link").href = withLang("privacy.html");
      document.getElementById("terms-link").href = withLang("terms.html");
      document.getElementById("ugc-link").href = withLang("ugc.html");
      document.title = "SWAP PUZZLER";
      return;
    }

    var title = LEGAL.titles[doc][code] || LEGAL.titles[doc].en;
    var body = LEGAL.bodies[doc][code] || LEGAL.bodies[doc].en;
    document.getElementById("title").textContent = title;
    document.getElementById("body").textContent = body;
    document.title = title + " — SWAP PUZZLER";
  }

  render();
})();

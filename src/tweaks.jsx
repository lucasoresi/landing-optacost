// tweaks.jsx — Panel de tweaks (color, type, copy, layout)
function Tweaks({ t, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection label="Idioma & marca" />
      <TweakRadio
        label="Idioma"
        value={t.lang}
        options={["es", "en"]}
        onChange={(v) => setTweak("lang", v)}
      />
      <TweakColor
        label="Acento"
        value={accentSwatch(t.accent)}
        options={[
          swatchFor("verde"),
          swatchFor("azul"),
          swatchFor("ambar"),
          swatchFor("violeta"),
        ]}
        onChange={(v) => setTweak("accent", accentNameFor(v))}
      />

      <TweakSection label="Layout" />
      <TweakRadio
        label="Densidad"
        value={t.density}
        options={["compact", "regular", "comfy"]}
        onChange={(v) => setTweak("density", v)}
      />
      <TweakToggle
        label="Hero en oscuro"
        value={t.darkHero}
        onChange={(v) => setTweak("darkHero", v)}
      />
      <TweakToggle
        label="Acentos serif"
        value={t.serifAccents}
        onChange={(v) => setTweak("serifAccents", v)}
      />

      <TweakSection label="Secciones" />
      <TweakToggle
        label="Logos clientes"
        value={t.showLogos}
        onChange={(v) => setTweak("showLogos", v)}
      />
      <TweakToggle
        label="Precios"
        value={t.showPricing}
        onChange={(v) => setTweak("showPricing", v)}
      />
      <TweakToggle
        label="FAQ"
        value={t.showFAQ}
        onChange={(v) => setTweak("showFAQ", v)}
      />
      <TweakToggle
        label="Seguridad"
        value={t.showSecurity}
        onChange={(v) => setTweak("showSecurity", v)}
      />

      <TweakSection label="Copy del hero" />
      <TweakRadio
        label="Headline"
        value={t.headline}
        options={["auto", "precision", "lab"]}
        onChange={(v) => setTweak("headline", v)}
      />
    </TweaksPanel>
  );
}

// helpers
const ACCENTS = {
  verde:    "#4ea989",
  azul:     "#3a78d8",
  ambar:    "#d99655",
  violeta:  "#8a6dd9",
};
function swatchFor(name) { return ACCENTS[name]; }
function accentSwatch(name) { return ACCENTS[name] || ACCENTS.verde; }
function accentNameFor(swatch) {
  return Object.keys(ACCENTS).find((k) => ACCENTS[k] === swatch) || "verde";
}

window.Tweaks = Tweaks;

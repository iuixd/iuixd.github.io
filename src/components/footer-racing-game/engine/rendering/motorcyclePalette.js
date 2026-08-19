/**
 * Five original opponent liveries. Each varies body colour, helmet stripe, number-panel
 * colours, and the number itself — never colour alone — so riders stay distinguishable for
 * players with colour-vision deficiencies too.
 */
export const MOTORCYCLE_VARIANTS = [
  {
    id: 0,
    body: "#c1272d",
    bodyShade: "#8f1c21",
    trim: "#f4f4f2",
    helmet: "#c1272d",
    helmetStripe: "#f4f4f2",
    numberBg: "#f4f4f2",
    numberText: "#c1272d",
    number: "7",
  },
  {
    id: 1,
    body: "#1b5fa8",
    bodyShade: "#123f70",
    trim: "#f4f4f2",
    helmet: "#1b5fa8",
    helmetStripe: "#ffd23f",
    numberBg: "#f4f4f2",
    numberText: "#1b5fa8",
    number: "12",
  },
  {
    id: 2,
    body: "#e6c229",
    bodyShade: "#a88c17",
    trim: "#1c1c1c",
    helmet: "#e6c229",
    helmetStripe: "#1c1c1c",
    numberBg: "#1c1c1c",
    numberText: "#e6c229",
    number: "3",
  },
  {
    id: 3,
    body: "#2f8f46",
    bodyShade: "#1e622f",
    trim: "#f4f4f2",
    helmet: "#2f8f46",
    helmetStripe: "#f4f4f2",
    numberBg: "#f4f4f2",
    numberText: "#2f8f46",
    number: "9",
  },
  {
    id: 4,
    body: "#d97b1f",
    bodyShade: "#9c5613",
    trim: "#2a2a2e",
    helmet: "#2a2a2e",
    helmetStripe: "#d97b1f",
    numberBg: "#2a2a2e",
    numberText: "#d97b1f",
    number: "21",
  },
];

export function getMotorcycleVariant(index) {
  return MOTORCYCLE_VARIANTS[((index % MOTORCYCLE_VARIANTS.length) + MOTORCYCLE_VARIANTS.length) % MOTORCYCLE_VARIANTS.length];
}

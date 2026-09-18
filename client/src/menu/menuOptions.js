/**
 * Per-category customization options for the Ember & Bloom menu.
 * Each option group has:
 *   id         - stable key used in cart line key
 *   label      - human-readable section title
 *   type       - "radio" (pick one) | "checkbox" (pick many)
 *   required   - must have a selection before adding to cart
 *   choices    - array of { id, label, price } where price is additional cost in dollars
 *
 * Only add options that make sense for the category.
 * Pastries have no milk/shot options.
 */

const sizeOptions = {
  id: "size",
  label: "Size",
  type: "radio",
  required: true,
  choices: [
    { id: "small", label: "Small (8 oz)", price: -0.5 },
    { id: "medium", label: "Medium (12 oz)", price: 0 },
    { id: "large", label: "Large (16 oz)", price: 0.75 },
  ],
};

const milkOptions = {
  id: "milk",
  label: "Milk",
  type: "radio",
  required: true,
  choices: [
    { id: "whole", label: "Whole Milk", price: 0 },
    { id: "oat", label: "Oat Milk", price: 0.5 },
    { id: "almond", label: "Almond Milk", price: 0.5 },
    { id: "none", label: "No Milk", price: 0 },
  ],
};

const milkOptional = {
  id: "milk",
  label: "Milk",
  type: "radio",
  required: false,
  choices: [
    { id: "none", label: "None (Black)", price: 0 },
    { id: "whole", label: "Whole Milk", price: 0 },
    { id: "oat", label: "Oat Milk", price: 0.5 },
    { id: "almond", label: "Almond Milk", price: 0.5 },
  ],
};

const tempOptions = {
  id: "temp",
  label: "Temperature",
  type: "radio",
  required: true,
  choices: [
    { id: "hot", label: "Hot", price: 0 },
    { id: "iced", label: "Iced", price: 0 },
  ],
};

const espressoExtras = {
  id: "extras",
  label: "Extras",
  type: "checkbox",
  required: false,
  choices: [
    { id: "extra_shot", label: "Extra Shot", price: 1.0 },
    { id: "vanilla_syrup", label: "Vanilla Syrup", price: 0.5 },
    { id: "caramel_syrup", label: "Caramel Drizzle", price: 0.5 },
    { id: "hazelnut_syrup", label: "Hazelnut Syrup", price: 0.5 },
  ],
};

const coldExtras = {
  id: "extras",
  label: "Extras",
  type: "checkbox",
  required: false,
  choices: [
    { id: "extra_shot", label: "Extra Concentrate", price: 1.0 },
    { id: "vanilla_syrup", label: "Vanilla Syrup", price: 0.5 },
    { id: "sweet_cream", label: "Sweet Cream Foam", price: 0.75 },
  ],
};

const signatureExtras = {
  id: "extras",
  label: "Extras",
  type: "checkbox",
  required: false,
  choices: [
    { id: "extra_shot", label: "Extra Shot", price: 1.0 },
    { id: "oat_milk", label: "Upgrade to Oat Milk", price: 0.5 },
    { id: "extra_sweet", label: "Extra Sweetness", price: 0 },
  ],
};

const pastryExtras = {
  id: "extras",
  label: "Add-ons",
  type: "checkbox",
  required: false,
  choices: [
    { id: "warmed", label: "Warmed", price: 0 },
    { id: "butter", label: "Side of Butter", price: 0.25 },
  ],
};

/**
 * Returns the list of option groups for a given menu category.
 */
export function getOptionsForCategory(category) {
  switch (category) {
    case "Espresso & Classics":
      return [sizeOptions, milkOptions, tempOptions, espressoExtras];
    case "Cold Brew & Drafts":
      return [sizeOptions, milkOptional, coldExtras];
    case "Signature Creations":
      return [sizeOptions, milkOptions, signatureExtras];
    case "Artisanal Pastries":
      return [pastryExtras];
    default:
      return [];
  }
}

/**
 * Calculate the total unit price given base price, option groups, and current selections.
 * selections: { [groupId]: string | string[] }
 */
export function calcUnitPrice(basePrice, optionGroups, selections) {
  let extra = 0;
  for (const group of optionGroups) {
    const sel = selections[group.id];
    if (!sel) continue;
    if (group.type === "radio") {
      const choice = group.choices.find((c) => c.id === sel);
      if (choice) extra += choice.price;
    } else if (group.type === "checkbox") {
      const arr = Array.isArray(sel) ? sel : [];
      for (const cid of arr) {
        const choice = group.choices.find((c) => c.id === cid);
        if (choice) extra += choice.price;
      }
    }
  }
  // Round to 2 decimal places avoiding float drift
  return Math.round((basePrice + extra) * 100) / 100;
}

/**
 * Build human-readable labels for selected options.
 * Returns an array of strings e.g. ["Medium (12 oz)", "Oat Milk", "Extra Shot"]
 */
export function buildOptionLabels(optionGroups, selections) {
  const labels = [];
  for (const group of optionGroups) {
    const sel = selections[group.id];
    if (!sel) continue;
    if (group.type === "radio") {
      const choice = group.choices.find((c) => c.id === sel);
      if (choice && choice.id !== "none") labels.push(choice.label);
    } else if (group.type === "checkbox") {
      const arr = Array.isArray(sel) ? sel : [];
      for (const cid of arr) {
        const choice = group.choices.find((c) => c.id === cid);
        if (choice) labels.push(choice.label);
      }
    }
  }
  return labels;
}

/**
 * Get default selections for a category (picks first choice of each required radio).
 */
export function getDefaultSelections(optionGroups) {
  const defaults = {};
  for (const group of optionGroups) {
    if (group.type === "radio" && group.required && group.choices.length > 0) {
      // Default to "medium" if it exists, otherwise first
      const medium = group.choices.find((c) => c.id === "medium");
      defaults[group.id] = medium ? medium.id : group.choices[0].id;
    }
    if (group.type === "checkbox") {
      defaults[group.id] = [];
    }
  }
  return defaults;
}

export function renderInput(
  name: string,
  type: "radio" | "checkbox" = "checkbox",
  input: { label: string; checked?: boolean; value?: string } | string,
  variant?: "color"
): string {
  const hasString = typeof input === "string";
  const value = hasString ? input : input.value;
  const label = hasString ? input : input.label;
  const checked = hasString ? false : input.checked;

  return `
    <div class="input${variant ? ` input--${variant}` : ""}">
      <input 
        class="input__field" 
        type="${type}" 
        id="${value || label}" name="${name}" value="${value || ""}" 
        ${checked ? `checked="${checked}"` : ""}
        ${variant ? `style="color:${value || ""}"` : ""}
      />
      <label class="input__label" for="${value || label}">${label}</label>
    </div>
  `;
}

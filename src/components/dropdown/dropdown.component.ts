import {
  LitElement,
  html,
  css,
  property,
  CSSResult,
  unsafeCSS,
  PropertyValues,
} from "lit-element";
import cdcss from "./dropdown.component.scss";

import { MDCSelect } from "@material/select";
// import { styless } from './css-importer';
export class DropdownComponent extends LitElement {
  @property({ type: String }) page = "main";

  @property({ type: String }) title = "";

  static styles = [unsafeCSS(cdcss)];
  connectedCallback() {
    super.connectedCallback();
  }
  firstUpdated(a: PropertyValues<this>) {
    super.firstUpdated(a);
    //@ts-ignore
    const select = new MDCSelect(this.shadowRoot?.querySelector(".mdc-select"));

    select.listen("MDCSelect:change", () => {
      alert(
        `Selected option at index ${select.selectedIndex} with value "${select.value}"`
      );
    });
  }

  render() {
    return html`
      <div class="mdc-select mdc-select--filled demo-width-class">
        <div
          class="mdc-select__anchor"
          role="button"
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-labelledby="demo-label demo-selected-text"
        >
          <span class="mdc-select__ripple"></span>
          <span id="demo-label" class="mdc-floating-label"
            >Pick a Food Group</span
          >
          <span class="mdc-select__selected-text-container">
            <span
              id="demo-selected-text"
              class="mdc-select__selected-text"
            ></span>
          </span>
          <span class="mdc-select__dropdown-icon">
            <svg
              class="mdc-select__dropdown-icon-graphic"
              viewBox="7 10 10 5"
              focusable="false"
            >
              <polygon
                class="mdc-select__dropdown-icon-inactive"
                stroke="none"
                fill-rule="evenodd"
                points="7 10 12 15 17 10"
              ></polygon>
              <polygon
                class="mdc-select__dropdown-icon-active"
                stroke="none"
                fill-rule="evenodd"
                points="7 15 12 10 17 15"
              ></polygon>
            </svg>
          </span>
          <span class="mdc-line-ripple"></span>
        </div>

        <div
          class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth"
        >
          <ul class="mdc-list" role="listbox" aria-label="Food picker listbox">
            <li
              class="mdc-list-item mdc-list-item--selected"
              aria-selected="true"
              data-value=""
              role="option"
            >
              <span class="mdc-list-item__ripple"></span>
            </li>
            <li
              class="mdc-list-item"
              aria-selected="false"
              data-value="grains"
              role="option"
            >
              <span class="mdc-list-item__ripple"></span>
              <span class="mdc-list-item__text">
                Bread, Cereal, Rice, and Pasta
              </span>
            </li>
            <li
              class="mdc-list-item mdc-list-item--disabled"
              aria-selected="false"
              data-value="vegetables"
              aria-disabled="true"
              role="option"
            >
              <span class="mdc-list-item__ripple"></span>
              <span class="mdc-list-item__text"> Vegetables </span>
            </li>
            <li
              class="mdc-list-item"
              aria-selected="false"
              data-value="fruit"
              role="option"
            >
              <span class="mdc-list-item__ripple"></span>
              <span class="mdc-list-item__text"> Fruit </span>
            </li>
          </ul>
        </div>
      </div>
    `;
  }
}

# Excelsior Angular Web Components Integration Demo

This project is for testing how Excelsior Web Components integrate with Angular applications. The goal of this sample app is testing integrations like event bindings and Angular form handling. Since a lot of New York State (NYS) applications are built with Angular, it's important that we test and verify that our web components work seamlessly within this framework. 

## Getting Started

### Install Dependencies

First, make sure you have Node.js installed. Then, install dependencies:

``` bash
npm install
```

### Development Server

Start a local dev server with:

``` bash
ng serve
```

Bring up http://localhost:4200/ in your browser. The app will reload as you edit and save any source files.

## Why Test Web Components with Angular?

Angular doesn't natively recognize custom elements (web components) as form controls, which can make using them challenging. As we test, we're looking for:

- Does it work with Angular’s forms APIs (e.g., [(ngModel)])?
- Are events (like input, change)properly emitted and handle?
- Are components behaving as expected in the Angular ecosystem?

## Key Files 

When adding a new Excelsior web component to the test app, there are three files you'll need to modify:

1. `app.component.ts`

This file contains the logic for the form and handles data binding and submission. To add a new component, define a property in the formData object to store the component's value.

``` typescript
formData = {
  firstName: "",
  message: "",
  agree: false,
  option: "",
  office: "",
  favoriteBorough: "",
  newComponentValue: ""
};
```

2. `app.component.html`

This is the HTML template where you'll place the new web component. If it's a form element, put it inside the form tags and bind its value using [(ngModel)] to the property you created in formData.

``` html
<nys-newcomponent
  label="New Component Label"
  name="newComponent"
  [(ngModel)]="formData.newComponentValue">
</nys-newcomponent>
```

3. `nys-value-accessors.directive.ts`

This is the trickiest bit. Think of this like a translation layer between the Angular form handler and the web component.

This file contains ControlValueAccessor directives for each input element and acts like a bridge between Angular forms and events in the custom web components. If the new component is a form element that interacts with Angular forms, you need to:

- Create a new directive to map Angular's form API to the component’s value and events.
- Set up the directive to listen to the correct events (input, change) and updates the value accordingly.

``` typescript
@Directive({
  selector: "nys-newcomponent",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NysNewComponentAccessorDirective),
      multi: true
    }
  ]
})
export class NysNewComponentAccessorDirective implements ControlValueAccessor {
  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  writeValue(value: any): void {
    this.renderer.setProperty(this.elementRef.nativeElement, "value", value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.elementRef.nativeElement.addEventListener("input", (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.onChange(target.value);
    });
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
    this.elementRef.nativeElement.addEventListener("blur", () => {
      this.onTouched();
    });
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, "disabled", isDisabled);
  }
}
```

## Debugging

While testing Excelsior web components, check to see if the data is being passed correctly to the form.

Here's an example of a few integration problems and how they can be resolved:

### `nys-textinput` and `nys-textarea`

These components don't emit the native `input` event, so Angular does not pick up changes to pass to [(ngModel)].

Fixing this means updating the component to dispatch the input event:

``` typescript
this.dispatchEvent(
  new CustomEvent("input", {
    detail: { value: this.value },
    bubbles: true,
    composed: true
  })
);
```

### `nys-select`

This component does not emit the native `change` event, so Angular does not pick up when you select an option.

Fixing this means updating the `<nys-select>` component definition file to dispatch the change event:

``` javascript
this.dispatchEvent(
  new CustomEvent("change", {
    detail: { value: this.value },
    bubbles: true,
    composed: true
  })
);
```

## Additional Resources

For more information:

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Excelsior Storybook](https://its-hcd.github.io/excelsior/?path=/docs/about--docs)
- [Excelsior GitHub Repository](https://its-hcd.github.com/excelsior)
- [Custom Elements Specification](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)

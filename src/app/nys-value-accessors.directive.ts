import { Directive, ElementRef, forwardRef, Renderer2 } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

/**
 * Value accessor for <nys-textinput>
 */
@Directive({
  selector: "nys-textinput",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NysTextInputAccessorDirective),
      multi: true
    }
  ]
})
export class NysTextInputAccessorDirective implements ControlValueAccessor {
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

/**
 * Value accessor for <nys-textarea>
 */
@Directive({
  selector: "nys-textarea",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NysTextareaAccessorDirective),
      multi: true
    }
  ]
})
export class NysTextareaAccessorDirective implements ControlValueAccessor {
  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  writeValue(value: any): void {
    this.renderer.setProperty(this.elementRef.nativeElement, "value", value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.elementRef.nativeElement.addEventListener("input", (event: Event) => {
      const target = event.target as HTMLTextAreaElement;
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

/**
 * Value accessor for <nys-checkbox>
 */
@Directive({
  selector: "nys-checkbox",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NysCheckboxAccessorDirective),
      multi: true
    }
  ]
})
export class NysCheckboxAccessorDirective implements ControlValueAccessor {
  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  writeValue(value: any): void {
    this.renderer.setProperty(this.elementRef.nativeElement, "checked", value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.elementRef.nativeElement.addEventListener("change", (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.onChange(target.checked);
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

/**
 * Value accessor for <nys-radiogroup>
 */
@Directive({
  selector: "nys-radiogroup",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NysRadioGroupAccessorDirective),
      multi: true
    }
  ]
})
export class NysRadioGroupAccessorDirective implements ControlValueAccessor {
  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  writeValue(value: any): void {
    this.renderer.setProperty(this.elementRef.nativeElement, "value", value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.elementRef.nativeElement.addEventListener("change", (event: Event) => {
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

@Directive({
  selector: "nys-select",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NysSelectAccessorDirective),
      multi: true
    }
  ]
})
export class NysSelectAccessorDirective implements ControlValueAccessor {
  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  writeValue(value: any): void {
    this.renderer.setProperty(this.elementRef.nativeElement, "value", value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.elementRef.nativeElement.addEventListener("change", (event: Event) => {
      const target = event.target as HTMLSelectElement;
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

import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  NysTextInputAccessorDirective,
  NysTextareaAccessorDirective,
  NysCheckboxAccessorDirective,
  NysRadioGroupAccessorDirective,
  NysSelectAccessorDirective
} from "./nys-value-accessors.directive";

// Import the CSS framework
import "@nysds/styles/full";

// Import the web components library
import "@nysds/components";

@Component({
  selector: "app-root",
  standalone: true, // Indicates this is a standalone component
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Allow custom elements
  imports: [
    FormsModule,
    NysTextInputAccessorDirective,
    NysTextareaAccessorDirective,
    NysCheckboxAccessorDirective,
    NysRadioGroupAccessorDirective,
    NysSelectAccessorDirective
  ],
})
export class AppComponent {

  @ViewChild("alert", { static: false }) alert!: ElementRef; // Target alert

  formData = {
    firstName: "",
    message: "",
    agree: "",
    office: "",
    favoriteBorough: ""
  };

  onSubmit(data: any) {
    if (!this.alert) {
      console.error("Alert component is not available.");
      return;
    }

    const alertElement = this.alert.nativeElement;

    // Construct a detailed alert message
    const alertMessage = `
      First Name: ${data.firstName || "N/A"} /———/
      Message: ${data.message || "N/A"} /———/
      Agree to Terms: ${data.agree ? "Yes" : "No"} /———/
      Office Location: ${data.office || "N/A"} /———/
      Favorite Borough: ${data.favoriteBorough || "N/A"}
    `;

    // Update the nys-alert attributes
    alertElement.setAttribute("type", "success");
    alertElement.setAttribute("heading", "Form Submitted Successfully!");
    alertElement.setAttribute("text", alertMessage.trim());
  }
}

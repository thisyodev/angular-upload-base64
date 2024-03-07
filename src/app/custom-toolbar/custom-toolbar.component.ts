import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

interface Suggestion {
  title_th: string;
  description_th: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  images: { seq: number, file_name: string, file_type: string }[];
}

interface Data {
  numberOfSuggestion: string;
  guidebook_name: string;
  symptom: string;
  suggestion: Suggestion[];
}

@Component({
  selector: 'app-custom-toolbar',
  templateUrl: './custom-toolbar.component.html',
  styleUrls: ['./custom-toolbar.component.css']
})
export class CustomToolbarComponent implements OnInit {
  dynamicForm: FormGroup;
  submitted = false;
  images: any[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      numberOfSuggestion: ['', Validators.required],
      guidebook_name: ['', Validators.required],
      symptom: ['', Validators.required],
      suggestion: new FormArray([]),
    });
  }

  // convenience getters for easy access to form fields
  get f() {
    return this.dynamicForm.controls;
  }
  get t() {
    return this.f.suggestion as FormArray;
  }

  // Function to extract file_name and file_type from file path
  extractFileInfo(filePath: string): { file_name: string, file_type: string } {
    const pathParts = filePath.split('\\');
    const fileName = pathParts[pathParts.length - 1];
    const fileType = fileName.split('.').pop() || '';
    return { file_name: fileName, file_type: fileType };
  }

  processImageData(data: Data): void {
    data.suggestion.forEach(suggestion => {
      suggestion.images = [];

      // Define an array of image keys to iterate over
      const imageKeys = ['image1', 'image2', 'image3', 'image4'];

      imageKeys.forEach((imageKey, index) => {
        const imagePath = suggestion[imageKey];
        if (imagePath) {
          const fileInfo = this.extractFileInfo(imagePath);
          const seq = index + 1; // Increment the sequence number
          suggestion.images.push({ seq, ...fileInfo });
        }
      });

      // Sort images by sequence
      suggestion.images.sort((a, b) => a.seq - b.seq);
    });

    console.log(this.dynamicForm.value);
  }

  onChangeTickets(e) {
    const numberOfSuggestion = e.target.value || 0;
    if (this.t.length < numberOfSuggestion) {
      for (let i = this.t.length; i < numberOfSuggestion; i++) {
        this.t.push(
          this.formBuilder.group({
            title_th: ['', Validators.required],
            description_th: ['', Validators.required],
            image1: ['', [Validators.required]],
            image2: ['', [Validators.required]],
            image3: [''],
            image4: [''],
          })
        );
      }
    } else {
      for (let i = this.t.length; i >= numberOfSuggestion; i--) {
        this.t.removeAt(i);
      }
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      return;
    }

    const data = this.dynamicForm.value;
    this.processImageData(data);
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm.reset();
    this.t.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t.reset();
  }
}

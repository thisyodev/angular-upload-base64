import { Component } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  uploadObj: any = [];
  selectedFile: File | null = null;
  selectedFileBase64: string = '';
  maxFileSizeInBytes = 1048576; // 1 MB (you can adjust this value as per your requirement)

  get selectedFileName(): string {
    return this.selectedFile ? this.selectedFile.name : '';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > this.maxFileSizeInBytes) {
        console.log('File size exceeds the maximum allowed limit.');
        return;
      }
      this.selectedFile = file;
      this.encodeFileToBase64(file);
    }
  }

  encodeFileToBase64(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const selectedFileBase64 = reader.result as string;
      // Here you can use this.selectedFileBase64 as needed (e.g., send it to the server).
      this.uploadObj.push(selectedFileBase64);
      console.log(this.uploadObj);
      // Here you can send the Base64 string to your backend API or do any other processing.
    };
    reader.readAsDataURL(file);
  }

  removeFile() {
    this.selectedFile = null;
    this.selectedFileBase64 = '';
    const fileInput: any = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  }
}

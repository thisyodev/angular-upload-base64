import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  uploadObj: any = [];
  selectedFile: File | null = null;
  selectedFileBase64: string = '';
  maxFileSizeInBytes = 3100000; // 3 MB (you can adjust this value as per your requirement)
  filesCount: number = 0;

  get selectedFileName(): string {
    return this.selectedFile ? this.selectedFile.name : '';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > this.maxFileSizeInBytes) {
        Swal.fire({
          title: 'Error',
          text: 'Maximun file limit 3 mb',
          icon: 'error'
        });

        this.removeFile()
      } else {
        this.selectedFile = file;
        this.encodeFileToBase64(file);
      }
    }
  }

  encodeFileToBase64(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const selectedFileBase64 = reader.result as string;
      // Here you can use this.selectedFileBase64 as needed (e.g., send it to the server).
      let objFile = {
        index: this.filesCount,
        name: file.name,
        size: file.size,
        type: file.type,
        fileContent: selectedFileBase64
      };
      this.uploadObj.push(objFile);
    };
    reader.readAsDataURL(file);
    // console.log(this.uploadObj)
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

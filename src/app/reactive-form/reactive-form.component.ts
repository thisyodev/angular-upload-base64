import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {

  usersList: any = [
    {
      guidebook_id: 89,
      guidebook_name: 'guidebook postman',
      ticket_template: 'COMPLAINT',
      symptom_code: ['1-ATUI6HZ'],
      suggestion: [
        {
          id: 156,
          title_th: 'Test 1: ผลการ Trace Route',
          title_en: 'Test 1: Trace Route',
          description_th: 'เนื่องจากผู้ใช้บริการใช้งานไม่ได้ทุกแอพ 1',
          description_en:
            "Due to some users' inability to access every application 1",
          sequence: 1,
          images: [
            {
              image_id: 277,
              file_name: '/guidebook/node.png',
              file_type: 'png',
            },
            {
              image_id: 279,
              file_name: '/guidebook/node1.png',
              file_type: 'png',
            },
          ],
        },
        {
          id: 157,
          title_th: 'Test 2: ผลการ Trace Route',
          title_en: 'Test 2: Trace Route',
          description_th: 'เนื่องจากผู้ใช้บริการใช้งานไม่ได้ทุกแอพ 2',
          description_en:
            "Due to some users' inability to access every application 2",
          sequence: 2,
          images: [
            {
              image_id: 278,
              file_name: '/guidebook/test-02.jpg',
              file_type: 'jpg',
            },
          ],
        },
      ],
    },
  ];

  constructor(private fb: FormBuilder) {}
  userForm: FormGroup;
  userData: any;

  get guidebookArray() {
    return <FormArray>this.userForm.get('guidebook');
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      guidebook: this.fb.array([]),
    });
    this.userData = this.usersList;
    this.displayUsers();
  }

  createSuggestionFormGroup(suggest: any) {
    return this.fb.group({
      sequence: [suggest.sequence, [Validators.required]],
      title_th: [suggest.title_th, [Validators.required]],
      description_th: [suggest.description_th, [Validators.required]],
      images: this.fb.array(this.loadImagesArray(suggest.images)),
    });
  }

  loadImagesArray(images: any[]) {
    let transformedCars = images.map((img: any) => this.createImagesFormGroup(img));
    return transformedCars;
  }

  createImagesFormGroup(img: any) {
    return this.fb.group({
      image_id: [img.image_id, [Validators.required]],
      file_name: [img.file_name, [Validators.required]],
      file_type: [img.file_type, [Validators.required]],
    });
  }

  loadSuggestionArray(suggestion: any[]) {
    let transformedCars = suggestion.map((suggest: any) => this.createSuggestionFormGroup(suggest));
    return transformedCars;
  }

  createUserFormGroup(res: any) {
    return this.fb.group({
      guidebook_id: [{ value: res.guidebook_id, disabled: true }],
      guidebook_name: [res.guidebook_name, [Validators.required]],
      symptom_code: [res.symptom_code, [Validators.required]],
      suggestion: this.fb.array(this.loadSuggestionArray(res.suggestion)),
    });
  }
  displayUsers() {
    let transformedUsers = this.userData.map((res: any) =>
      this.createUserFormGroup(res)
    );
    this.userForm.setControl('guidebook', this.fb.array(transformedUsers));
  }

  onSubmit() {
    console.log(this.userForm.value);
    console.log(this.userForm.value.guidebook[0]);
  }
}

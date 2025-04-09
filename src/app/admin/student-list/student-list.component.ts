import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../../../service/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  editingStudent: any = null;
  cameraActive: boolean = false;

  @ViewChild('video', { static: false }) videoElement!: ElementRef;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        console.log('Student list loaded:', data);
      },
      error: (error) => {
        console.error('Error fetching student list:', error);
      },
    });
  }

  editStudent(student: any): void {
    this.editingStudent = { ...student };
  }

  updateStudent(): void {
    if (this.editingStudent) {
      console.log('Updating student with data:', this.editingStudent);
      this.studentService
        .updateStudent(this.editingStudent.reg_no, this.editingStudent)
        .subscribe({
          next: () => {
            console.log('Student updated successfully');
            this.editingStudent = null;
            this.fetchStudents();
          },
          error: (error) => {
            console.error('Error updating student:', error);
          },
        });
    }
  }

  cancelEdit(): void {
    this.editingStudent = null;
    this.stopCamera();
  }

  deleteStudent(reg_no: string): void {
    this.studentService.deleteStudent(reg_no).subscribe({
      next: () => {
        console.log(`Student with ID ${reg_no} deleted successfully`);
        this.fetchStudents();
      },
      error: (error) => {
        console.error(`Error deleting student with ID ${reg_no}:`, error);
      },
    });
  }

  startCamera(): void {
    this.cameraActive = true;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video = this.videoElement.nativeElement as HTMLVideoElement;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error('Camera error:', err);
      });
  }

  stopCamera(): void {
    this.cameraActive = false;
    const video = this.videoElement.nativeElement as HTMLVideoElement;
    const stream = video.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
    }
  }

  capturePhoto(): void {
    const video = this.videoElement.nativeElement as HTMLVideoElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL('image/jpeg');
      this.editingStudent.photoBase64 = dataURL;
    }

    this.stopCamera();
  }
}

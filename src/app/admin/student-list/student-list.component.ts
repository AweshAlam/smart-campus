import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../service/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  imports: [CommonModule,FormsModule],
  standalone: true
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  editingStudent: any = null;

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
      }
    });
  }

  editStudent(student: any): void {
    this.editingStudent = { ...student };
  }

  updateStudent(): void {
    if (this.editingStudent) {
      this.studentService.updateStudent(this.editingStudent.reg_no, this.editingStudent).subscribe({
        next: () => {
          console.log('Student updated successfully');
          this.editingStudent = null;
          this.fetchStudents(); 
        },
        error: (error) => {
          console.error('Error updating student:', error);
        }
      });
    }
  }

  cancelEdit(): void {
    this.editingStudent = null;
  }

  deleteStudent(reg_no: string): void {
    this.studentService.deleteStudent(reg_no).subscribe({
      next: () => {
        console.log(`Student with ID ${reg_no} deleted successfully`);
        this.fetchStudents();
      },
      error: (error) => {
        console.error(`Error deleting student with ID ${reg_no}:`, error);
      }
    });
  }
}

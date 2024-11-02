import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  taskArray: { taskName: string; isCompleted: boolean }[] = [];
  editMode: boolean = false; 
  editIndex: number | null = null; 
  currentTask: string = ''; 

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (this.editMode && this.editIndex !== null) {
      this.taskArray[this.editIndex].taskName = this.currentTask;
      this.editMode = false;
      this.editIndex = null;
      this.currentTask = ''; 
    } else {
      if (form.controls['task'].value) {
        this.taskArray.push({
          taskName: form.controls['task'].value,
          isCompleted: false
        });
      } else {
        alert('Task cannot be empty');
      }
    }
    form.reset();
  }

  onDelete(index: number) {
    if (this.taskArray[index] && this.taskArray[index].taskName) {
      this.taskArray.splice(index, 1);
      if (this.taskArray.length === 0) {
        alert('You Deleted Your Last Task');
      }
    }
  }
  

  onCheck(index: number) {
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
  }

  onEdit(index: number) {
    if (this.taskArray[index] && this.taskArray[index].taskName) {
      this.editMode = true;
      this.editIndex = index;
      this.currentTask = this.taskArray[index].taskName;
    } else {
      alert('Task does not exist, cannot edit');
    }
  }
}

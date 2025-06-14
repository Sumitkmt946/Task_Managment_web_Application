import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../models/task.model';

interface DialogData {
  task?: Task;
  teamMembers: string[];
  isEdit?: boolean;
}

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {
  taskForm: FormGroup;
  taskTypes = ['Call', 'Meeting', 'Video Call'];
  statuses = ['Open', 'Closed'];
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEdit = data.isEdit || false;
    this.taskForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.data.task) {
      this.taskForm.patchValue(this.data.task);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      entityName: ['', [Validators.required]],
      taskType: ['Call', [Validators.required]],
      time: ['', [Validators.required]],
      contactPerson: ['', [Validators.required]],
      phoneNumber: [''],
      note: [''],
      status: ['Open']
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getTaskTypeIcon(taskType: string): string {
    switch (taskType) {
      case 'Call': return 'phone';
      case 'Meeting': return 'location_on';
      case 'Video Call': return 'video_call';
      default: return 'phone';
    }
  }
}
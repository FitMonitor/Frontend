import { Component, OnInit } from '@angular/core';
import { AddExerciseService } from './add-exercise.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-add-exercises',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, AdminNavbarComponent],
  templateUrl: './add-exercises.component.html',
  styleUrls: ['./add-exercises.component.css']
})
export class AddExercisesComponent implements OnInit {

  exerciseName: string = '';
  machineId: string = '';
  category: string = '';
  muscleGroup: string = '';
  description: string = '';

  machines: any[] = [];
  categories: string[] = [];
  muscleGroups: string[] = [];
  exercises: any[] = [];

  constructor(private addExerciseService: AddExerciseService) {}

  ngOnInit(): void {
    this.loadMachines();
    this.loadCategories();
    this.loadMuscleGroups();
    this.loadExercises();
  }

  async loadMachines(): Promise<void> {
    this.machines = await this.addExerciseService.getMachines() ?? [];
  }

  async loadCategories(): Promise<void> {
    this.categories = await this.addExerciseService.getCategories();
  }

  async loadMuscleGroups(): Promise<void> {
    this.muscleGroups = await this.addExerciseService.getMuscleGroups();
  }

  async loadExercises(): Promise<void> {
    this.exercises = await this.addExerciseService.getExercises();
  }

  async onSubmit(): Promise<void> {
    const exerciseData = {
      exerciseName: this.exerciseName,
      machineId: this.machineId,
      category: this.category,
      muscleGroup: this.muscleGroup,
      description: this.description,
    };

    const result = await this.addExerciseService.createExercise(exerciseData);
    if (result) {
      console.log('Exercise created successfully:', result);
      this.exerciseName = '';
      this.machineId = '';
      this.category = '';
      this.muscleGroup = '';
      this.description = '';
      this.loadExercises();
    } else {
      console.error('Error creating exercise.');
    }
  }
}


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trips';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnInit {

  editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripData
  ) {}

  ngOnInit(): void {

    let tripCode = localStorage.getItem("tripCode");

    if (!tripCode) {
      alert("No trip code found");
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.tripDataService.getTrip(tripCode)
      .subscribe({
        next: (value: any) => {
          this.trip = value;
          this.editForm.patchValue(value[0]);
        },
        error: (err: any) => {
          console.log(err);
        }
      });
  }

  public onSubmit() {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['']);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
    }
  }

  get f() {
    return this.editForm.controls;
  }
}
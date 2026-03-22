import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RunService } from '../../services/run.service';

@Component({
  selector: 'app-add-run',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-run.component.html',
  styleUrl: './add-run.component.css'
})
export class AddRunComponent {
  private runService = inject(RunService);
  private router = inject(Router);

  // Form data
  date: string = new Date().toISOString().split('T')[0];
  hours: number = 0;
  minutes: number = 30;
  seconds: number = 0;
  distance: number = 5;
  notes: string = '';

  // Validation
  isSubmitting = false;

  onSubmit(): void {
    if (this.isSubmitting) return;

    const totalSeconds = (this.hours * 3600) + (this.minutes * 60) + this.seconds;

    if (totalSeconds <= 0 || this.distance <= 0) {
      alert('Por favor, preenche o tempo e a distância corretamente.');
      return;
    }

    this.isSubmitting = true;

    const runData = {
      date: this.date,
      time: totalSeconds,
      distance: this.distance,
      notes: this.notes || undefined
    };

    this.runService.addRun(runData);

    // Redirect to home after a short delay to allow API to respond
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RunService } from '../../services/run.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  runService = inject(RunService);

  runs = this.runService.runs;
  totalRuns = this.runService.totalRuns;
  totalDistance = this.runService.totalDistance;
  totalTime = this.runService.totalTime;
  averagePace = this.runService.averagePace;

  deleteRun(id: string): void {
    if (confirm('Tens a certeza que queres eliminar esta corrida?')) {
      this.runService.deleteRun(id);
    }
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${mins}m ${secs}s`;
    } else if (mins > 0) {
      return `${mins}m ${secs}s`;
    }
    return `${secs}s`;
  }

  formatPace(paceDecimal: number): string {
    if (paceDecimal <= 0 || !isFinite(paceDecimal)) return '0:00';
    const minutes = Math.floor(paceDecimal);
    const seconds = Math.round((paceDecimal - minutes) * 60);
    // Ajuste para segundos que arredondam para 60
    if (seconds >= 60) {
      return `${minutes + 1}:00`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  getRunPace(run: any): string {
    if (!run.distance || run.distance <= 0) return '0:00';
    const paceDecimal = run.time / 60 / run.distance;
    return this.formatPace(paceDecimal);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
}

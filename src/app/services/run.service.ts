import { Injectable, signal, computed } from '@angular/core';
import { Run } from '../models/run.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RunService {
  private readonly API_URL = environment.apiUrl + '/api/runs';

  // Signal para gerir as corridas
  runs = signal<Run[]>([]);

  // Computed signals para estatísticas
  totalRuns = computed(() => this.runs().length);

  totalDistance = computed(() =>
    this.runs().reduce((sum, run) => sum + run.distance, 0)
  );

  totalTime = computed(() =>
    this.runs().reduce((sum, run) => sum + run.time, 0)
  );

  averagePace = computed(() => {
    const total = this.totalDistance();
    const timeInMinutes = this.totalTime() / 60;
    const paceDecimal = total > 0 ? timeInMinutes / total : 0;
    return this.formatPace(paceDecimal);
  });

  private formatPace(paceDecimal: number): string {
    if (paceDecimal <= 0) return '0:00';
    const minutes = Math.floor(paceDecimal);
    const seconds = Math.round((paceDecimal - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  constructor() {
    this.loadRuns();
  }

  private async loadRuns(): Promise<void> {
    try {
      const response = await fetch(this.API_URL);
      if (response.ok) {
        const data = await response.json();
        this.runs.set(data);
      }
    } catch (error) {
      console.error('Erro ao carregar corridas:', error);
    }
  }

  addRun(run: Omit<Run, 'id' | 'createdAt'>): void {
    fetch(this.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(run)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Erro ao guardar corrida');
      })
      .then(newRun => {
        this.runs.update(runs => [newRun, ...runs]);
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao guardar a corrida');
      });
  }

  deleteRun(id: string): void {
    fetch(`${this.API_URL}/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          this.runs.update(runs => runs.filter(run => run.id !== id));
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao eliminar a corrida');
      });
  }

  getRunById(id: string): Run | undefined {
    return this.runs().find(run => run.id === id);
  }

  getRecentRuns(limit: number = 5): Run[] {
    return this.runs().slice(0, limit);
  }
}

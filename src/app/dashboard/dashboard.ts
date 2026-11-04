

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  constructor(private router: Router) {}

  leaveRequests = [
    { label: 'Jan', value: 35 },
    { label: 'Feb', value: 55 },
    { label: 'Mar', value: 40 },
    { label: 'Apr', value: 75 },
    { label: 'May', value: 50 },
    { label: 'Jun', value: 90 }
  ];

  absenceData = [
    { label: 'Annual', value: 75 },
    { label: 'Sick', value: 45 },
    { label: 'Personal', value: 30 },
    { label: 'Other', value: 20 }
  ];

  monthlyData = [
    { label: 'Jan', value: 45 },
    { label: 'Feb', value: 65 },
    { label: 'Mar', value: 55 },
    { label: 'Apr', value: 80 },
    { label: 'May', value: 60 },
    { label: 'Jun', value: 95 },
    { label: 'Jul', value: 70 },
    { label: 'Aug', value: 50 },
    { label: 'Sep', value: 85 },
    { label: 'Oct', value: 65 },
    { label: 'Nov', value: 75 },
    { label: 'Dec', value: 90 }
  ];

  logout(): void {
    this.router.navigateByUrl('/login');
  }
}


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  firstName: string;
  lastName: string;
  birthday: string;
  department: string;
  profession: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  constructor(private router: Router) {
    const savedUsers = localStorage.getItem('workwave-users');
    this.users = savedUsers ? JSON.parse(savedUsers) : [];
  }

  activeSection = 'dashboard';
  showUserForm = false;

  users: User[] = [];

  newUser: User = {
    firstName: '',
    lastName: '',
    birthday: '',
    department: '',
    profession: ''
  };

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

  openSection(section: string): void {
    this.activeSection = section;
    this.showUserForm = false;
  }

  addUser(): void {
    this.showUserForm = true;
  }

  saveUser(): void {
    this.users.push({ ...this.newUser });

    localStorage.setItem(
      'workwave-users',
      JSON.stringify(this.users)
    );

    this.newUser = {
      firstName: '',
      lastName: '',
      birthday: '',
      department: '',
      profession: ''
    };

    this.showUserForm = false;
  }

  logout(): void {
    this.router.navigateByUrl('/login');
  }
}

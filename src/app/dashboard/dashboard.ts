
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
  activeSection = 'dashboard';
  showUserForm = false;
  editingUserIndex = -1;

  users: User[] = [];

  newUser: User = {
    firstName: '',
    lastName: '',
    birthday: '',
    department: '',
    profession: ''
  };

  constructor(private router: Router) {
    const savedUsers = localStorage.getItem('workwave-users');
    this.users = savedUsers ? JSON.parse(savedUsers) : [];
  }

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
    this.editingUserIndex = -1;

    this.newUser = {
      firstName: '',
      lastName: '',
      birthday: '',
      department: '',
      profession: ''
    };

    this.showUserForm = true;
  }

  saveUser(): void {
    if (this.editingUserIndex !== -1) {
      this.users[this.editingUserIndex] = { ...this.newUser };
    } else {
      this.users.push({ ...this.newUser });
    }

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

    this.editingUserIndex = -1;
    this.showUserForm = false;
  }

  editUser(user: User): void {
    this.newUser = { ...user };
    this.editingUserIndex = this.users.indexOf(user);
    this.showUserForm = true;
  }

  deleteUser(user: User): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this user?'
    );

    if (!confirmed) {
      return;
    }

    this.users = this.users.filter(
      existingUser => existingUser !== user
    );

    localStorage.setItem(
      'workwave-users',
      JSON.stringify(this.users)
    );

    if (this.editingUserIndex !== -1) {
      this.editingUserIndex = -1;
      this.showUserForm = false;
    }
  }

  logout(): void {
    this.router.navigateByUrl('/login');
  }
}

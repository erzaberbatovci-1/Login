
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
  const users = localStorage.getItem('users');
  this.users = users ? JSON.parse(users) : [];  }

  activeSection = 'dashboard';
  showUserForm = false;
  editingUser: User | null = null;

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
  if (
    !this.newUser.firstName.trim() ||
    !this.newUser.lastName.trim() ||
    !this.newUser.birthday ||
    !this.newUser.department.trim()
  ) {
    alert('Please fill in all required fields!');
    return;
  }

  if (this.editingUser) {
    const index = this.users.indexOf(this.editingUser);

    if (index !== -1) {
      this.users[index] = { ...this.newUser };
    }
  } else {
    this.users.push({ ...this.newUser });
  }

  localStorage.setItem(
    'users',
    JSON.stringify(this.users)
  );

  this.newUser = {
    firstName: '',
    lastName: '',
    birthday: '',
    department: '',
    profession: ''
  };

  this.editingUser = null;
  this.showUserForm = false;
}

  logout(): void {
    this.router.navigateByUrl('/login');
  }
  editUser(user: User): void {
  this.editingUser = user;
  this.newUser = { ...user };
  this.showUserForm = true;
}

deleteUser(user: User): void {
  const confirmed = confirm(
    'Are you sure you want to delete this user?'
  );

  if (confirmed) {
    this.users = this.users.filter(u => u !== user);

    localStorage.setItem(
      'users',
      JSON.stringify(this.users)
    );
  }
}
}
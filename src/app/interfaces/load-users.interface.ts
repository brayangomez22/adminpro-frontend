import { User } from '../models/user.model';

export interface LoadUsers {
  total: number;
  users: User[];
}

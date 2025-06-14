export interface Task {
  id: string;
  date: string;
  entityName: string;
  taskType: 'Call' | 'Meeting' | 'Video Call';
  time: string;
  contactPerson: string;
  note?: string;
  status: 'Open' | 'Closed';
  phoneNumber?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  total?: number;
}

export interface TaskFilters {
  taskType?: string;
  status?: string;
  contactPerson?: string;
  search?: string;
}
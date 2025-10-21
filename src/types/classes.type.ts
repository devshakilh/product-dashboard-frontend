export interface ClassData {
  id: string;
  name: string;
  grade: string;
  section: string;
  teacherId: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  createdById: null | string;
  updatedById: null | string;
  teacher: {
    id: string;
  };
  _count: {
    students: number;
  };
}

export interface ClassesResponse {
  rows: ClassData[];
}

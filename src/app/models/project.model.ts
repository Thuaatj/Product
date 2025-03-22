export interface Project {
    id: number;              // Khóa chính
    name: string;            // Tên dự án
    date_of_start: string;   // Ngày bắt đầu (phải khớp với date_of_start trong DB)
    team_size: number;       // Kích thước đội nhóm
  }
  
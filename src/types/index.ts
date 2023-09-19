export interface IServers {
  id: number;
  name: string;
  type: string;
  location: string;
  organizationalUnit: string;
  inventoryNumber: number;
  tags: string[];
  creationDate: string;
  updateDate: string;
  auditDate: string;
  isChecked: boolean;
}

export interface ITags {
  tag: string;
  tagsCount: number;
}

export interface IPagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

export interface IOptions {
  value: string;
  label: string;
  color?: string;
}

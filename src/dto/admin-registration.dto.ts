export interface AdminRegistrationDto {
  name: string;
  nickname: string;
  position: string;
  phoneNumber: string;
  address: string;
  marriageStatus: string;
  bankAccountNumber: string;
  roles: string[];
}

export interface AdminRegistrationResponse {
  id: string;
  name: string;
  nickname: string;
  position: string;
  phoneNumber: string;
  address: string;
  marriageStatus: string;
  bankAccountNumber: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

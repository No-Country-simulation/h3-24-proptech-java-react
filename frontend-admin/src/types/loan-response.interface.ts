export type Status = 'PENDING' | 'PRE_APPROVED' | 'APPROVED' | 'INITIATED';

export interface LoanResponse {
    loanId: string;
    requestedAmount: number;
    termMonths: number;
    monthlyQuota: number;
    interestRate: number;
    status: Status;
    totalAmount: number;
    user: User;
    profile: Profile;
    documents: Document[];
    payments: Payment[];
}

export interface Document {
    docType: DocType;
    userType: UserType;
    guaranteeId: null | string;
    cloudFile: CloudFile;
}

export interface CloudFile {
    cloudFileId: string;
    publicId: PublicID;
    url: string;
    originalFilename: string;
}

export enum PublicID {
    FinancialAlDpe5Ankou6Elu2Avjczy = 'financial-al/dpe5ankou6elu2avjczy',
}

export interface Profile {
    profileId: string;
    userId: null;
    dateOfBirth: string;
    nationality: string;
    road: string;
    houseNumber: string;
    city: string;
    state: string;
    country: string;
    gender: string;
    economicActivity: string;
    monthlyIncome: number;
    bankAccountCbu: string;
    firstNameAsInDni: string;
    lastNameAsInDni: string;
    educationLevel: string;
    mobilePhone: string;
    landlinePhone: string;
}

export interface User {
    userId: string;
    email: string;
    name: string;
    lastname: string;
    dni: string;
    roles: Role[];
}

export interface Role {
    roleId: string;
    name: string;
}

export type DocType =
    | 'IDENTITY_FRONT'
    | 'IDENTITY_BACK'
    | 'IDENTITY_BACK'
    | 'SALARY_RECEIPT'
    | 'SERVICE_RECEIPT';

export type DocTypeCustom = 'identity' | 'salary' | 'service';

export type UserType = 'GUARANTOR' | 'HOLDER';

export interface Payment {
    paymentId: string;
    amount: number;
    dueDate: string;
    payLimitDate: string;
    paymentDate: string | null;
    status: PaymentStatus;
    lateFee: number;
    lateFeeApplied: boolean;
    interestRate: number;
    paidOnTime: boolean;
    installmentNumber: number;
    cloudFile: CloudFile | null;
}

export type PaymentStatus =
    | 'PENDING'
    | 'APPROVED'
    | 'REFUSED'
    | 'LATE'
    | 'PAID'
    | 'MOROSA';

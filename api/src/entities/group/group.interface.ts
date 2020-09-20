export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export type GroupInterface = {
    id: string;
    name: string;
    permissions: Array<Permission>;
};

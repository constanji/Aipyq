import React from 'react';
type FileUploadProps = {
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
declare const FileUpload: React.ForwardRefExoticComponent<FileUploadProps & React.RefAttributes<HTMLInputElement>>;
export default FileUpload;
//# sourceMappingURL=FileUpload.d.ts.map
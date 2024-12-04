import { DocTypeCustom, Document } from '../types/loan-response.interface';

export const groupDocumentsByType = (documents: Document[]) => {
  return documents.reduce(
    (grouped, doc) => {
      const key =
        doc.docType === 'IDENTITY_FRONT' || doc.docType === 'IDENTITY_BACK'
          ? 'identity'
          : doc.docType === 'SALARY_RECEIPT'
            ? 'salary'
            : 'service';

      if (!grouped[key]) {
        grouped[key] = [];
      }

      grouped[key].push(doc);
      return grouped;
    },
    {} as Record<DocTypeCustom, Document[]>
  );
};

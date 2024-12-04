import { Document, LoanResponse } from '../types/loan-response.interface';

export const groupDocumentsByGuarantorId = (
  loan: LoanResponse
): Document[][] => {
  const documentsGuaranted = loan.documents.filter(
    (l) => l.userType === 'GUARANTOR'
  );

  const guaranteeIds = new Set();

  const groupedDocuments = documentsGuaranted.reduce<{
    [key: string]: Document[];
  }>((acc, doc) => {
    if (doc.guaranteeId !== null && !guaranteeIds.has(doc.guaranteeId)) {
      guaranteeIds.add(doc.guaranteeId);
    }
    // Agregar el documento al grupo correspondiente por `guaranteeId`
    if (doc.guaranteeId !== null) {
      if (!acc[doc.guaranteeId]) {
        acc[doc.guaranteeId] = [];
      }
      acc[doc.guaranteeId].push(doc);
    }

    return acc;
  }, {});
  return Object.values(groupedDocuments);
};

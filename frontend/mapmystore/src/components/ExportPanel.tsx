import React from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ExportPanelProps {
  exportData?: any[];
  city?: string;
}

export default function ExportPanel({ exportData, city }: ExportPanelProps) {
  const handleExcelExport = () => {
    if (!exportData || exportData.length === 0) return;

    // Map data to a flat structure for Excel
    const dataForExcel = exportData.map((item, index) => ({
      Rank: index + 1,
      'Location / Ward': item.ward || 'Unknown',
      'Suitability Score': item.successScore,
      'Success Probability (%)': item.successProbability,
      'Expected Revenue (₹)': item.expectedRevenue,
      'Estimated Rent (₹)': item.metrics?.rent,
      'Estimated Footfall': item.metrics?.footfall,
      'ML Confidence Base': item.confidenceLevel || 'N/A',
      'ML Recommendation': item.recommendation || 'N/A',
      Latitude: item.lat,
      Longitude: item.lng,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Site Rankings');

    const fileName = `MapMyStore_${city || 'Analysis'}_Results.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const handlePDFExport = () => {
    if (!exportData || exportData.length === 0) return;

    const doc = new jsPDF('landscape');

    // Title
    doc.setFontSize(18);
    doc.text(`AI Site Recommendations - ${city || 'Analysis'}`, 14, 20);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);

    // Prepare table data
    const tableColumn = [
      'Rank',
      'Location',
      'Score',
      'Win Prob',
      'Est. Revenue',
      'Est. Rent',
      'ML Confidence',
      'Recommendation'
    ];

    const tableRows = exportData.map((item, index) => [
      index + 1,
      item.ward || 'Unknown',
      item.successScore,
      `${item.successProbability}%`,
      `Rs. ${item.expectedRevenue.toLocaleString()}`,
      `Rs. ${item.metrics?.rent.toLocaleString()}`,
      item.confidenceLevel || 'N/A',
      item.recommendation || 'N/A'
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [41, 128, 185] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    doc.save(`MapMyStore_${city || 'Analysis'}_Results.pdf`);
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <div className="text-sm text-gray-600">
        Export analysis results
      </div>

      <div className="flex gap-2">
        <button
          onClick={handlePDFExport}
          disabled={!exportData || exportData.length === 0}
          className="flex items-center gap-2 rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
        >
          📄 Export PDF
        </button>

        <button
          onClick={handleExcelExport}
          disabled={!exportData || exportData.length === 0}
          className="flex items-center gap-2 rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
        >
          📊 Export Excel
        </button>
      </div>
    </div>
  );
}

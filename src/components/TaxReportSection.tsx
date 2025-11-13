import { TaxReport } from '@/lib/storage';
import Accordion from './Accordion';

interface TaxReportSectionProps {
  reports: TaxReport[];
}

export default function TaxReportSection({ reports }: TaxReportSectionProps) {
  if (reports.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-8xl mb-6">📊</div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          कोणतेही कर अहवाल उपलब्ध नाहीत
        </h3>
        <p className="text-gray-600">
          कर वसूली अहवाल जोडले जाण्याची प्रतीक्षा आहे.
        </p>
      </div>
    );
  }

  const renderTable = (report: TaxReport) => {
    const { table } = report;
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-center border border-gray-200 bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-50">
              {table.columns.map((column, colIndex) => (
                <th key={colIndex} className="border border-gray-200 px-4 py-3 font-semibold text-gray-800">
                  <div className="mb-2">{column}</div>
                  <div className="flex justify-center space-x-4">
                    {table.subColumns[colIndex]?.map((subCol, subIndex) => (
                      <span key={subIndex} className="text-sm font-medium text-gray-600 bg-green-100 px-2 py-1 rounded">
                        {subCol}
                      </span>
                    ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border border-gray-200 px-4 py-3">
                  <div className="flex justify-center space-x-4">
                    <span className="font-medium">{row['घरपट्टी_बाकी'] || 0}</span>
                    <span className="font-medium">{row['पाणीपट्टी_बाकी'] || 0}</span>
                  </div>
                </td>
                <td className="border border-gray-200 px-4 py-3">
                  <div className="flex justify-center space-x-4">
                    <span className="font-medium">{row['घरपट्टी_मागणी'] || 0}</span>
                    <span className="font-medium">{row['पाणीपट्टी_मागणी'] || 0}</span>
                  </div>
                </td>
                <td className="border border-gray-200 px-4 py-3">
                  <div className="flex justify-center space-x-4">
                    <span className="font-medium text-green-600">{row['घरपट्टी_वसूली'] || 0}</span>
                    <span className="font-medium text-green-600">{row['पाणीपट्टी_वसूली'] || 0}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Updated timestamp */}
        <div className="mt-4 text-right">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Updated:</span> {report.updatedAt}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <Accordion
          key={report.id}
          title={`${report.year} - ${report.title}`}
        >
          {renderTable(report)}
        </Accordion>
      ))}
    </div>
  );
}

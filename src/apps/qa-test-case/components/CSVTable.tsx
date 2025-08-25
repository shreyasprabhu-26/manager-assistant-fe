import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CSVLink } from "react-csv";
import { Download, Table, Eye, EyeOff } from "lucide-react";

interface CSVRow {
  [key: string]: string;
}

interface CSVTableProps {
  data: CSVRow[];
  headers: Array<{ label: string; key: string }>;
  fileName?: string;
}

const CSVTable: React.FC<CSVTableProps> = ({ 
  data, 
  headers, 
  fileName = "qa-test-cases.csv" 
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [visibleColumns, setVisibleColumns] = React.useState<Set<string>>(
    new Set(headers.slice(0, 4).map(h => h.key)) // Show first 4 columns by default
  );

  const toggleColumn = (columnKey: string) => {
    const newVisible = new Set(visibleColumns);
    if (newVisible.has(columnKey)) {
      newVisible.delete(columnKey);
    } else {
      newVisible.add(columnKey);
    }
    setVisibleColumns(newVisible);
  };

  const visibleHeaders = headers.filter(h => visibleColumns.has(h.key));

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'to do': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in progress': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'done': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderCellContent = (value: string, headerKey: string) => {
    if (headerKey === 'priority') {
      return <Badge className={getPriorityColor(value)}>{value}</Badge>;
    }
    if (headerKey === 'status') {
      return <Badge className={getStatusColor(value)}>{value}</Badge>;
    }
    if (headerKey === 'test_steps' && value.length > 100) {
      return (
        <div className="max-w-xs">
          <p className="truncate">{value}</p>
          <span className="text-xs text-muted-foreground">
            Click to expand...
          </span>
        </div>
      );
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Table className="h-5 w-5 text-green-600" />
            <CardTitle className="text-lg">Generated Test Cases</CardTitle>
            <Badge variant="secondary">{data.length} test cases</Badge>
          </div>
          <div className="flex gap-2">
            <CSVLink
              data={data}
              headers={headers}
              filename={fileName}
              className="inline-flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors"
            >
              <Download className="h-4 w-4" />
              Download CSV
            </CSVLink>
          </div>
        </div>
        
        {/* Column Visibility Controls */}
        <div className="flex flex-wrap gap-1 mt-3">
          <span className="text-xs text-muted-foreground mr-2">Columns:</span>
          {headers.map(header => (
            <Button
              key={header.key}
              variant={visibleColumns.has(header.key) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleColumn(header.key)}
              className="h-6 text-xs"
            >
              {visibleColumns.has(header.key) ? (
                <Eye className="h-3 w-3 mr-1" />
              ) : (
                <EyeOff className="h-3 w-3 mr-1" />
              )}
              {header.label}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-muted">
                {visibleHeaders.map(header => (
                  <th
                    key={header.key}
                    className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-900"
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, isExpanded ? data.length : 10).map((row, index) => (
                <tr key={index} className="hover:bg-muted/50">
                  {visibleHeaders.map(header => (
                    <td
                      key={header.key}
                      className="border border-gray-200 px-4 py-3 text-sm max-w-xs"
                    >
                      {renderCellContent(row[header.key] || '', header.key)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.length > 10 && (
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm"
            >
              {isExpanded ? 'Show Less' : `Show All ${data.length} Test Cases`}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CSVTable;

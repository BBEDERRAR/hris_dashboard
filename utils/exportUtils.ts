/**
 * Converts an array of objects to CSV format and triggers a download
 * @param data Array of objects to convert to CSV
 * @param filename Name of the downloaded file
 */
export function exportToCSV(data: Record<string, any>[] | null, filename: string): void {
  if (!data || !data.length) {
    console.warn('No data to export');
    return;
  }
  
  
  // Function to escape CSV field values
  const escapeCsvValue = (value: any): string => {
    if (value === null || value === undefined) return '';
    
    const stringValue = String(value);
    
    // If the value contains a comma, a double quote, or a newline, wrap it in double quotes
    // Also escape any double quotes by doubling them
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    
    return stringValue;
  };
  
  // Process nested objects for better CSV output
  const processRowData = (row: Record<string, any>): Record<string, string> => {
    const result: Record<string, string> = {};
    
    // Handle each field
    Object.entries(row).forEach(([key, value]) => {
      // Skip functions
      if (typeof value === 'function') return;
      
      // If it's an object but not an array, and not null, flatten it
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          if (typeof nestedValue !== 'function' && nestedValue !== null && typeof nestedValue !== 'object') {
            result[`${key}_${nestedKey}`] = String(nestedValue);
          }
        });
      } else {
        // Handle dates specially
        if (key.toLowerCase().includes('date') && value) {
          // Try to format as a date if it looks like one
          try {
            // Ensure value is a valid date input type
            if (typeof value === 'string' || typeof value === 'number' || value instanceof Date) {
              const date = new Date(value);
              if (!isNaN(date.getTime())) {
                result[key] = date.toLocaleDateString();
                return;
              }
            }
          } catch (e) {
            // Not a valid date, continue with normal processing
          }
        }
        
        result[key] = value !== null && typeof value !== 'object' ? String(value) : '';
      }
    });
    
    return result;
  };
  
  // Process the data to handle nested objects
  const processedData = data.map(processRowData);
  
  // Get all unique headers after processing
  const allHeaders = Array.from(
    new Set(
      processedData.flatMap(row => Object.keys(row))
    )
  );
  
  // Create CSV rows
  const csvRows = [
    allHeaders.join(','),
    ...processedData.map(row => 
      allHeaders.map(header => escapeCsvValue(row[header] || '')).join(',')
    )
  ];
  
  // Join all rows into a single string
  const csvString = csvRows.join('\n');
  
  // Create and download the file
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
} 
export function formatMarkdown(content: string): string {
  if (!content) return '';
  
  // Clean up the content
  let formatted = content.trim();
  
  // Fix multiple line breaks
  formatted = formatted.replace(/\n{3,}/g, '\n\n');
  
  // Ensure proper spacing around headers
  formatted = formatted.replace(/^(#{1,6})\s*(.+)$/gm, '$1 $2');
  
  // Ensure proper spacing around lists
  formatted = formatted.replace(/^([-*+]|\d+\.)\s*(.+)$/gm, '$1 $2');
  
  // Clean up blockquotes
  formatted = formatted.replace(/^>\s*(.+)$/gm, '> $1');
  
  return formatted;
} 